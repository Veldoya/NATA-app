// Training API Service

import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { ApiResponse, ApiPaginatedResponse } from '../types';
import { TrainingProgramme } from '../../types';

export const trainingApi = {
  async getProgrammes(params?: {
    category?: string;
    search?: string;
  }): Promise<TrainingProgramme[]> {
    const response = await apiClient.get<ApiPaginatedResponse<TrainingProgramme>>(
      API_ENDPOINTS.TRAINING.PROGRAMMES,
      { params }
    );
    return response.data.data;
  },

  async getMyEnrollments(): Promise<TrainingProgramme[]> {
    const response = await apiClient.get<ApiResponse<TrainingProgramme[]>>(
      API_ENDPOINTS.TRAINING.MY_ENROLLMENTS
    );
    return response.data.data;
  },

  async getProgrammeDetail(id: string): Promise<TrainingProgramme> {
    const response = await apiClient.get<ApiResponse<TrainingProgramme>>(
      API_ENDPOINTS.TRAINING.PROGRAMME_DETAIL(id)
    );
    return response.data.data;
  },

  async enrollInProgramme(programmeId: string): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.TRAINING.ENROLL(programmeId)
    );
    return response.data.data;
  },
};
