// Officer Workspace API Service

import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { ApiResponse, ApiPaginatedResponse } from '../types';
import {
  MembershipApplication,
  ApplicationStatus,
  ExecutiveTenure,
  OrganisationScope,
  CertificateRecord,
  UserProfile,
} from '../../types';

export interface OfficerDashboardStats {
  pendingApplicationsCount: number;
  physicalVerificationsDue: number;
  pendingCertificateApprovals: number;
  unresolvedComplaints: number;
  expiringTenuresCount: number;
  recentCashCollectionsToday: number;
  activeMembersInScope: number;
}

export const officerApi = {
  async getDashboardStats(): Promise<OfficerDashboardStats> {
    const response = await apiClient.get<ApiResponse<OfficerDashboardStats>>(
      API_ENDPOINTS.OFFICER.DASHBOARD_STATS
    );
    return response.data.data;
  },

  async getApplications(params?: {
    status?: ApplicationStatus;
    search?: string;
    page?: number;
  }): Promise<{ applications: MembershipApplication[]; total: number }> {
    const response = await apiClient.get<ApiPaginatedResponse<MembershipApplication>>(
      API_ENDPOINTS.OFFICER.APPLICATIONS.LIST,
      { params }
    );
    return {
      applications: response.data.data,
      total: response.data.total,
    };
  },

  async getApplicationDetail(id: string): Promise<MembershipApplication> {
    const response = await apiClient.get<ApiResponse<MembershipApplication>>(
      API_ENDPOINTS.OFFICER.APPLICATIONS.DETAIL(id)
    );
    return response.data.data;
  },

  async submitPhysicalVerification(
    id: string,
    payload: {
      checklist: { item: string; passed: boolean }[];
      notes: string;
      verifiedLocationName: string;
      photos?: string[];
    }
  ): Promise<MembershipApplication> {
    const response = await apiClient.post<ApiResponse<MembershipApplication>>(
      API_ENDPOINTS.OFFICER.APPLICATIONS.PHYSICAL_VERIFY(id),
      payload
    );
    return response.data.data;
  },

  async submitApplicationDecision(
    id: string,
    payload: {
      decision: 'APPROVE' | 'REJECT' | 'REQUEST_CORRECTIONS';
      comment: string;
    }
  ): Promise<MembershipApplication> {
    const response = await apiClient.post<ApiResponse<MembershipApplication>>(
      API_ENDPOINTS.OFFICER.APPLICATIONS.SUBMIT_DECISION(id),
      payload
    );
    return response.data.data;
  },

  async getExecutiveTenures(params?: {
    scopeLevel?: string;
    status?: string;
  }): Promise<ExecutiveTenure[]> {
    const response = await apiClient.get<ApiResponse<ExecutiveTenure[]>>(
      API_ENDPOINTS.OFFICER.GOVERNANCE.TENURES,
      { params }
    );
    return response.data.data;
  },

  async getOrganisationHierarchy(): Promise<OrganisationScope[]> {
    const response = await apiClient.get<ApiResponse<OrganisationScope[]>>(
      API_ENDPOINTS.OFFICER.ORGANISATIONS.HIERARCHY
    );
    return response.data.data;
  },

  async searchMembers(query: string): Promise<UserProfile[]> {
    const response = await apiClient.get<ApiResponse<UserProfile[]>>(
      API_ENDPOINTS.OFFICER.MEMBERS.SEARCH,
      { params: { q: query } }
    );
    return response.data.data;
  },

  async getPendingCertificatesQueue(): Promise<CertificateRecord[]> {
    const response = await apiClient.get<ApiResponse<CertificateRecord[]>>(
      API_ENDPOINTS.OFFICER.CERTIFICATE_DESK.PENDING_QUEUE
    );
    return response.data.data;
  },

  async approveCertificateStep(
    id: string,
    payload: {
      stage: 'TRAINING_OFFICER' | 'ASSESSOR' | 'CERTIFICATION_OFFICER' | 'STATE_SECRETARY' | 'STATE_CHAIRMAN';
      action: 'APPROVE' | 'REJECT';
      notes?: string;
    }
  ): Promise<CertificateRecord> {
    const response = await apiClient.post<ApiResponse<CertificateRecord>>(
      API_ENDPOINTS.OFFICER.CERTIFICATE_DESK.APPROVE_STEP(id),
      payload
    );
    return response.data.data;
  },
};
