// Manual Cash Collection Workflow for Authorized Financial Officers

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Banknote, ShieldAlert, CheckCircle2, User, Search } from 'lucide-react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

const APPROVED_FEES = [
  { id: 'fee_1', title: 'New Member Registration & Induction Fee', amount: 20000 },
  { id: 'fee_2', title: 'Annual Practicing Due (2024)', amount: 15000 },
  { id: 'fee_3', title: 'Workshop Accreditation Inspection Levy', amount: 35000 },
  { id: 'fee_4', title: 'Apprentice Registration & Logbook Fee', amount: 8000 },
];

export const CashCollectionScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuth();
  const { theme, typography, spacing, layout } = useTheme();

  const [memberId, setMemberId] = useState('');
  const [memberName, setMemberName] = useState('Sikiru Ogundele');
  const [selectedFee, setSelectedFee] = useState(APPROVED_FEES[0]);
  const [receiptNumber, setReceiptNumber] = useState(`REC-MAN-${Math.floor(100000 + Math.random() * 900000)}`);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecordCollection = () => {
    if (!memberId.trim() || !receiptNumber.trim()) {
      Alert.alert('Validation Error', 'Please verify Member Number and physical paper receipt reference.');
      return;
    }

    Alert.alert(
      'Confirm Manual Cash Collection',
      `Record physical cash collection of ₦${selectedFee.amount.toLocaleString()} from ${memberName} (${memberId})?\n\nCollector: ${user?.firstName} ${user?.lastName} (${user?.currentOffice})\nScope: ${user?.organisation.name}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm & Generate Audit Record',
          onPress: () => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              Alert.alert(
                'Cash Collection Recorded',
                `Audit reference recorded successfully. Digital receipt #${receiptNumber} is now active on the member's account.`,
                [{ text: 'Done', onPress: () => navigation.goBack() }]
              );
            }, 800);
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Banknote size={22} color={theme.primary} style={{ marginRight: spacing.xs }} />
          <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
            Record Cash Collection
          </Text>
        </View>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          Privileged workflow for Treasurers & Financial Secretaries. All entries generate immutable server audit logs.
        </Text>
      </View>

      {/* Collector Scope Box */}
      <Card
        variant="elevated"
        style={{
          backgroundColor: theme.surfaceSubtle,
          borderColor: theme.border,
          marginBottom: spacing.base,
        }}
      >
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs }}>
          Authorized Collector:
        </Text>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.base, fontWeight: '700' }}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={{ color: theme.primary, fontSize: typography.sizes.xs, fontWeight: '600' }}>
          {user?.currentOffice || 'Financial Secretary'} • {user?.organisation.name}
        </Text>
      </Card>

      {/* Member Details */}
      <Card variant="outlined" style={{ marginBottom: spacing.base }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.sm, fontWeight: '700', marginBottom: spacing.xs }}>
          Member / Applicant Information
        </Text>
        <Input
          label="Membership ID or Application Reference"
          placeholder="e.g. NATA/LAG/IKJ/2024/0991"
          value={memberId}
          onChangeText={setMemberId}
        />
        <Input
          label="Member Full Name"
          value={memberName}
          onChangeText={setMemberName}
        />
      </Card>

      {/* Approved Fee Selection (Fixed Non-manipulable Amount) */}
      <Card variant="outlined" style={{ marginBottom: spacing.base }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.sm, fontWeight: '700', marginBottom: spacing.xs }}>
          Select Approved Fee Item
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginBottom: spacing.sm }}>
          Amounts are fixed by Council resolutions and cannot be arbitrarily manipulated.
        </Text>

        {APPROVED_FEES.map((fee) => {
          const isSelected = selectedFee.id === fee.id;
          return (
            <TouchableOpacity
              key={fee.id}
              onPress={() => setSelectedFee(fee)}
              style={[
                styles.feeOption,
                {
                  backgroundColor: isSelected ? theme.primaryLight : theme.surface,
                  borderColor: isSelected ? theme.primary : theme.border,
                  borderRadius: layout.borderRadius.md,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.textPrimary, fontSize: 13, fontWeight: isSelected ? '700' : '500' }}>
                  {fee.title}
                </Text>
              </View>
              <Text style={{ color: theme.primary, fontSize: 14, fontWeight: '800', marginLeft: 8 }}>
                ₦{fee.amount.toLocaleString()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Card>

      {/* Receipt Reference */}
      <Card variant="outlined" style={{ marginBottom: spacing.base }}>
        <Input
          label="Physical Council Receipt Number"
          placeholder="e.g. REC-MAN-883921"
          value={receiptNumber}
          onChangeText={setReceiptNumber}
        />
        <Input
          label="Audit / Transaction Notes (Optional)"
          placeholder="e.g. Paid in cash at Ikeja Chapter monthly general meeting"
          value={notes}
          onChangeText={setNotes}
        />
      </Card>

      {/* Submit Button */}
      <Button
        title={`Record ₦${selectedFee.amount.toLocaleString()} Cash Collection`}
        onPress={handleRecordCollection}
        variant="primary"
        loading={loading}
        style={{ marginBottom: spacing.xxl }}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  feeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1.5,
    marginBottom: 8,
  },
});
