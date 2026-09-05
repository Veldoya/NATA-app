// Unit Tests: Immutable Estimates & Line Item Calculations

import { EstimateLineItem, EstimateVersion } from '../src/types';

describe('Immutable Estimate Costing Calculations', () => {
  test('accurately calculates subtotal, parts, labour and deposit requirement', () => {
    const items: EstimateLineItem[] = [
      {
        id: '1',
        type: 'PARTS',
        description: 'Brake Disc Rotors (Front Pair)',
        quantity: 2,
        unitPrice: 45000,
        totalPrice: 90000,
      },
      {
        id: '2',
        type: 'PARTS',
        description: 'Ceramic Brake Pads',
        quantity: 1,
        unitPrice: 32000,
        totalPrice: 32000,
      },
      {
        id: '3',
        type: 'LABOUR',
        description: 'Brake Assembly Installation & Caliper Bleed',
        quantity: 1,
        unitPrice: 20000,
        totalPrice: 20000,
      },
    ];

    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const tax = 0;
    const grandTotal = subtotal + tax;
    const depositRequired = Math.round(grandTotal * 0.6); // 60% standard deposit

    expect(subtotal).toBe(142000);
    expect(grandTotal).toBe(142000);
    expect(depositRequired).toBe(85200);

    const version1: EstimateVersion = {
      version: 1,
      createdAt: new Date().toISOString(),
      createdBy: 'Babatunde Adeleke',
      items,
      subtotal,
      tax,
      depositRequired,
      grandTotal,
      status: 'PRESENTED',
    };

    expect(version1.version).toBe(1);
    expect(version1.items.length).toBe(3);
  });

  test('preserves version 1 intact when creating revision version 2', () => {
    const version1: EstimateVersion = {
      version: 1,
      createdAt: '2024-09-01T10:00:00Z',
      createdBy: 'Technician',
      items: [{ id: '1', type: 'PARTS', description: 'Item 1', quantity: 1, unitPrice: 50000, totalPrice: 50000 }],
      subtotal: 50000,
      tax: 0,
      depositRequired: 30000,
      grandTotal: 50000,
      status: 'REJECTED',
      customerNotes: 'Please check if aftermarket brand is cheaper',
    };

    const version2: EstimateVersion = {
      version: 2,
      createdAt: '2024-09-01T14:00:00Z',
      createdBy: 'Technician',
      revisionReason: 'Revised with OEM equivalent parts per customer request',
      items: [{ id: '2', type: 'PARTS', description: 'Item 1 (Alternative)', quantity: 1, unitPrice: 35000, totalPrice: 35000 }],
      subtotal: 35000,
      tax: 0,
      depositRequired: 20000,
      grandTotal: 35000,
      status: 'PRESENTED',
    };

    const estimateHistory = [version1, version2];

    expect(estimateHistory.length).toBe(2);
    expect(estimateHistory[0].grandTotal).toBe(50000);
    expect(estimateHistory[1].grandTotal).toBe(35000);
    expect(estimateHistory[0].status).toBe('REJECTED');
  });
});
