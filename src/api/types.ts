// API Envelope and Error Types

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  supportReference?: string;
  timestamp: string;
}

export interface ApiPaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  supportReference?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
    supportReference?: string;
    requiresMfa?: boolean;
    mfaToken?: string;
    rateLimitResetSeconds?: number;
  };
}

export interface LoginResponseData {
  user: import('../types').UserProfile;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
  requiresMfa?: boolean;
  mfaTempToken?: string;
  requiresOtp?: boolean;
  otpChannel?: 'EMAIL' | 'SMS';
}

export interface QrVerificationResponse {
  isValid: boolean;
  certificateNumber: string;
  title: string;
  issuedTo: string;
  membershipNumber: string;
  trade: string;
  issueDate: string;
  expiryDate?: string;
  status: 'VALID' | 'SUSPENDED' | 'REVOKED';
  issuingCouncil: string;
  digitalHash: string;
}
