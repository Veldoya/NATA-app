// Profile & Membership API Service

import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { ApiResponse } from '../types';
import { UserProfile, ProfessionalTier } from '../../types';

export interface ProgressionStatus {
  currentTier: ProfessionalTier;
  nextTier?: ProfessionalTier;
  requirementsMet: string[];
  pendingRequirements: string[];
  progressPercent: number;
  eligibleForReview: boolean;
}

export const profileApi = {
  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>(
      API_ENDPOINTS.PROFILE.GET_CURRENT
    );
    return response.data.data;
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const response = await apiClient.patch<ApiResponse<UserProfile>>(
      API_ENDPOINTS.PROFILE.UPDATE_PROFILE,
      updates
    );
    return response.data.data;
  },

  async getProgressionStatus(): Promise<ProgressionStatus> {
    const response = await apiClient.get<ApiResponse<ProgressionStatus>>(
      API_ENDPOINTS.PROFILE.PROGRESSION_STATUS
    );
    return response.data.data;
  },
};
