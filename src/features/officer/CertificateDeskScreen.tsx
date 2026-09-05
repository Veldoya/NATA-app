// Officer Certificate Desk - Maker-Checker Approval Queue

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Award, CheckCircle2, ShieldCheck, XCircle, Clock } from 'lucide-react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface PendingCertificate {
  id: string;
  candidateName: string;
  membershipNumber: string;
  programmeTitle: string;
  trade: string;
  currentStage: 'TRAINING_OFFICER' | 'ASSESSOR' | 'CERTIFICATION_OFFICER' | 'STATE_SECRETARY' | 'STATE_CHAIRMAN';
  stageTitle: string;
  submittedDate: string;
}

const DEMO_PENDING_CERTS: PendingCertificate[] = [
  {
    id: 'pc_1',
    candidateName: 'Emeka Okafor',
    membershipNumber: 'NATA/LAG/IKJ/2023/1102',
    programmeTitle: 'Automotive Electrical & ECU Diagnostic Engineering',
    trade: 'Auto Electrical',
    currentStage: 'CERTIFICATION_OFFICER',
    stageTitle: 'Stage 3: State Certification Officer Compliance Review',
    submittedDate: '2024-09-02',
  },
  {
    id: 'pc_2',
    candidateName: 'Mustapha Audu',
    membershipNumber: 'NATA/LAG/OSH/2022/0741',
    programmeTitle: 'Common Rail Diesel (CRDI) High-Pressure System Diagnosis',
    trade: 'Diesel Systems',
    currentStage: 'STATE_SECRETARY',
    stageTitle: 'Stage 4: State Secretary Registry Endorsement',
    submittedDate: '2024-08-30',
  },
];

export const CertificateDeskScreen: React.FC = () => {
  const { user } = useAuth();
  const { theme, typography, spacing, layout } = useTheme();
  const [queue, setQueue] = useState<PendingCertificate[]>(DEMO_PENDING_CERTS);

  const handleApprove = (cert: PendingCertificate) => {
    Alert.alert(
      'Sign & Endorse Certificate',
      `Endorse certificate issuance for ${cert.candidateName} at ${cert.stageTitle}?\n\nSigning Official: ${user?.firstName} ${user?.lastName} (${user?.currentOffice})`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Endorsement',
          onPress: () => {
            setQueue((prev) => prev.filter((c) => c.id !== cert.id));
            Alert.alert('Endorsement Logged', 'Maker-checker sign-off recorded on immutable audit ledger.');
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer scrollable={false}>
      {/* Header */}
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
          Certificate Desk Queue
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          Governed maker-checker stage approvals. Self-approval is strictly prohibited.
        </Text>
      </View>

      <FlatList
        data={queue}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        ListEmptyComponent={
          <Card variant="outlined" style={{ padding: spacing.xl, alignItems: 'center' }}>
            <CheckCircle2 size={32} color={theme.success} />
            <Text style={{ color: theme.textPrimary, fontSize: 14, fontWeight: '700', marginTop: 8 }}>
              No Pending Certificates
            </Text>
            <Text style={{ color: theme.textSecondary, fontSize: 12, textAlign: 'center', marginTop: 4 }}>
              All certificate maker-checker queues within your jurisdiction are clear.
            </Text>
          </Card>
        }
        renderItem={({ item }) => (
          <Card variant="elevated" style={{ marginBottom: spacing.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge label="APPROVAL REQUIRED" variant="warning" size="sm" />
              <Text style={{ color: theme.textMuted, fontSize: 11 }}>
                Submitted: {item.submittedDate}
              </Text>
            </View>

            <Text
              style={{
                color: theme.textPrimary,
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.bold,
                marginTop: spacing.xs,
              }}
            >
              {item.candidateName}
            </Text>

            <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
              {item.membershipNumber} • Trade: {item.trade}
            </Text>

            <View
              style={[
                styles.stageBox,
                { backgroundColor: theme.primaryLight, borderRadius: layout.borderRadius.sm, marginTop: spacing.sm },
              ]}
            >
              <Award size={16} color={theme.primary} style={{ marginRight: 6 }} />
              <Text style={{ color: theme.primary, fontSize: 11, fontWeight: '700', flex: 1 }}>
                {item.stageTitle}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 10, marginTop: spacing.base }}>
              <Button
                title="Endorse & Advance"
                onPress={() => handleApprove(item)}
                variant="primary"
                size="sm"
                style={{ flex: 1 }}
              />
            </View>
          </Card>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  stageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
});
