// Unit & Integration Tests: Authentication, Secure Tokens & Session Storage

const mockStore = new Map<string, string>();

jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
  },
}));

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(async (key: string, value: string) => {
    mockStore.set(key, value);
  }),
  getItemAsync: jest.fn(async (key: string) => {
    return mockStore.get(key) || null;
  }),
  deleteItemAsync: jest.fn(async (key: string) => {
    mockStore.delete(key);
  }),
  WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'WHEN_UNLOCKED_THIS_DEVICE_ONLY',
}));

import { secureStorage } from '../src/auth/secureStorage';

describe('Authentication & Secure Credential Vault', () => {
  beforeEach(async () => {
    await secureStorage.clearAuth();
  });

  test('securely stores and retrieves JWT access token and rotating refresh token', async () => {
    const mockAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockAccess';
    const mockRefreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockRefresh';

    await secureStorage.setTokens(mockAccessToken, mockRefreshToken);

    const retrievedAccess = await secureStorage.getAccessToken();
    const retrievedRefresh = await secureStorage.getRefreshToken();

    expect(retrievedAccess).toBe(mockAccessToken);
    expect(retrievedRefresh).toBe(mockRefreshToken);
  });

  test('persists active workspace preference across app restarts', async () => {
    await secureStorage.setActiveWorkspace('OFFICER');
    const ws1 = await secureStorage.getActiveWorkspace();
    expect(ws1).toBe('OFFICER');

    await secureStorage.setActiveWorkspace('WORKER');
    const ws2 = await secureStorage.getActiveWorkspace();
    expect(ws2).toBe('WORKER');
  });

  test('clears all sensitive credentials on user logout', async () => {
    await secureStorage.setTokens('access_to_delete', 'refresh_to_delete');
    await secureStorage.clearAuth();

    const access = await secureStorage.getAccessToken();
    const refresh = await secureStorage.getRefreshToken();

    expect(access).toBeNull();
    expect(refresh).toBeNull();
  });
});
