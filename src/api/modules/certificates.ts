// Certificates API Service & Live Verification

import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { ApiResponse, QrVerificationResponse } from '../types';
import { CertificateRecord } from '../../types';

export const certificatesApi = {
  async getMyCertificates(): Promise<CertificateRecord[]> {
    const response = await apiClient.get<ApiResponse<CertificateRecord[]>>(
      API_ENDPOINTS.CERTIFICATES.MY_CERTIFICATES
    );
    return response.data.data;
  },

  async getCertificateDetail(id: string): Promise<CertificateRecord> {
    const response = await apiClient.get<ApiResponse<CertificateRecord>>(
      API_ENDPOINTS.CERTIFICATES.DETAIL(id)
    );
    return response.data.data;
  },

  /**
   * Authoritative Live QR Verification
   * Hits the FastAPI backend verification endpoint with scanned payload/hash.
   */
  async verifyQrPayload(rawScannedText: string): Promise<QrVerificationResponse> {
    let payload: { certificateNumber?: string; verificationHash?: string; rawUrl?: string } = {};

    try {
      if (rawScannedText.startsWith('http://') || rawScannedText.startsWith('https://')) {
        payload.rawUrl = rawScannedText;
        const url = new URL(rawScannedText);
        const certNo = url.searchParams.get('cert') || url.pathname.split('/').pop();
        const hash = url.searchParams.get('hash');
        if (certNo) payload.certificateNumber = certNo;
        if (hash) payload.verificationHash = hash;
      } else if (rawScannedText.startsWith('{')) {
        const parsed = JSON.parse(rawScannedText);
        payload = parsed;
      } else {
        payload.certificateNumber = rawScannedText.trim();
      }
    } catch {
      payload.certificateNumber = rawScannedText.trim();
    }

    const response = await apiClient.post<ApiResponse<QrVerificationResponse>>(
      API_ENDPOINTS.CERTIFICATES.VERIFY_QR,
      payload
    );
    return response.data.data;
  },
};
