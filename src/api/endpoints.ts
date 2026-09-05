// NATA Lagos Council API Endpoint Definitions

export const API_ENDPOINTS = {
  // Authentication & Session
  AUTH: {
    LOGIN: '/auth/mobile/login',
    VERIFY_OTP: '/auth/mobile/verify-otp',
    VERIFY_MFA: '/auth/mobile/verify-mfa',
    REFRESH_TOKEN: '/auth/mobile/refresh',
    LOGOUT: '/auth/mobile/logout',
    FORGOT_PASSWORD: '/auth/password/forgot',
    RESET_PASSWORD: '/auth/password/reset',
    CLAIM_WORKSHOP: '/workshops/onboarding/claim',
    ME: '/auth/me',
  },

  // Worker Profile & Membership
  PROFILE: {
    GET_CURRENT: '/worker/profile',
    UPDATE_PROFILE: '/worker/profile',
    MEMBERSHIP_CARD: '/worker/membership-card',
    PROGRESSION_STATUS: '/worker/progression',
  },

  // Jobs & Estimates
  JOBS: {
    LIST: '/jobs',
    DETAIL: (id: string) => `/jobs/${id}`,
    CREATE: '/jobs',
    UPDATE_STATUS: (id: string) => `/jobs/${id}/status`,
    UPDATE_DIAGNOSIS: (id: string) => `/jobs/${id}/diagnosis`,
    ESTIMATES: (jobId: string) => `/jobs/${jobId}/estimates`,
    CREATE_ESTIMATE: (jobId: string) => `/jobs/${jobId}/estimates`,
    SERVICE_HISTORY: '/jobs/service-history',
    UPLOAD_EVIDENCE: (jobId: string) => `/jobs/${jobId}/evidence`,
  },

  // Workshop & Capabilities
  WORKSHOP: {
    GET_MY_WORKSHOP: '/workshops/me',
    UPDATE_PROFILE: '/workshops/me',
    STAFF: '/workshops/me/staff',
    ADD_STAFF: '/workshops/me/staff',
    REMOVE_STAFF: (id: string) => `/workshops/me/staff/${id}`,
    CAPABILITIES: '/workshops/me/capabilities',
    DECLARE_CAPABILITY: '/workshops/me/capabilities',
    EQUIPMENT: '/workshops/me/equipment',
    DECLARE_EQUIPMENT: '/workshops/me/equipment',
    ACCREDITATION_STATUS: '/workshops/me/accreditation',
  },

  // Training & Programmes
  TRAINING: {
    PROGRAMMES: '/training/programmes',
    PROGRAMME_DETAIL: (id: string) => `/training/programmes/${id}`,
    MY_ENROLLMENTS: '/training/my-enrollments',
    ENROLL: (programmeId: string) => `/training/programmes/${programmeId}/enroll`,
    ATTENDANCE: (programmeId: string) => `/training/programmes/${programmeId}/attendance`,
  },

  // Certificates & Verification
  CERTIFICATES: {
    MY_CERTIFICATES: '/certificates/mine',
    DETAIL: (id: string) => `/certificates/${id}`,
    VERIFY_QR: '/certificates/verify-public',
    DOWNLOAD_PDF: (id: string) => `/certificates/${id}/pdf`,
  },

  // Dues & Payments
  PAYMENTS: {
    PAYABLE_ITEMS: '/payments/payable-items',
    HISTORY: '/payments/history',
    INITIALIZE_PAYSTACK: '/payments/initialize-paystack',
    VERIFY_PAYSTACK: (ref: string) => `/payments/verify-paystack/${ref}`,
    RECORD_CASH_COLLECTION: '/payments/officer/record-cash-collection',
  },

  // Officer Workspace Modules
  OFFICER: {
    DASHBOARD_STATS: '/officer/dashboard-stats',
    APPLICATIONS: {
      LIST: '/officer/applications',
      DETAIL: (id: string) => `/officer/applications/${id}`,
      PHYSICAL_VERIFY: (id: string) => `/officer/applications/${id}/physical-verify`,
      SUBMIT_DECISION: (id: string) => `/officer/applications/${id}/decision`,
    },
    MEMBERS: {
      SEARCH: '/officer/members/search',
      DETAIL: (id: string) => `/officer/members/${id}`,
    },
    GOVERNANCE: {
      TENURES: '/officer/governance/tenures',
      TENURE_DETAIL: (id: string) => `/officer/governance/tenures/${id}`,
    },
    ORGANISATIONS: {
      HIERARCHY: '/officer/organisations/hierarchy',
      BY_PARENT: (parentId: string) => `/officer/organisations?parentId=${parentId}`,
    },
    CERTIFICATE_DESK: {
      PENDING_QUEUE: '/officer/certificates/pending-queue',
      APPROVE_STEP: (id: string) => `/officer/certificates/${id}/maker-checker-approve`,
    },
    ACCREDITATION: {
      INSPECTION_QUEUE: '/officer/accreditation/inspections',
      SUBMIT_INSPECTION: (workshopId: string) => `/officer/accreditation/inspections/${workshopId}`,
    },
  },

  // Automotive Tools & AI
  AUTOMOTIVE: {
    DTC_SEARCH: '/automotive/dtc/search',
    DTC_DETAIL: (code: string) => `/automotive/dtc/${code}`,
    AI_ASSISTANT_CHAT: '/automotive/ai/diagnose',
  },

  // In-App Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/mark-all-read',
    UNREAD_COUNT: '/notifications/unread-count',
  },

  // Support
  SUPPORT: {
    TICKETS: '/support/tickets',
    CREATE_TICKET: '/support/tickets',
    TICKET_DETAIL: (id: string) => `/support/tickets/${id}`,
  },
} as const;
