// Workshop & Capabilities API Service

import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { ApiResponse } from '../types';
import {
  WorkshopProfile,
  VehicleCapability,
  WorkshopEquipment,
  VerificationStatus,
} from '../../types';

export interface DeclareCapabilityPayload {
  make: string;
  modelsSupported: string;
  yearRange: string;
  powertrains: ('PETROL' | 'DIESEL' | 'HYBRID' | 'EV')[];
  specialisation: string;
  evidenceUri?: string;
}

export interface DeclareEquipmentPayload {
  name: string;
  category: WorkshopEquipment['category'];
  brandModel: string;
  serialNumber?: string;
  isOperational: boolean;
}

export const workshopApi = {
  async getWorkshopProfile(): Promise<WorkshopProfile> {
    const response = await apiClient.get<ApiResponse<WorkshopProfile>>(
      API_ENDPOINTS.WORKSHOP.GET_MY_WORKSHOP
    );
    return response.data.data;
  },

  async updateWorkshopProfile(
    updates: Partial<WorkshopProfile>
  ): Promise<WorkshopProfile> {
    const response = await apiClient.patch<ApiResponse<WorkshopProfile>>(
      API_ENDPOINTS.WORKSHOP.UPDATE_PROFILE,
      updates
    );
    return response.data.data;
  },

  async declareCapability(
    payload: DeclareCapabilityPayload
  ): Promise<VehicleCapability> {
    const response = await apiClient.post<ApiResponse<VehicleCapability>>(
      API_ENDPOINTS.WORKSHOP.DECLARE_CAPABILITY,
      payload
    );
    return response.data.data;
  },

  async declareEquipment(
    payload: DeclareEquipmentPayload
  ): Promise<WorkshopEquipment> {
    const response = await apiClient.post<ApiResponse<WorkshopEquipment>>(
      API_ENDPOINTS.WORKSHOP.DECLARE_EQUIPMENT,
      payload
    );
    return response.data.data;
  },

  async addStaffMember(payload: {
    membershipNumber: string;
    role: string;
  }): Promise<{ message: string }> {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.WORKSHOP.ADD_STAFF,
      payload
    );
    return response.data.data;
  },

  async removeStaffMember(staffId: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.WORKSHOP.REMOVE_STAFF(staffId));
  },
};
