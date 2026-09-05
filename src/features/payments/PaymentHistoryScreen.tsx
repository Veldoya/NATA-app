// Payment History & Official Digital Receipts Screen

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Receipt, CheckCircle2, Download, ShieldCheck } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { PaymentTransaction } from '../../types';

export const DEMO_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'tx_1',
    reference: 'PAY-2024-9921',
    feeTitle: '2024 NATA Lagos State Annual Practicing Due',
    amount: 15000,
    paidAt: '2024-02-14 11:22 AM',
    channel: 'PAYSTACK_ONLINE',
    status: 'SUCCESS',
    receiptNumber: 'REC-NATA-LAG-2024-0881',
    organisationScopeName: 'Ikeja Chapter / LCDA',
  },
  {
    id: 'tx_2',
    reference: 'PAY-2024-8842',
    feeTitle: '2024 Workshop Environmental & Development Levy',
    amount: 25000,
    paidAt: '2024-02-14 11:25 AM',
    channel: 'PAYSTACK_ONLINE',
    status: 'SUCCESS',
    receiptNumber: 'REC-NATA-LAG-2024-0882',
    organisationScopeName: 'Ikeja Chapter / LCDA',
  },
  {
    id: 'tx_3',
    reference: 'PAY-2023-4410',
    feeTitle: '2023 NATA Lagos State Annual Practicing Due',
    amount: 12000,
    paidAt: '2023-01-20 02:45 PM',
    channel: 'MANUAL_CASH_OFFICER',
    status: 'SUCCESS',
    receiptNumber: 'REC-NATA-LAG-2023-0194',
    collectorName: 'Comrade K. Adeleke (Financial Secretary)',
    collectorRole: 'FINANCIAL_SECRETARY',
    organisationScopeName: 'Ikeja Chapter / LCDA',
  },
];

export const PaymentHistoryScreen: React.FC = () => {
  const { theme, typography, spacing, layout } = useTheme();

  const handleDownloadReceipt = (tx: PaymentTransaction) => {
    Alert.alert('Digital Receipt', `Receipt #${tx.receiptNumber}\n\nItem: ${tx.feeTitle}\nAmount: ₦${tx.amount.toLocaleString()}\nChannel: ${tx.channel.replace('_', ' ')}\nScope: ${tx.organisationScopeName}`);
  };

  return (
    <ScreenContainer scrollable={false}>
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
          Payment Receipts & History
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          Official electronic receipts issued by NATA Lagos State Council.
        </Text>
      </View>

      <FlatList
        data={DEMO_TRANSACTIONS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <Card variant="elevated" style={{ marginBottom: spacing.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, fontWeight: '700' }}>
                {item.receiptNumber}
              </Text>
              <Badge label="VERIFIED" variant="success" size="sm" />
            </View>

            <Text
              style={{
                color: theme.textPrimary,
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.bold,
                marginTop: spacing.xs,
              }}
            >
              {item.feeTitle}
            </Text>

            <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
              Channel: {item.channel.replace('_', ' ')}
            </Text>

            {item.collectorName && (
              <Text style={{ color: theme.textMuted, fontSize: 11, marginTop: 2 }}>
                Collected by: {item.collectorName}
              </Text>
            )}

            <View style={[styles.cardFooter, { borderTopColor: theme.border, marginTop: spacing.sm, paddingTop: spacing.xs }]}>
              <View>
                <Text style={{ color: theme.textMuted, fontSize: 10 }}>Paid: {item.paidAt}</Text>
                <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.md, fontWeight: '800' }}>
                  ₦{item.amount.toLocaleString()}
                </Text>
              </View>

              <Button
                title="View Receipt"
                onPress={() => handleDownloadReceipt(item)}
                variant="outline"
                size="sm"
                icon={<Receipt size={14} color={theme.primary} style={{ marginRight: 4 }} />}
              />
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
