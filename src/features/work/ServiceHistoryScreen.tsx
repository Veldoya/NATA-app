// Immutable Service History Screen

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Car, History, ShieldCheck, Calendar } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

interface ServiceHistoryItem {
  id: string;
  reference: string;
  vehicle: string;
  mileage: number;
  completedDate: string;
  workSummary: string;
  totalCost: number;
  warrantySnapshot: string;
}

const DEMO_SERVICE_HISTORY: ServiceHistoryItem[] = [
  {
    id: 'hist_1',
    reference: 'SRV-2024-0312',
    vehicle: '2017 Toyota Prado TXL 2.7L',
    mileage: 128400,
    completedDate: '2024-08-18',
    workSummary: 'Front suspension rebuild, OEM lower ball joints, tie-rod ends and 4-wheel alignment.',
    totalCost: 285000,
    warrantySnapshot: '90 Days / 5,000 km Workmanship Warranty',
  },
  {
    id: 'hist_2',
    reference: 'SRV-2024-0298',
    vehicle: '2019 Honda Accord 1.5T Turbo',
    mileage: 64200,
    completedDate: '2024-08-04',
    workSummary: 'Direct fuel injector cleaning, high-pressure fuel rail test & spark plug replacement.',
    totalCost: 145000,
    warrantySnapshot: '60 Days Workmanship Warranty',
  },
  {
    id: 'hist_3',
    reference: 'SRV-2024-0245',
    vehicle: '2015 Mercedes-Benz GLK 350',
    mileage: 152000,
    completedDate: '2024-07-22',
    workSummary: 'Alternator replacement, serpentine belt & battery registration via Star Diagnostics.',
    totalCost: 240000,
    warrantySnapshot: '180 Days Part Warranty (OEM Bosch)',
  },
];

export const ServiceHistoryScreen: React.FC = () => {
  const { theme, typography, spacing, layout } = useTheme();

  return (
    <ScreenContainer scrollable={false}>
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
          Verified Service Records
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          Immutable records of completed workshop services with warranty snapshots.
        </Text>
      </View>

      <FlatList
        data={DEMO_SERVICE_HISTORY}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <Card variant="elevated" style={{ marginBottom: spacing.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, fontWeight: '700' }}>
                {item.reference}
              </Text>
              <Badge label="COMPLETED" variant="success" size="sm" />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs }}>
              <Car size={18} color={theme.primary} style={{ marginRight: spacing.xs }} />
              <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.base, fontWeight: typography.weights.bold }}>
                {item.vehicle}
              </Text>
            </View>

            <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 4 }}>
              {item.workSummary}
            </Text>

            <View
              style={[
                styles.warrantyBox,
                { backgroundColor: theme.primaryLight, borderRadius: layout.borderRadius.sm, marginTop: spacing.sm },
              ]}
            >
              <ShieldCheck size={14} color={theme.primary} style={{ marginRight: 6 }} />
              <Text style={{ color: theme.primary, fontSize: 11, fontWeight: '600', flex: 1 }}>
                {item.warrantySnapshot}
              </Text>
            </View>

            <View style={[styles.cardFooter, { borderTopColor: theme.border, marginTop: spacing.sm, paddingTop: spacing.xs }]}>
              <Text style={{ color: theme.textMuted, fontSize: 11 }}>
                Completed: {item.completedDate} • {item.mileage.toLocaleString()} km
              </Text>
              <Text style={{ color: theme.textPrimary, fontSize: 12, fontWeight: '700' }}>
                ₦{item.totalCost.toLocaleString()}
              </Text>
            </View>
          </Card>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  warrantyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
});
