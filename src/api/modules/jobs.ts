// Jobs & Estimates API Service

import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { ApiResponse, ApiPaginatedResponse } from '../types';
import { JobRecord, JobStatus, EstimateLineItem, EstimateVersion } from '../../types';

export interface CreateEstimatePayload {
  revisionReason?: string;
  items: Omit<EstimateLineItem, 'id' | 'totalPrice'>[];
  depositRequired: number;
  taxPercent?: number;
}

export const jobsApi = {
  async getJobs(params?: {
    status?: JobStatus;
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ jobs: JobRecord[]; total: number }> {
    const response = await apiClient.get<ApiPaginatedResponse<JobRecord>>(
      API_ENDPOINTS.JOBS.LIST,
      { params }
    );
    return {
      jobs: response.data.data,
      total: response.data.total,
    };
  },

  async getJobDetail(jobId: string): Promise<JobRecord> {
    const response = await apiClient.get<ApiResponse<JobRecord>>(
      API_ENDPOINTS.JOBS.DETAIL(jobId)
    );
    return response.data.data;
  },

  async updateJobStatus(
    jobId: string,
    status: JobStatus,
    notes?: string
  ): Promise<JobRecord> {
    const response = await apiClient.patch<ApiResponse<JobRecord>>(
      API_ENDPOINTS.JOBS.UPDATE_STATUS(jobId),
      { status, notes }
    );
    return response.data.data;
  },

  async updateDiagnosis(
    jobId: string,
    dtcCodes: string[],
    diagnosisNotes: string
  ): Promise<JobRecord> {
    const response = await apiClient.patch<ApiResponse<JobRecord>>(
      API_ENDPOINTS.JOBS.UPDATE_DIAGNOSIS(jobId),
      { dtcCodes, diagnosisNotes }
    );
    return response.data.data;
  },

  async createEstimate(
    jobId: string,
    payload: CreateEstimatePayload
  ): Promise<EstimateVersion> {
    const response = await apiClient.post<ApiResponse<EstimateVersion>>(
      API_ENDPOINTS.JOBS.CREATE_ESTIMATE(jobId),
      payload
    );
    return response.data.data;
  },

  async getServiceHistory(params?: {
    search?: string;
    page?: number;
  }): Promise<{ history: JobRecord[]; total: number }> {
    const response = await apiClient.get<ApiPaginatedResponse<JobRecord>>(
      API_ENDPOINTS.JOBS.SERVICE_HISTORY,
      { params }
    );
    return {
      history: response.data.data,
      total: response.data.total,
    };
  },
};
