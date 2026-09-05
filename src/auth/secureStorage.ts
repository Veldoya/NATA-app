// Secure Storage Vault for Credentials & Tokens using Hardware-Backed SecureStore

import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'nata_access_token',
  REFRESH_TOKEN: 'nata_refresh_token',
  USER_DATA: 'nata_user_profile',
  ACTIVE_WORKSPACE: 'nata_active_workspace',
  MFA_TEMP_TOKEN: 'nata_mfa_temp_token',
} as const;

// In-memory fallback for unit tests and headless environments
const memoryVault = new Map<string, string>();

export const secureStorage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        memoryVault.set(key, value);
        return;
      }
      await SecureStore.setItemAsync(key, value, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
    } catch (err) {
      // Fallback to memory store if hardware keystore fails or in mock test env
      memoryVault.set(key, value);
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === 'web') {
        return memoryVault.get(key) ?? null;
      }
      const val = await SecureStore.getItemAsync(key);
      return val ?? memoryVault.get(key) ?? null;
    } catch {
      return memoryVault.get(key) ?? null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      memoryVault.delete(key);
      if (Platform.OS !== 'web') {
        await SecureStore.deleteItemAsync(key);
      }
    } catch {
      // ignored
    }
  },

  // Helpers for Authentication Tokens
  async setTokens(accessToken: string, refreshToken?: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    if (refreshToken) {
      await this.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  },

  async getAccessToken(): Promise<string | null> {
    return this.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  async getRefreshToken(): Promise<string | null> {
    return this.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },

  async clearAuth(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    await this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    await this.removeItem(STORAGE_KEYS.USER_DATA);
    await this.removeItem(STORAGE_KEYS.MFA_TEMP_TOKEN);
  },

  async setActiveWorkspace(workspace: 'WORKER' | 'OFFICER'): Promise<void> {
    await this.setItem(STORAGE_KEYS.ACTIVE_WORKSPACE, workspace);
  },

  async getActiveWorkspace(): Promise<'WORKER' | 'OFFICER' | null> {
    const ws = await this.getItem(STORAGE_KEYS.ACTIVE_WORKSPACE);
    if (ws === 'WORKER' || ws === 'OFFICER') return ws;
    return null;
  },
};

export { STORAGE_KEYS };
