// Authentication API Service

import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { ApiResponse, LoginResponseData } from '../types';
import { UserProfile } from '../../types';

export const authApi = {
  async login(email: string, password: string): Promise<LoginResponseData> {
    const response = await apiClient.post<ApiResponse<LoginResponseData>>(
      API_ENDPOINTS.AUTH.LOGIN,
      { email, password }
    );
    return response.data.data;
  },

  async verifyOtp(tempToken: string, otpCode: string): Promise<LoginResponseData> {
    const response = await apiClient.post<ApiResponse<LoginResponseData>>(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      { tempToken, otpCode }
    );
    return response.data.data;
  },

  async verifyMfa(tempToken: string, code: string): Promise<LoginResponseData> {
    const response = await apiClient.post<ApiResponse<LoginResponseData>>(
      API_ENDPOINTS.AUTH.VERIFY_MFA,
      { tempToken, code }
    );
    return response.data.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch {
      // ignore network errors during logout
    }
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email }
    );
    return response.data.data;
  },

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      { token, newPassword }
    );
    return response.data.data;
  },

  async claimWorkshop(inviteToken: string, otpCode: string, password: string): Promise<LoginResponseData> {
    const response = await apiClient.post<ApiResponse<LoginResponseData>>(
      API_ENDPOINTS.AUTH.CLAIM_WORKSHOP,
      { inviteToken, otpCode, password }
    );
    return response.data.data;
  },

  async getCurrentUser(): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>(API_ENDPOINTS.AUTH.ME);
    return response.data.data;
  },
};
