// Role and Scope-based permission evaluation hooks

import { useMemo } from 'react';
import { UserRole, UserProfile } from '../types';

export const OFFICER_ROLES: readonly UserRole[] = [
  'INSPECTOR',
  'ASSESSOR',
  'ACCREDITATION_OFFICER',
  'TRAINING_OFFICER',
  'CERTIFICATION_OFFICER',
  'MEMBERSHIP_OFFICER',
  'SUPPORT_OFFICER',
  'FINANCE_ADMIN',
  'TREASURER',
  'FINANCIAL_SECRETARY',
  'PRO',
  'CHAPTER_OFFICER',
  'LGA_OFFICER',
  'UNIT_OFFICER',
  'STATE_CHAIRMAN',
  'STATE_VICE_CHAIRMAN',
  'STATE_SECRETARY',
  'STATE_ADMIN',
  'SUPER_ADMIN',
] as const;

export const FINANCIAL_ROLES: readonly UserRole[] = [
  'TREASURER',
  'FINANCIAL_SECRETARY',
  'FINANCE_ADMIN',
  'STATE_ADMIN',
  'SUPER_ADMIN',
] as const;

export const MEMBERSHIP_GOVERNANCE_ROLES: readonly UserRole[] = [
  'MEMBERSHIP_OFFICER',
  'STATE_SECRETARY',
  'CHAPTER_OFFICER',
  'LGA_OFFICER',
  'UNIT_OFFICER',
  'STATE_CHAIRMAN',
  'STATE_ADMIN',
  'SUPER_ADMIN',
] as const;

export const CERTIFICATION_DESK_ROLES: readonly UserRole[] = [
  'TRAINING_OFFICER',
  'ASSESSOR',
  'CERTIFICATION_OFFICER',
  'STATE_SECRETARY',
  'STATE_CHAIRMAN',
  'SUPER_ADMIN',
] as const;

export const INSPECTION_ROLES: readonly UserRole[] = [
  'INSPECTOR',
  'ASSESSOR',
  'ACCREDITATION_OFFICER',
  'STATE_ADMIN',
  'SUPER_ADMIN',
] as const;

export interface PermissionChecks {
  isOfficerEligible: boolean;
  isFinancialOfficer: boolean;
  isMembershipOfficer: boolean;
  isCertificationOfficer: boolean;
  isInspector: boolean;
  isStateExecutive: boolean;
  isSuperAdmin: boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  canCollectCash: boolean;
  canVerifyApplications: boolean;
  canApproveCertificates: boolean;
  canInspectWorkshops: boolean;
  canManageTenures: boolean;
  canAccessOrgHierarchy: boolean;
}

export function usePermissions(user: UserProfile | null): PermissionChecks {
  return useMemo(() => {
    if (!user || !user.roles || user.roles.length === 0) {
      return {
        isOfficerEligible: false,
        isFinancialOfficer: false,
        isMembershipOfficer: false,
        isCertificationOfficer: false,
        isInspector: false,
        isStateExecutive: false,
        isSuperAdmin: false,
        hasRole: () => false,
        canCollectCash: false,
        canVerifyApplications: false,
        canApproveCertificates: false,
        canInspectWorkshops: false,
        canManageTenures: false,
        canAccessOrgHierarchy: false,
      };
    }

    const roles = new Set<UserRole>(user.roles);

    const hasAnyRole = (targetRoles: readonly UserRole[]): boolean => {
      return targetRoles.some((r) => roles.has(r));
    };

    const isOfficerEligible = hasAnyRole(OFFICER_ROLES);
    const isFinancialOfficer = hasAnyRole(FINANCIAL_ROLES);
    const isMembershipOfficer = hasAnyRole(MEMBERSHIP_GOVERNANCE_ROLES);
    const isCertificationOfficer = hasAnyRole(CERTIFICATION_DESK_ROLES);
    const isInspector = hasAnyRole(INSPECTION_ROLES);
    const isStateExecutive =
      roles.has('STATE_CHAIRMAN') ||
      roles.has('STATE_VICE_CHAIRMAN') ||
      roles.has('STATE_SECRETARY') ||
      roles.has('STATE_ADMIN') ||
      roles.has('SUPER_ADMIN');
    const isSuperAdmin = roles.has('SUPER_ADMIN');

    return {
      isOfficerEligible,
      isFinancialOfficer,
      isMembershipOfficer,
      isCertificationOfficer,
      isInspector,
      isStateExecutive,
      isSuperAdmin,
      hasRole: (target: UserRole | UserRole[]) => {
        if (Array.isArray(target)) {
          return target.some((r) => roles.has(r));
        }
        return roles.has(target);
      },
      canCollectCash: isFinancialOfficer,
      canVerifyApplications: isMembershipOfficer || isInspector,
      canApproveCertificates: isCertificationOfficer,
      canInspectWorkshops: isInspector,
      canManageTenures: isStateExecutive,
      canAccessOrgHierarchy: isOfficerEligible,
    };
  }, [user]);
}
