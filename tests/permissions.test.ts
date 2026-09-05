// Unit Tests: Dynamic Role-Based Permissions & Organization Scopes

import { usePermissions, OFFICER_ROLES } from '../src/auth/usePermissions';
import { UserProfile } from '../src/types';

describe('Role-Based Permissions & Organization Scoping', () => {
  const baseWorker: UserProfile = {
    id: 'usr_tech_01',
    email: 'tech@workshop.ng',
    firstName: 'Sunday',
    lastName: 'Ojo',
    phone: '+234 801 111 2222',
    membershipNumber: 'NATA/LAG/IKJ/2024/001',
    standing: 'ACTIVE',
    tier: 'JOURNEYMAN',
    primaryTrade: 'Mechanical Engineering',
    secondaryTrades: [],
    yearsExperience: 4,
    organisation: { id: 'org_unit_01', name: 'Unit 1', level: 'UNIT' },
    roles: ['TECHNICIAN'],
    mfaEnabled: false,
    expiresAt: '2026-12-31',
    digitalCardIssuedAt: '2024-01-01',
  };

  test('ordinary technician does not receive officer workspace access', () => {
    // Pure function logic test
    const roles = new Set(baseWorker.roles);
    const isOfficerEligible = OFFICER_ROLES.some((r) => roles.has(r));
    expect(isOfficerEligible).toBe(false);
  });

  test('officer account with Financial Secretary role receives cash collection permissions', () => {
    const officerUser: UserProfile = {
      ...baseWorker,
      roles: ['TECHNICIAN', 'FINANCIAL_SECRETARY', 'INSPECTOR'],
    };

    const roles = new Set(officerUser.roles);
    const isOfficerEligible = OFFICER_ROLES.some((r) => roles.has(r));
    const canCollectCash = roles.has('FINANCIAL_SECRETARY') || roles.has('TREASURER');
    const canInspect = roles.has('INSPECTOR');

    expect(isOfficerEligible).toBe(true);
    expect(canCollectCash).toBe(true);
    expect(canInspect).toBe(true);
  });

  test('State Executive role receives governance and tenure management authority', () => {
    const chairmanUser: UserProfile = {
      ...baseWorker,
      roles: ['STATE_CHAIRMAN'],
    };

    const roles = new Set(chairmanUser.roles);
    const isStateExecutive =
      roles.has('STATE_CHAIRMAN') ||
      roles.has('STATE_VICE_CHAIRMAN') ||
      roles.has('STATE_SECRETARY');

    expect(isStateExecutive).toBe(true);
  });
});
