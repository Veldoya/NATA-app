// Job Detail Screen with Immutable Estimate Versions & Privacy Masking

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import {
  Car,
  User,
  Phone,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Shield,
  Layers,
} from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { JobRecord, EstimateVersion } from '../../types';

import { DEMO_JOBS } from './JobsListScreen';

export const JobDetailScreen: React.FC<{ route?: any; navigation?: any }> = ({
  route,
  navigation,
}) => {
  const initialJob = route?.params?.job || DEMO_JOBS[0];
  const [job, setJob] = useState<JobRecord>(initialJob);
  const { theme, typography, spacing, layout } = useTheme();
  const [activeEstimateTab, setActiveEstimateTab] = useState(
    job.estimates.length > 0 ? job.estimates[job.estimates.length - 1].version : 1
  );

  const activeEstimate =
    job.estimates.find((e) => e.version === activeEstimateTab) || job.estimates[0];

  const handleUpdateStatus = (newStatus: any, label: string) => {
    Alert.alert('Update Job Status', `Change job status to "${label}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Confirm',
        onPress: () => {
          setJob((prev) => ({ ...prev, status: newStatus }));
        },
      },
    ]);
  };

  return (
    <ScreenContainer>
      {/* 1. Vehicle & Reference Header */}
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
            REF: {job.jobReference}
          </Text>
          <Badge label={job.status.replace('_', ' ')} variant="info" size="sm" />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs }}>
          <Car size={22} color={theme.primary} style={{ marginRight: spacing.sm }} />
          <Text
            style={{
              color: theme.textPrimary,
              fontSize: typography.sizes.lg,
              fontWeight: typography.weights.bold,
            }}
          >
            {job.vehicleYear} {job.vehicleMake} {job.vehicleModel}
          </Text>
        </View>

        <View style={[styles.metaGrid, { borderTopColor: theme.border, marginTop: spacing.sm, paddingTop: spacing.xs }]}>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: theme.textSecondary }]}>Mileage</Text>
            <Text style={[styles.metaValue, { color: theme.textPrimary }]}>
              {job.mileage.toLocaleString()} km
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: theme.textSecondary }]}>Plate</Text>
            <Text style={[styles.metaValue, { color: theme.textPrimary }]}>{job.plateMasked}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: theme.textSecondary }]}>VIN</Text>
            <Text style={[styles.metaValue, { color: theme.textPrimary }]}>{job.vinMasked}</Text>
          </View>
        </View>
      </Card>

      {/* 2. Customer Privacy & Complaint Section */}
      <Card variant="outlined" style={{ marginTop: spacing.md }}>
        <Text
          style={{
            color: theme.textPrimary,
            fontSize: typography.sizes.sm,
            fontWeight: typography.weights.bold,
            marginBottom: spacing.xs,
          }}
        >
          Customer Complaint & Privacy
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <User size={14} color={theme.textMuted} style={{ marginRight: 6 }} />
          <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs }}>
            {job.customerNameMasked} • {job.customerPhoneMasked}
          </Text>
        </View>

        <View
          style={[
            styles.complaintBox,
            { backgroundColor: theme.surfaceSubtle, borderRadius: layout.borderRadius.sm },
          ]}
        >
          <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.sm, fontStyle: 'italic' }}>
            "{job.customerComplaint}"
          </Text>
        </View>

        {/* DTC Diagnostics */}
        {job.dtcCodes.length > 0 && (
          <View style={{ marginTop: spacing.sm }}>
            <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginBottom: 4 }}>
              Diagnostic Trouble Codes (DTC):
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {job.dtcCodes.map((code) => (
                <TouchableOpacity
                  key={code}
                  onPress={() => navigation.navigate('NATA', { screen: 'Automotive', params: { initialCode: code } })}
                >
                  <Badge label={code} variant="error" size="md" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </Card>

      {/* 3. Immutable Estimates Center */}
      <View style={{ marginTop: spacing.lg }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Layers size={18} color={theme.primary} style={{ marginRight: 6 }} />
            <Text
              style={{
                color: theme.textPrimary,
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.bold,
              }}
            >
              Estimates & Costing
            </Text>
          </View>

          <Button
            title="+ New Version"
            onPress={() => navigation.navigate('EstimateEditor', { jobId: job.id })}
            variant="outline"
            size="sm"
          />
        </View>

        {/* Estimate Version Selector Tabs */}
        {job.estimates.length > 1 && (
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: spacing.xs }}>
            {job.estimates.map((est) => (
              <TouchableOpacity
                key={est.version}
                onPress={() => setActiveEstimateTab(est.version)}
                style={[
                  styles.versionTab,
                  {
                    backgroundColor:
                      activeEstimateTab === est.version ? theme.primary : theme.surface,
                    borderColor:
                      activeEstimateTab === est.version ? theme.primary : theme.border,
                    borderRadius: layout.borderRadius.sm,
                  },
                ]}
              >
                <Text
                  style={{
                    color: activeEstimateTab === est.version ? '#FFFFFF' : theme.textSecondary,
                    fontSize: typography.sizes.xs,
                    fontWeight: '700',
                  }}
                >
                  Version {est.version} {est.status === 'APPROVED' ? '✓' : ''}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Selected Estimate Breakdown Table */}
        {activeEstimate && (
          <Card variant="elevated" style={{ backgroundColor: theme.card }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
              <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs }}>
                Created: {new Date(activeEstimate.createdAt).toLocaleDateString()}
              </Text>
              <Badge
                label={activeEstimate.status}
                variant={activeEstimate.status === 'APPROVED' ? 'success' : 'warning'}
                size="sm"
              />
            </View>

            {/* Line Items */}
            <View style={{ marginTop: spacing.xs }}>
              {activeEstimate.items.map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.lineItemRow,
                    { borderBottomColor: theme.border, borderBottomWidth: 0.5 },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.sm, fontWeight: '600' }}>
                      {item.description}
                    </Text>
                    <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs }}>
                      {item.type} • Qty: {item.quantity} × ₦{item.unitPrice.toLocaleString()}
                    </Text>
                  </View>
                  <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.sm, fontWeight: '700' }}>
                    ₦{item.totalPrice.toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>

            {/* Estimate Totals */}
            <View style={[styles.estimateTotalBox, { borderTopColor: theme.border, marginTop: spacing.sm }]}>
              <View style={styles.totalRow}>
                <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs }}>Subtotal</Text>
                <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.xs, fontWeight: '600' }}>
                  ₦{activeEstimate.subtotal.toLocaleString()}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs }}>Deposit Required</Text>
                <Text style={{ color: theme.accentDark, fontSize: typography.sizes.xs, fontWeight: '700' }}>
                  ₦{activeEstimate.depositRequired.toLocaleString()}
                </Text>
              </View>
              <View style={[styles.totalRow, { marginTop: 4, paddingTop: 4, borderTopWidth: 1, borderTopColor: theme.border }]}>
                <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.base, fontWeight: '800' }}>
                  Grand Total
                </Text>
                <Text style={{ color: theme.primary, fontSize: typography.sizes.base, fontWeight: '800' }}>
                  ₦{activeEstimate.grandTotal.toLocaleString()}
                </Text>
              </View>
            </View>
          </Card>
        )}
      </View>

      {/* 4. Action Buttons based on lifecycle */}
      <View style={{ marginTop: spacing.xl, marginBottom: spacing.xxl }}>
        {job.status === 'IN_PROGRESS' ? (
          <Button
            title="Mark Ready for Pickup"
            onPress={() => handleUpdateStatus('READY_FOR_PICKUP', 'Ready for Pickup')}
            variant="primary"
          />
        ) : job.status === 'READY_FOR_PICKUP' ? (
          <Button
            title="Mark Completed & Generate History"
            onPress={() => handleUpdateStatus('COMPLETED', 'Completed')}
            variant="primary"
          />
        ) : job.status === 'AWAITING_APPROVAL' ? (
          <Button
            title="Simulate Customer Approval"
            onPress={() => handleUpdateStatus('IN_PROGRESS', 'Estimate Approved & In Progress')}
            variant="gold"
          />
        ) : null}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
  },
  metaItem: {
    alignItems: 'flex-start',
  },
  metaLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 1,
  },
  complaintBox: {
    padding: 10,
    marginTop: 4,
  },
  versionTab: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  lineItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  estimateTotalBox: {
    paddingTop: 8,
    borderTopWidth: 0.5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
});
