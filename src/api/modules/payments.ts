// Payments & Dues API Service with Manual Cash Collection for Financial Officers

import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { ApiResponse, ApiPaginatedResponse } from '../types';
import { PayableItem, PaymentTransaction, CashCollectionPayload } from '../../types';

export const paymentsApi = {
  async getPayableItems(): Promise<PayableItem[]> {
    const response = await apiClient.get<ApiResponse<PayableItem[]>>(
      API_ENDPOINTS.PAYMENTS.PAYABLE_ITEMS
    );
    return response.data.data;
  },

  async getPaymentHistory(params?: { page?: number }): Promise<{
    transactions: PaymentTransaction[];
    total: number;
  }> {
    const response = await apiClient.get<ApiPaginatedResponse<PaymentTransaction>>(
      API_ENDPOINTS.PAYMENTS.HISTORY,
      { params }
    );
    return {
      transactions: response.data.data,
      total: response.data.total,
    };
  },

  async initializePaystack(feeItemId: string): Promise<{
    authorizationUrl: string;
    reference: string;
  }> {
    const response = await apiClient.post<
      ApiResponse<{ authorizationUrl: string; reference: string }>
    >(API_ENDPOINTS.PAYMENTS.INITIALIZE_PAYSTACK, { feeItemId });
    return response.data.data;
  },

  async verifyPaystackPayment(reference: string): Promise<PaymentTransaction> {
    const response = await apiClient.get<ApiResponse<PaymentTransaction>>(
      API_ENDPOINTS.PAYMENTS.VERIFY_PAYSTACK(reference)
    );
    return response.data.data;
  },

  /**
   * Controlled Manual Cash Collection (Treasurer / Financial Secretary)
   * Enforces approved fee match, receipt reference, and server-side audit trail.
   */
  async recordCashCollection(
    payload: CashCollectionPayload
  ): Promise<{ transaction: PaymentTransaction; receiptNumber: string }> {
    const response = await apiClient.post<
      ApiResponse<{ transaction: PaymentTransaction; receiptNumber: string }>
    >(API_ENDPOINTS.PAYMENTS.RECORD_CASH_COLLECTION, payload);
    return response.data.data;
  },
};
