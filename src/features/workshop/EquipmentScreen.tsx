// Workshop Equipment & Diagnostic Tools Screen

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Wrench, CheckCircle2, AlertTriangle, Plus, ShieldCheck } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { WorkshopEquipment } from '../../types';

export const DEMO_EQUIPMENT: WorkshopEquipment[] = [
  {
    id: 'eq_1',
    name: 'Bidirectional Diagnostic Scan Tool',
    category: 'DIAGNOSTICS',
    brandModel: 'Autel MaxiSys Ultra / MaxiFlash VCMI',
    serialNumberMasked: 'AUT-***-9921',
    isOperational: true,
    status: 'VERIFIED',
    verifiedBy: 'Inspector F. Adeleke',
    verifiedDate: '2024-02-18',
  },
  {
    id: 'eq_2',
    name: 'Dual-Column Electro-Hydraulic Vehicle Lift (4.5 Ton)',
    category: 'LIFTING',
    brandModel: 'Launch TLT-245AT',
    serialNumberMasked: 'LCH-***-4412',
    isOperational: true,
    status: 'VERIFIED',
    verifiedBy: 'Inspector F. Adeleke',
    verifiedDate: '2024-02-18',
  },
  {
    id: 'eq_3',
    name: 'Fully Automatic R134a/R1234yf AC Recovery & Charging Station',
    category: 'AC_SERVICE',
    brandModel: 'Robinair AC1234-6',
    serialNumberMasked: 'ROB-***-1188',
    isOperational: true,
    status: 'VERIFIED',
    verifiedBy: 'Inspector F. Adeleke',
    verifiedDate: '2024-02-18',
  },
  {
    id: 'eq_4',
    name: 'Digital 4-Wheel Computerized Alignment Rig',
    category: 'TYRE_ALIGNMENT',
    brandModel: 'Hunter HawkEye Elite',
    isOperational: true,
    status: 'SELF_DECLARED',
  },
];

export const EquipmentScreen: React.FC = () => {
  const { theme, typography, spacing } = useTheme();

  return (
    <ScreenContainer scrollable={false}>
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
          Workshop Tools & Equipment
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          Essential workshop equipment inspected for official NATA accreditation grading.
        </Text>
      </View>

      <FlatList
        data={DEMO_EQUIPMENT}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <Card
            variant={item.status === 'VERIFIED' ? 'elevated' : 'outlined'}
            style={{
              marginBottom: spacing.md,
              borderColor: item.status === 'VERIFIED' ? theme.success : theme.border,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge label={item.category.replace('_', ' ')} variant="neutral" size="sm" />
              {item.status === 'VERIFIED' ? (
                <Badge label="INSPECTED & VERIFIED" variant="success" size="sm" />
              ) : (
                <Badge label="SELF DECLARED" variant="warning" size="sm" />
              )}
            </View>

            <Text
              style={{
                color: theme.textPrimary,
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.bold,
                marginTop: spacing.xs,
              }}
            >
              {item.name}
            </Text>

            <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
              Brand & Model: {item.brandModel}
            </Text>

            {item.serialNumberMasked && (
              <Text style={{ color: theme.textMuted, fontSize: 11, marginTop: 2 }}>
                Serial: {item.serialNumberMasked}
              </Text>
            )}

            <View style={[styles.footer, { borderTopColor: theme.border, marginTop: spacing.sm, paddingTop: spacing.xs }]}>
              <Text style={{ color: item.isOperational ? theme.success : theme.error, fontSize: 11, fontWeight: '700' }}>
                {item.isOperational ? '● Operational' : '○ Under Maintenance'}
              </Text>
              {item.verifiedBy && (
                <Text style={{ color: theme.textMuted, fontSize: 10 }}>
                  Inspected: {item.verifiedDate}
                </Text>
              )}
            </View>
          </Card>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
});
