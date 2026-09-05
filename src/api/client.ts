// Centralized Axios API Client with Token Refresh Queue & Error Normalization

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { secureStorage } from '../auth/secureStorage';
import { API_ENDPOINTS } from './endpoints';

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.natalagoscouncil.com.ng/api/v1';

export interface AppApiError {
  status: number;
  message: string;
  code: string;
  supportReference?: string;
  details?: Record<string, string[]>;
  isNetworkError: boolean;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Client-Platform': 'NATA-Worker-Mobile',
    'X-Client-Version': '1.0.0',
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Request Interceptor: Attach Access Token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await secureStorage.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Refresh & Normalize Errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If 401 Unauthorized and not already retrying
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => apiClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await secureStorage.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const refreshResponse = await axios.post(
          `${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const newAccessToken = refreshResponse.data?.data?.accessToken;
        const newRefreshToken = refreshResponse.data?.data?.refreshToken;

        if (newAccessToken) {
          await secureStorage.setTokens(newAccessToken, newRefreshToken);
          processQueue(null);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return apiClient(originalRequest);
        }
      } catch (refreshErr) {
        processQueue(refreshErr as Error);
        await secureStorage.clearAuth();
        return Promise.reject(normalizeError(error));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(normalizeError(error));
  }
);

export function normalizeError(error: AxiosError<any>): AppApiError {
  if (!error.response) {
    return {
      status: 0,
      message: 'Unable to connect to NATA server. Please check your internet connection.',
      code: 'NETWORK_OFFLINE',
      isNetworkError: true,
    };
  }

  const data = error.response.data;
  const status = error.response.status;

  const message =
    data?.error?.message ||
    data?.message ||
    data?.detail ||
    (status === 403
      ? 'You do not have permission to perform this action.'
      : status === 429
      ? 'Too many requests. Please wait a moment and try again.'
      : status === 503
      ? 'NATA services are undergoing scheduled maintenance.'
      : 'An unexpected server error occurred.');

  const code = data?.error?.code || `HTTP_${status}`;
  const supportReference = data?.supportReference || data?.error?.supportReference;
  const details = data?.error?.details;

  return {
    status,
    message,
    code,
    supportReference,
    details,
    isNetworkError: false,
  };
}

export default apiClient;
