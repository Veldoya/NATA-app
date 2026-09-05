// Certificate Detail & Maker-Checker Audit Trail Screen

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Award, ShieldCheck, CheckCircle2, FileText, Lock, QrCode } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CertificateRecord } from '../../types';

export const CertificateDetailScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { certificate }: { certificate: CertificateRecord } = route.params;
  const { theme, typography, spacing, layout } = useTheme();

  const handleDownloadPDF = () => {
    Alert.alert('Download Certificate PDF', `Opening official signed PDF document for ${certificate.certificateNumber}...`);
  };

  return (
    <ScreenContainer>
      {/* 1. Official Certificate Header Card */}
      <Card
        variant="elevated"
        style={{
          marginTop: spacing.sm,
          backgroundColor: '#0D5C3A',
          borderColor: '#D97706',
          borderWidth: 1.5,
          padding: spacing.lg,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Award size={36} color="#FEF3C7" />
          <Text style={{ color: '#FEF3C7', fontSize: 10, fontWeight: '800', letterSpacing: 0.5, marginTop: 4 }}>
            NIGERIAN AUTOMOBILE TECHNICIANS ASSOCIATION
          </Text>
          <Text style={{ color: '#FFFFFF', fontSize: 8, fontWeight: '600', letterSpacing: 0.3 }}>
            LAGOS STATE COUNCIL • CERTIFICATION BOARD
          </Text>

          <Text
            style={{
              color: '#FFFFFF',
              fontSize: typography.sizes.md,
              fontWeight: typography.weights.bold,
              textAlign: 'center',
              marginTop: 12,
            }}
          >
            {certificate.title}
          </Text>

          <View style={{ flexDirection: 'row', gap: 6, marginTop: 8 }}>
            <Badge
              label={certificate.status}
              variant="success"
              size="sm"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              textStyle={{ color: '#FFFFFF' }}
            />
            <Badge
              label={certificate.certificateNumber}
              variant="neutral"
              size="sm"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              textStyle={{ color: '#FEF3C7' }}
            />
          </View>
        </View>

        <View style={[styles.certDetailsTable, { marginTop: spacing.md }]}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Awarded To:</Text>
            <Text style={styles.tableValue}>{certificate.issuedToName}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Membership No:</Text>
            <Text style={styles.tableValue}>{certificate.membershipNumber}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Trade Specialisation:</Text>
            <Text style={styles.tableValue}>{certificate.trade}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Issue Date:</Text>
            <Text style={styles.tableValue}>{certificate.issueDate}</Text>
          </View>
        </View>
      </Card>

      {/* 2. Maker-Checker Governed Approval Chain */}
      <View style={{ marginTop: spacing.lg }}>
        <Text
          style={{
            color: theme.textPrimary,
            fontSize: typography.sizes.base,
            fontWeight: typography.weights.bold,
            marginBottom: spacing.xs,
          }}
        >
          Governed Maker-Checker Approval Trail
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginBottom: spacing.sm }}>
          Multi-level executive sign-offs required for authoritative certificate issuance.
        </Text>

        <Card variant="outlined" style={{ backgroundColor: theme.card }}>
          {/* Step 1: Training Officer */}
          <View style={styles.approvalStep}>
            <CheckCircle2 size={18} color={theme.success} style={{ marginRight: spacing.sm }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.textPrimary, fontSize: 13, fontWeight: '700' }}>
                1. Training Directorate Verification
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
                Approved by: {certificate.trainingOfficerApprovedBy}
              </Text>
            </View>
          </View>

          {/* Step 2: Independent Assessor */}
          <View style={[styles.approvalStep, { borderTopColor: theme.border, borderTopWidth: 0.5 }]}>
            <CheckCircle2 size={18} color={theme.success} style={{ marginRight: spacing.sm }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.textPrimary, fontSize: 13, fontWeight: '700' }}>
                2. Independent Assessor Practical Exam
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
                Approved by: {certificate.assessorApprovedBy}
              </Text>
            </View>
          </View>

          {/* Step 3: State Certification Officer */}
          <View style={[styles.approvalStep, { borderTopColor: theme.border, borderTopWidth: 0.5 }]}>
            <CheckCircle2 size={18} color={theme.success} style={{ marginRight: spacing.sm }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.textPrimary, fontSize: 13, fontWeight: '700' }}>
                3. Certification Desk Compliance Review
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
                Approved by: {certificate.certificationOfficerApprovedBy}
              </Text>
            </View>
          </View>

          {/* Step 4: State Secretary */}
          <View style={[styles.approvalStep, { borderTopColor: theme.border, borderTopWidth: 0.5 }]}>
            <CheckCircle2 size={18} color={theme.success} style={{ marginRight: spacing.sm }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.textPrimary, fontSize: 13, fontWeight: '700' }}>
                4. State Secretary Registry Endorsement
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
                Approved by: {certificate.stateSecretaryApprovedBy}
              </Text>
            </View>
          </View>

          {/* Step 5: State Chairman */}
          <View style={[styles.approvalStep, { borderTopColor: theme.border, borderTopWidth: 0.5 }]}>
            <CheckCircle2 size={18} color={theme.success} style={{ marginRight: spacing.sm }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.textPrimary, fontSize: 13, fontWeight: '700' }}>
                5. State Chairman Executive Seal
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
                Signed by: {certificate.stateChairmanApprovedBy}
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {/* 3. Cryptographic Hash & Actions */}
      <View
        style={[
          styles.hashBox,
          {
            backgroundColor: theme.surfaceSubtle,
            borderColor: theme.border,
            borderRadius: layout.borderRadius.md,
            marginTop: spacing.md,
          },
        ]}
      >
        <Lock size={14} color={theme.textMuted} style={{ marginRight: 6 }} />
        <Text style={{ color: theme.textSecondary, fontSize: 10, flex: 1 }} numberOfLines={1}>
          Digital Verification Hash: {certificate.verificationHash}
        </Text>
      </View>

      <Button
        title="Download Official PDF Certificate"
        onPress={handleDownloadPDF}
        variant="primary"
        style={{ marginTop: spacing.lg, marginBottom: spacing.xxl }}
        icon={<FileText size={18} color="#FFFFFF" style={{ marginRight: 6 }} />}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  certDetailsTable: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  tableLabel: {
    color: '#CBD5E1',
    fontSize: 11,
  },
  tableValue: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  approvalStep: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  hashBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
  },
});
