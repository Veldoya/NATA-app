// Navigation Route Types & Parameters

import { JobRecord, CertificateRecord, MembershipApplication } from '../types';

export type RootStackParamList = {
  Auth: undefined;
  WorkerApp: undefined;
  OfficerApp: undefined;
  Notifications: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  OTPVerification: { tempToken?: string };
  MFAVerification: { tempToken?: string };
  ForgotPassword: undefined;
  ClaimWorkshop: { code?: string };
};

export type WorkerTabParamList = {
  HomeTab: undefined;
  WorkTab: undefined;
  WorkshopTab: undefined;
  NataTab: undefined;
  ProfileTab: undefined;
};

export type WorkStackParamList = {
  JobsList: undefined;
  JobDetail: { job: JobRecord };
  EstimateEditor: { jobId: string };
  ServiceHistory: undefined;
};

export type WorkshopStackParamList = {
  WorkshopHome: undefined;
  Capabilities: undefined;
  Equipment: undefined;
};

export type NataStackParamList = {
  Payments: undefined;
  PaymentHistory: undefined;
  Certificates: undefined;
  CertificateDetail: { certificate: CertificateRecord };
  Training: undefined;
  Automotive: { initialCode?: string } | undefined;
  AIAssistant: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  DigitalCard: undefined;
  Progression: undefined;
};

export type OfficerTabParamList = {
  OfficerDashboard: undefined;
  ApplicationsTab: undefined;
  CertificateDeskTab: undefined;
  GovernanceTab: undefined;
};

export type OfficerAppStackParamList = {
  OfficerHome: undefined;
  Applications: undefined;
  ApplicationDetail: { application: MembershipApplication };
  PhysicalVerification: { application?: MembershipApplication };
  CashCollection: undefined;
  ExecutiveTenures: undefined;
  OrgHierarchy: undefined;
  CertificateDesk: undefined;
};
