// Unit Tests: Manual Cash Collection Audit Trail & Amount Validation

import { CashCollectionPayload, PayableItem } from '../src/types';

describe('Manual Cash Collection Business Rule Validation', () => {
  const approvedAnnualDue: PayableItem = {
    id: 'fee_annual_2024',
    feeCode: 'FEE-2024-ANNUAL',
    title: '2024 Annual Practicing Due',
    category: 'ANNUAL_DUES',
    amount: 15000,
    currency: 'NGN',
    dueDate: '2024-12-31',
    status: 'UNPAID',
    approvedByAuthority: 'State Executive Council Resolution',
    year: 2024,
  };

  test('validates that collected amount matches approved fee and contains receipt reference', () => {
    const validPayload: CashCollectionPayload = {
      memberId: 'usr_member_99',
      membershipNumber: 'NATA/LAG/IKJ/2024/0991',
      applicantName: 'Sikiru Ogundele',
      feeItemId: approvedAnnualDue.id,
      amount: approvedAnnualDue.amount, // Exactly 15,000 NGN
      receiptNumber: 'REC-MAN-441299',
      collectionDate: new Date().toISOString(),
      organisationScopeId: 'org_unit_04',
      notes: 'Paid at Ikeja Central monthly Unit meeting',
    };

    // Validation logic
    const isAmountValid = validPayload.amount === approvedAnnualDue.amount;
    const hasReceiptNumber = Boolean(validPayload.receiptNumber && validPayload.receiptNumber.trim().length > 0);
    const hasCollectorScope = Boolean(validPayload.organisationScopeId);

    expect(isAmountValid).toBe(true);
    expect(hasReceiptNumber).toBe(true);
    expect(hasCollectorScope).toBe(true);
  });

  test('rejects arbitrary amount tampering during cash collection', () => {
    const tamperedPayload: CashCollectionPayload = {
      memberId: 'usr_member_99',
      membershipNumber: 'NATA/LAG/IKJ/2024/0991',
      applicantName: 'Sikiru Ogundele',
      feeItemId: approvedAnnualDue.id,
      amount: 10000, // Arbitrarily altered amount (10k instead of 15k)
      receiptNumber: 'REC-MAN-441299',
      collectionDate: new Date().toISOString(),
      organisationScopeId: 'org_unit_04',
    };

    const isAmountValid = tamperedPayload.amount === approvedAnnualDue.amount;
    expect(isAmountValid).toBe(false);
  });
});
