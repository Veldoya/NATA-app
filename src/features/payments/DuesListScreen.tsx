// Dues & Approved Payable Items Screen

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CreditCard, History, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { PayableItem } from '../../types';

export const DEMO_DUES: PayableItem[] = [
  {
    id: 'due_1',
    feeCode: 'FEE-2024-ANNUAL',
    title: '2024 NATA Lagos State Annual Practicing Due',
    category: 'ANNUAL_DUES',
    amount: 15000,
    currency: 'NGN',
    dueDate: '2024-12-31',
    status: 'PAID',
    approvedByAuthority: 'State Executive Council Resolution #2024/02',
    year: 2024,
  },
  {
    id: 'due_2',
    feeCode: 'FEE-2024-WS-LEVY',
    title: '2024 Workshop Environmental & Development Levy',
    category: 'WORKSHOP_LEVY',
    amount: 25000,
    currency: 'NGN',
    dueDate: '2024-12-31',
    status: 'PAID',
    approvedByAuthority: 'State Executive Council & Chapter Directorate',
    year: 2024,
  },
  {
    id: 'due_3',
    feeCode: 'FEE-2025-ANNUAL',
    title: '2025 NATA Lagos State Practicing Due (Early Renewal)',
    category: 'ANNUAL_DUES',
    amount: 15000,
    currency: 'NGN',
    dueDate: '2025-03-31',
    status: 'UNPAID',
    approvedByAuthority: 'State Executive Council Resolution #2024/02',
    year: 2025,
  },
];

export const DuesListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme, typography, spacing, layout } = useTheme();
  const [dues, setDues] = useState<PayableItem[]>(DEMO_DUES);

  const handlePayOnline = (item: PayableItem) => {
    Alert.alert(
      'Paystack Secure Checkout',
      `Proceed to Paystack secure payment gateway for "${item.title}" (₦${item.amount.toLocaleString()})?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Proceed to Paystack',
          onPress: () => {
            Alert.alert('Payment Successful', `Your payment of ₦${item.amount.toLocaleString()} has been confirmed by Paystack and receipt generated.`);
            setDues((prev) =>
              prev.map((d) => (d.id === item.id ? { ...d, status: 'PAID' } : d))
            );
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer scrollable={false}>
      {/* Header */}
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
            Dues & Association Fees
          </Text>
          <TouchableOpacity
            style={{ padding: spacing.xs }}
            onPress={() => navigation.navigate('PaymentHistory')}
          >
            <Text style={{ color: theme.primary, fontSize: typography.sizes.xs, fontWeight: '700' }}>
              Receipts & History →
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          Authoritative fees approved by NATA Lagos State Council.
        </Text>
      </View>

      <FlatList
        data={dues}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <Card
            variant={item.status === 'UNPAID' ? 'elevated' : 'outlined'}
            style={{
              marginBottom: spacing.md,
              borderColor: item.status === 'UNPAID' ? theme.accent : theme.border,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge label={item.category.replace('_', ' ')} variant="neutral" size="sm" />
              <Badge
                label={item.status}
                variant={item.status === 'PAID' ? 'success' : 'warning'}
                size="sm"
              />
            </View>

            <Text
              style={{
                color: theme.textPrimary,
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.bold,
                marginTop: spacing.xs,
              }}
            >
              {item.title}
            </Text>

            <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
              Authority: {item.approvedByAuthority}
            </Text>

            <View style={[styles.cardFooter, { borderTopColor: theme.border, marginTop: spacing.sm, paddingTop: spacing.xs }]}>
              <View>
                <Text style={{ color: theme.textMuted, fontSize: 10 }}>Due Date: {item.dueDate}</Text>
                <Text
                  style={{
                    color: theme.textPrimary,
                    fontSize: typography.sizes.md,
                    fontWeight: typography.weights.bold,
                    marginTop: 2,
                  }}
                >
                  ₦{item.amount.toLocaleString()}
                </Text>
              </View>

              {item.status === 'UNPAID' ? (
                <Button
                  title="Pay via Paystack"
                  onPress={() => handlePayOnline(item)}
                  variant="primary"
                  size="sm"
                />
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckCircle2 size={16} color={theme.success} style={{ marginRight: 4 }} />
                  <Text style={{ color: theme.success, fontSize: 12, fontWeight: '700' }}>
                    Cleared
                  </Text>
                </View>
              )}
            </View>
          </Card>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
});
