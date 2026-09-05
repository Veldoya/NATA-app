// In-App Notifications API Service

import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { ApiResponse, ApiPaginatedResponse } from '../types';
import { AppNotification } from '../../types';

export const notificationsApi = {
  async getNotifications(params?: {
    category?: string;
    unreadOnly?: boolean;
  }): Promise<AppNotification[]> {
    const response = await apiClient.get<ApiPaginatedResponse<AppNotification>>(
      API_ENDPOINTS.NOTIFICATIONS.LIST,
      { params }
    );
    return response.data.data;
  },

  async markAsRead(id: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id));
  },

  async markAllAsRead(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
  },

  async getUnreadCount(): Promise<number> {
    try {
      const response = await apiClient.get<ApiResponse<{ count: number }>>(
        API_ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT
      );
      return response.data.data.count;
    } catch {
      return 0;
    }
  },
};
