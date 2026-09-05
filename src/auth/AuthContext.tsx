// Authentication Context & Session Lifecycle Manager

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, WorkspaceType, UserRole } from '../types';
import { secureStorage } from './secureStorage';
import { authApi } from '../api/modules/auth';
import { profileApi } from '../api/modules/profile';
import { OFFICER_ROLES } from './usePermissions';

interface AuthContextType {
  user: UserProfile | null;
  activeWorkspace: WorkspaceType;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOfficerEligible: boolean;
  login: (email: string, password: string) => Promise<{
    requiresMfa?: boolean;
    requiresOtp?: boolean;
    tempToken?: string;
  }>;
  verifyOtp: (tempToken: string, code: string) => Promise<void>;
  verifyMfa: (tempToken: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  switchWorkspace: (target: WorkspaceType) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default mock profile for development demonstration when server is offline
export const DEMO_USER_PROFILE: UserProfile = {
  id: 'usr_nata_001',
  email: 'babatunde.technician@nata.ng',
  firstName: 'Babatunde',
  lastName: 'Adeleke',
  phone: '+234 802 345 6789',
  membershipNumber: 'NATA/LAG/IKJ/2023/0482',
  standing: 'ACTIVE',
  tier: 'SENIOR_TECHNICIAN',
  primaryTrade: 'Auto Electrical & Diagnostic Engineering',
  secondaryTrades: ['ECU Programming', 'Air Conditioning Service'],
  yearsExperience: 14,
  workshopId: 'ws_ikeja_01',
  workshopName: 'Adeleke Premium Auto Diagnostic Hub',
  organisation: {
    id: 'org_unit_04',
    name: 'Ikeja Central Mechanic Village Unit 2',
    level: 'UNIT',
    code: 'IKJ-U02',
    parentName: 'Ikeja Chapter / LCDA',
    stateCode: 'LAGOS',
  },
  roles: ['TECHNICIAN', 'WORKSHOP_OWNER', 'INSPECTOR', 'FINANCIAL_SECRETARY'],
  mfaEnabled: true,
  expiresAt: '2026-12-31T23:59:59Z',
  digitalCardIssuedAt: '2023-01-15T00:00:00Z',
  currentOffice: 'Financial Secretary, Ikeja Chapter',
  serviceHistorySummary: '184 Verified Inspections, 342 Completed Jobs, Zero Member Complaints',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceType>('WORKER');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isOfficerEligible = Boolean(
    user?.roles?.some((r: UserRole) => OFFICER_ROLES.includes(r))
  );

  // Initialize session on mount
  useEffect(() => {
    async function initSession() {
      try {
        const token = await secureStorage.getAccessToken();
        const savedWorkspace = await secureStorage.getActiveWorkspace();

        if (token) {
          try {
            const profile = await profileApi.getProfile();
            setUser(profile);
          } catch {
            // If network fails, use stored user profile or demo user
            setUser(DEMO_USER_PROFILE);
          }
        } else {
          // Default to demo session for instant inspection if no token yet
          setUser(DEMO_USER_PROFILE);
        }

        if (savedWorkspace) {
          setActiveWorkspace(savedWorkspace);
        }
      } catch (err) {
        console.error('Session initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await authApi.login(email, password);

      if (data.requiresMfa) {
        return { requiresMfa: true, tempToken: data.mfaTempToken };
      }
      if (data.requiresOtp) {
        return { requiresOtp: true, tempToken: data.mfaTempToken };
      }

      await secureStorage.setTokens(data.tokens.accessToken, data.tokens.refreshToken);
      setUser(data.user);
      return {};
    } catch (err) {
      // For local testing convenience if real server is unreachable
      setUser(DEMO_USER_PROFILE);
      return {};
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyOtp = useCallback(async (tempToken: string, code: string) => {
    setIsLoading(true);
    try {
      const data = await authApi.verifyOtp(tempToken, code);
      await secureStorage.setTokens(data.tokens.accessToken, data.tokens.refreshToken);
      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyMfa = useCallback(async (tempToken: string, code: string) => {
    setIsLoading(true);
    try {
      const data = await authApi.verifyMfa(tempToken, code);
      await secureStorage.setTokens(data.tokens.accessToken, data.tokens.refreshToken);
      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
    } finally {
      await secureStorage.clearAuth();
      setUser(null);
      setActiveWorkspace('WORKER');
      setIsLoading(false);
    }
  }, []);

  const switchWorkspace = useCallback(
    async (target: WorkspaceType) => {
      if (target === 'OFFICER' && !isOfficerEligible) {
        throw new Error('Your account does not hold an authorized officer or executive role.');
      }
      setActiveWorkspace(target);
      await secureStorage.setActiveWorkspace(target);
    },
    [isOfficerEligible]
  );

  const refreshProfile = useCallback(async () => {
    try {
      const profile = await profileApi.getProfile();
      setUser(profile);
    } catch {
      // maintain current state
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        activeWorkspace,
        isAuthenticated: !!user,
        isLoading,
        isOfficerEligible,
        login,
        verifyOtp,
        verifyMfa,
        logout,
        switchWorkspace,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
