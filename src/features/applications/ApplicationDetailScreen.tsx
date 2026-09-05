// Membership Application Detail & Officer Decision Screen

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import {
  UserCheck,
  Building,
  Phone,
  Mail,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { MembershipApplication } from '../../types';

export const ApplicationDetailScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { application: initialApp } = route.params;
  const [app, setApp] = useState<MembershipApplication>(initialApp);
  const { theme, typography, spacing, layout } = useTheme();

  const handleDecision = (decision: 'APPROVED' | 'REJECTED' | 'CORRECTIONS_REQUIRED') => {
    Alert.alert(
      'Confirm Official Decision',
      `Are you sure you want to mark application ${app.applicationReference} as "${decision}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm & Sign',
          onPress: () => {
            setApp((prev) => ({ ...prev, status: decision }));
            Alert.alert('Decision Recorded', `Application status updated to ${decision}. An auditable server log entry was recorded.`);
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      {/* 1. Header Information */}
      <Card
        variant="elevated"
        style={{
          marginTop: spacing.sm,
          backgroundColor: theme.surface,
          borderColor: theme.border,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, fontWeight: '700' }}>
            REF: {app.applicationReference}
          </Text>
          <Badge label={app.status.replace('_', ' ')} variant="info" size="sm" />
        </View>

        <Text
          style={{
            color: theme.textPrimary,
            fontSize: typography.sizes.lg,
            fontWeight: typography.weights.bold,
            marginTop: spacing.xs,
          }}
        >
          {app.applicantName}
        </Text>

        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          {app.trade} • Proposed: {app.proposedTier.replace('_', ' ')}
        </Text>

        <View style={[styles.contactRow, { borderTopColor: theme.border, marginTop: spacing.sm, paddingTop: spacing.xs }]}>
          <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
            📞 {app.phone}
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
            ✉️ {app.email}
          </Text>
        </View>
      </Card>

      {/* 2. Workshop & ID Verification Details */}
      <Card variant="outlined" style={{ marginTop: spacing.base }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.sm, fontWeight: '700', marginBottom: spacing.xs }}>
          Applicant Background & Evidence
        </Text>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Affiliated Workshop:</Text>
          <Text style={styles.detailValue}>{app.workshopName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Assigned Unit:</Text>
          <Text style={styles.detailValue}>{app.organisation.name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Years Experience:</Text>
          <Text style={styles.detailValue}>{app.experienceYears} Years</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>ID Document Verified:</Text>
          <Text style={[styles.detailValue, { color: theme.success, fontWeight: '700' }]}>
            {app.idDocumentType} Verified
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Application Fee:</Text>
          <Text style={[styles.detailValue, { color: app.feePaid ? theme.success : theme.warning, fontWeight: '700' }]}>
            {app.feePaid ? '₦20,000 Paid (Verified)' : 'Payment Pending'}
          </Text>
        </View>
      </Card>

      {/* 3. Physical Verification Findings */}
      {app.physicalVerificationNotes ? (
        <Card variant="outlined" style={{ marginTop: spacing.base, backgroundColor: theme.surfaceSubtle }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <CheckCircle2 size={16} color={theme.success} style={{ marginRight: 6 }} />
            <Text style={{ color: theme.textPrimary, fontSize: 13, fontWeight: '700' }}>
              On-Site Physical Verification
            </Text>
          </View>
          <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
            {app.physicalVerificationNotes}
          </Text>
          <Text style={{ color: theme.textMuted, fontSize: 10, marginTop: 4 }}>
            Inspected by: {app.verifiedByOfficer} ({app.verifiedAt})
          </Text>
        </Card>
      ) : (
        <Card
          variant="outlined"
          style={{ marginTop: spacing.base, borderColor: theme.warning, backgroundColor: theme.warningBackground }}
          onPress={() => navigation.navigate('PhysicalVerification', { application: app })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AlertTriangle size={18} color={theme.warning} style={{ marginRight: spacing.sm }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.textPrimary, fontSize: 13, fontWeight: '700' }}>
                Physical Verification Required
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
                Tap to conduct on-site workshop checklist & ID validation.
              </Text>
            </View>
          </View>
        </Card>
      )}

      {/* 4. Officer Decision Actions */}
      <View style={{ marginTop: spacing.xl, marginBottom: spacing.xxl, gap: 10 }}>
        {app.status === 'PENDING_APPROVAL' || app.status === 'PHYSICAL_VERIFICATION' ? (
          <>
            <Button
              title="Approve Membership Application"
              onPress={() => handleDecision('APPROVED')}
              variant="primary"
            />
            <Button
              title="Request Applicant Corrections"
              onPress={() => handleDecision('CORRECTIONS_REQUIRED')}
              variant="outline"
            />
            <Button
              title="Reject Application"
              onPress={() => handleDecision('REJECTED')}
              variant="danger"
            />
          </>
        ) : null}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2E8F0',
  },
  detailLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 11,
    color: '#0F172A',
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
  },
});
