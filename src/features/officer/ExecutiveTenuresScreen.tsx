// Executive Tenures & Governance Tracking Screen

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { History, ShieldAlert, Clock, CheckCircle2, User, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ExecutiveTenure } from '../../types';

export const DEMO_TENURES: ExecutiveTenure[] = [
  {
    id: 'ten_1',
    officerId: 'usr_ch_01',
    officerName: 'Alhaji (Engr.) Jacob Alade',
    membershipNumber: 'NATA/LAG/ST/2018/0001',
    position: 'State Chairman',
    scope: { id: 'org_state_01', name: 'Lagos State Council', level: 'STATE' },
    maxTermYears: 4,
    termNumber: 2,
    inaugurationDate: '2022-03-15',
    expectedEndDate: '2026-03-14',
    isExpiringSoon: false,
    status: 'ACTIVE',
  },
  {
    id: 'ten_2',
    officerId: 'usr_sec_01',
    officerName: 'Comrade Sunday Adebayo',
    membershipNumber: 'NATA/LAG/ST/2018/0014',
    position: 'State Secretary',
    scope: { id: 'org_state_01', name: 'Lagos State Council', level: 'STATE' },
    maxTermYears: 4,
    termNumber: 1,
    inaugurationDate: '2022-03-15',
    expectedEndDate: '2026-03-14',
    isExpiringSoon: false,
    status: 'ACTIVE',
  },
  {
    id: 'ten_3',
    officerId: 'usr_nata_001',
    officerName: 'Babatunde Adeleke',
    membershipNumber: 'NATA/LAG/IKJ/2023/0482',
    position: 'Financial Secretary',
    scope: { id: 'org_ch_02', name: 'Ikeja Chapter / LCDA', level: 'CHAPTER' },
    maxTermYears: 3,
    termNumber: 1,
    inaugurationDate: '2023-06-01',
    expectedEndDate: '2026-05-31',
    isExpiringSoon: false,
    status: 'ACTIVE',
  },
  {
    id: 'ten_4',
    officerId: 'usr_unit_ch_01',
    officerName: 'Elder Joseph Ogundimu',
    membershipNumber: 'NATA/LAG/IKJ/2019/0811',
    position: 'Unit Chairman',
    scope: { id: 'org_unit_04', name: 'Ikeja Central Mechanic Village Unit 2', level: 'UNIT' },
    maxTermYears: 2,
    termNumber: 2,
    inaugurationDate: '2023-01-10',
    expectedEndDate: '2025-01-09',
    isExpiringSoon: true,
    status: 'ACTIVE',
  },
];

export const ExecutiveTenuresScreen: React.FC = () => {
  const { theme, typography, spacing, layout } = useTheme();

  return (
    <ScreenContainer scrollable={false}>
      {/* Header */}
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
          Executive Tenures & Governance
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          Constitutional tenure limits: State (4 yrs), Chapter (3 yrs), Unit (2 yrs). Maximum 2 terms.
        </Text>
      </View>

      <FlatList
        data={DEMO_TENURES}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <Card
            variant="elevated"
            style={{
              marginBottom: spacing.md,
              borderColor: item.isExpiringSoon ? theme.warning : theme.border,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge label={`${item.scope.level} EXECUTIVE`} variant="officer" size="sm" />
              {item.isExpiringSoon ? (
                <Badge label="EXPIRING SOON" variant="warning" size="sm" />
              ) : (
                <Badge label={`TERM ${item.termNumber} OF 2`} variant="neutral" size="sm" />
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
              {item.position}
            </Text>

            <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.sm, marginTop: 2 }}>
              {item.officerName} ({item.membershipNumber})
            </Text>

            <Text style={{ color: theme.textMuted, fontSize: 11, marginTop: 2 }}>
              Jurisdiction: {item.scope.name}
            </Text>

            <View style={[styles.tenureFooter, { borderTopColor: theme.border, marginTop: spacing.sm, paddingTop: spacing.xs }]}>
              <View>
                <Text style={{ color: theme.textMuted, fontSize: 10 }}>
                  Inaugurated: {item.inaugurationDate}
                </Text>
                <Text style={{ color: theme.textPrimary, fontSize: 11, fontWeight: '700' }}>
                  Expires: {item.expectedEndDate} ({item.maxTermYears}-Year Term)
                </Text>
              </View>
            </View>
          </Card>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  tenureFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
});
