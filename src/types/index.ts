// NATA Worker Mobile Application - Core Type Definitions

export type UserRole =
  | 'APPRENTICE'
  | 'TECHNICIAN'
  | 'MASTER_TECHNICIAN'
  | 'WORKSHOP_OWNER'
  | 'INSPECTOR'
  | 'ASSESSOR'
  | 'ACCREDITATION_OFFICER'
  | 'TRAINING_OFFICER'
  | 'CERTIFICATION_OFFICER'
  | 'MEMBERSHIP_OFFICER'
  | 'SUPPORT_OFFICER'
  | 'FINANCE_ADMIN'
  | 'TREASURER'
  | 'FINANCIAL_SECRETARY'
  | 'PRO'
  | 'CHAPTER_OFFICER'
  | 'LGA_OFFICER'
  | 'UNIT_OFFICER'
  | 'STATE_CHAIRMAN'
  | 'STATE_VICE_CHAIRMAN'
  | 'STATE_SECRETARY'
  | 'STATE_ADMIN'
  | 'SUPER_ADMIN';

export type WorkspaceType = 'WORKER' | 'OFFICER';

export type OrgLevel = 'STATE' | 'LGA' | 'LCDA' | 'CHAPTER' | 'UNIT' | 'MECHANIC_VILLAGE';

export interface OrganisationScope {
  id: string;
  name: string;
  level: OrgLevel;
  code?: string;
  parentId?: string;
  parentName?: string;
  stateCode?: string;
}

export type MembershipStanding =
  | 'ACTIVE'
  | 'PENDING_RENEWAL'
  | 'EXPIRED'
  | 'SUSPENDED'
  | 'PENDING_VERIFICATION';

export type ProfessionalTier =
  | 'APPRENTICE'
  | 'JOURNEYMAN'
  | 'SENIOR_TECHNICIAN'
  | 'MASTER_TECHNICIAN';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatarUrl?: string;
  membershipNumber: string;
  standing: MembershipStanding;
  tier: ProfessionalTier;
  primaryTrade: string;
  secondaryTrades: string[];
  yearsExperience: number;
  workshopId?: string;
  workshopName?: string;
  organisation: OrganisationScope;
  roles: UserRole[];
  mfaEnabled: boolean;
  expiresAt: string;
  digitalCardIssuedAt: string;
  currentOffice?: string;
  serviceHistorySummary?: string;
}

// ----------------------------------------------------
// Jobs & Estimates
// ----------------------------------------------------
export type JobStatus =
  | 'NEW_REQUEST'
  | 'ACCEPTED'
  | 'DIAGNOSIS'
  | 'ESTIMATE_PREPARATION'
  | 'AWAITING_APPROVAL'
  | 'ESTIMATE_APPROVED'
  | 'IN_PROGRESS'
  | 'QUALITY_CONTROL'
  | 'READY_FOR_PICKUP'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED';

export interface EstimateLineItem {
  id: string;
  type: 'PARTS' | 'LABOUR' | 'FEES';
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  partNumber?: string;
}

export interface EstimateVersion {
  version: number;
  createdAt: string;
  createdBy: string;
  revisionReason?: string;
  items: EstimateLineItem[];
  subtotal: number;
  tax: number;
  depositRequired: number;
  grandTotal: number;
  status: 'DRAFT' | 'PRESENTED' | 'APPROVED' | 'REJECTED' | 'SUPERSEDED';
  customerDecisionAt?: string;
  customerNotes?: string;
}

export interface JobRecord {
  id: string;
  jobReference: string;
  status: JobStatus;
  customerNameMasked: string;
  customerPhoneMasked: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vinMasked: string;
  plateMasked: string;
  mileage: number;
  customerComplaint: string;
  diagnosisNotes?: string;
  dtcCodes: string[];
  assignedTechnicianId: string;
  assignedTechnicianName: string;
  workshopId: string;
  workshopName: string;
  estimates: EstimateVersion[];
  currentEstimateVersion: number;
  depositPaid: number;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  warrantyPeriodDays?: number;
  photos: {
    id: string;
    stage: 'BEFORE' | 'DIAGNOSTIC' | 'AFTER' | 'QC';
    url: string;
    caption: string;
    uploadedAt: string;
  }[];
}

// ----------------------------------------------------
// Workshop & Capabilities
// ----------------------------------------------------
export type VerificationStatus =
  | 'SELF_DECLARED'
  | 'UNDER_REVIEW'
  | 'VERIFIED'
  | 'REJECTED_NEEDS_EVIDENCE';

export interface VehicleCapability {
  id: string;
  make: string;
  modelsSupported: string; // e.g. "Corolla, Camry, RAV4" or "All"
  yearRange: string; // e.g. "2005 - 2024"
  powertrains: ('PETROL' | 'DIESEL' | 'HYBRID' | 'EV')[];
  specialisation: string; // e.g. "ECU Diagnostics & Key Coding"
  status: VerificationStatus;
  verifiedBy?: string;
  verifiedDate?: string;
  evidenceUrl?: string;
}

export interface WorkshopEquipment {
  id: string;
  name: string;
  category: 'DIAGNOSTICS' | 'LIFTING' | 'AC_SERVICE' | 'TYRE_ALIGNMENT' | 'SPECIALTY_TOOLS';
  brandModel: string;
  serialNumberMasked?: string;
  isOperational: boolean;
  status: VerificationStatus;
  verifiedBy?: string;
  verifiedDate?: string;
}

export interface WorkshopProfile {
  id: string;
  name: string;
  registrationNumber: string;
  cacNumber?: string;
  address: string;
  organisation: OrganisationScope;
  phone: string;
  email: string;
  ownerId: string;
  ownerName: string;
  accreditationGrade: 'GRADE_A' | 'GRADE_B' | 'GRADE_C' | 'UNACCREDITED' | 'PENDING_INSPECTION';
  accreditationExpiry?: string;
  staffCount: number;
  technicians: {
    id: string;
    name: string;
    membershipNumber: string;
    tier: ProfessionalTier;
    role: string;
    isVerified: boolean;
  }[];
  capabilities: VehicleCapability[];
  equipment: WorkshopEquipment[];
  images: string[];
}

// ----------------------------------------------------
// Training & Certificates
// ----------------------------------------------------
export interface TrainingProgramme {
  id: string;
  code: string;
  title: string;
  category: string;
  durationWeeks: number;
  deliveryMode: 'PHYSICAL' | 'HYBRID' | 'ONLINE';
  venue?: string;
  accreditedBy: string;
  description: string;
  modules: {
    moduleCode: string;
    title: string;
    competencies: string[];
  }[];
  startDate: string;
  endDate: string;
  enrollmentStatus?: 'NOT_ENROLLED' | 'APPLIED' | 'ENROLLED' | 'IN_PROGRESS' | 'COMPLETED';
  progressPercentage?: number;
  attendanceRate?: number;
}

export interface CertificateRecord {
  id: string;
  certificateNumber: string;
  title: string;
  trade: string;
  issuedToName: string;
  membershipNumber: string;
  issueDate: string;
  expiryDate?: string;
  status: 'VALID' | 'SUSPENDED' | 'REVOKED' | 'REPLACED';
  trainingOfficerApprovedBy: string;
  assessorApprovedBy: string;
  certificationOfficerApprovedBy: string;
  stateSecretaryApprovedBy: string;
  stateChairmanApprovedBy: string;
  qrPayloadUrl: string;
  verificationHash: string;
  pdfDownloadUrl: string;
}

// ----------------------------------------------------
// Payments & Cash Collection
// ----------------------------------------------------
export interface PayableItem {
  id: string;
  feeCode: string;
  title: string;
  category: 'ANNUAL_DUES' | 'WORKSHOP_LEVY' | 'TRAINING_FEE' | 'APPLICATION_FEE' | 'CERTIFICATION_FEE';
  amount: number;
  currency: 'NGN';
  dueDate: string;
  status: 'UNPAID' | 'PAID' | 'WAIVED' | 'PARTIAL';
  approvedByAuthority: string;
  year: number;
}

export interface PaymentTransaction {
  id: string;
  reference: string;
  feeTitle: string;
  amount: number;
  paidAt: string;
  channel: 'PAYSTACK_ONLINE' | 'MANUAL_CASH_OFFICER' | 'BANK_TRANSFER_VERIFIED';
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  receiptNumber: string;
  collectorName?: string;
  collectorRole?: string;
  organisationScopeName: string;
}

export interface CashCollectionPayload {
  memberId: string;
  membershipNumber: string;
  applicantName: string;
  feeItemId: string;
  amount: number;
  receiptNumber: string;
  collectionDate: string;
  organisationScopeId: string;
  notes?: string;
}

// ----------------------------------------------------
// Officer & Governance
// ----------------------------------------------------
export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'PHYSICAL_VERIFICATION'
  | 'CORRECTIONS_REQUIRED'
  | 'PAYMENT_PENDING'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'REJECTED';

export interface MembershipApplication {
  id: string;
  applicationReference: string;
  applicantName: string;
  phone: string;
  email: string;
  photoUrl?: string;
  trade: string;
  proposedTier: ProfessionalTier;
  workshopName: string;
  organisation: OrganisationScope;
  status: ApplicationStatus;
  submittedAt: string;
  idDocumentType: 'NIN' | 'VOTERS_CARD' | 'DRIVERS_LICENSE' | 'INTERNATIONAL_PASSPORT';
  idDocumentUrl?: string;
  experienceYears: number;
  specialisations: string[];
  physicalVerificationNotes?: string;
  verifiedByOfficer?: string;
  verifiedAt?: string;
  feePaid: boolean;
  timeline: {
    status: ApplicationStatus;
    timestamp: string;
    actor: string;
    comment?: string;
  }[];
}

export interface ExecutiveTenure {
  id: string;
  officerId: string;
  officerName: string;
  membershipNumber: string;
  position: string;
  scope: OrganisationScope;
  maxTermYears: number; // 4 for State, 3 for LGA/Chapter, 2 for Unit
  termNumber: 1 | 2;
  inaugurationDate: string;
  expectedEndDate: string;
  isExpiringSoon: boolean;
  status: 'ACTIVE' | 'CONCLUDED' | 'RESIGNED' | 'SUSPENDED';
}

// ----------------------------------------------------
// Automotive Tools & AI
// ----------------------------------------------------
export interface DTCCode {
  code: string; // e.g. "P0300"
  category: 'POWERTRAIN' | 'CHASSIS' | 'BODY' | 'NETWORK';
  title: string;
  description: string;
  commonCauses: string[];
  symptoms: string[];
  diagnosticSteps: string[];
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface AIAssistantMessage {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  timestamp: string;
  suggestedDTCs?: string[];
  safetyCaveat?: string;
}

// ----------------------------------------------------
// In-App Notifications
// ----------------------------------------------------
export interface AppNotification {
  id: string;
  category:
    | 'MEMBERSHIP'
    | 'PAYMENT'
    | 'APPLICATION'
    | 'JOB'
    | 'ESTIMATE'
    | 'TRAINING'
    | 'CERTIFICATE'
    | 'ACCREDITATION'
    | 'OFFICER_APPROVAL'
    | 'SYSTEM';
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  actionUrl?: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH';
}
