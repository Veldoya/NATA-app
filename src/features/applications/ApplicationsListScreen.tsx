// Membership Applications Review Queue (Officer Workspace)

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Search, UserCheck, Clock, CheckCircle2, AlertTriangle, ChevronRight, User } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { MembershipApplication, ApplicationStatus } from '../../types';

export const DEMO_APPLICATIONS: MembershipApplication[] = [
  {
    id: 'app_1',
    applicationReference: 'APP-2024-0419',
    applicantName: 'Rasheed Babalola',
    phone: '+234 803 112 3344',
    email: 'rasheed.auto@gmail.com',
    trade: 'Auto Electrical & Electronic Systems',
    proposedTier: 'JOURNEYMAN',
    workshopName: 'Babalola Precision Auto Works',
    organisation: {
      id: 'org_unit_04',
      name: 'Ikeja Central Mechanic Village Unit 2',
      level: 'UNIT',
      code: 'IKJ-U02',
    },
    status: 'PHYSICAL_VERIFICATION',
    submittedAt: '2024-09-01',
    idDocumentType: 'NIN',
    experienceYears: 6,
    specialisations: ['Starter Motor & Alternator', 'Wiring Harness Repair'],
    feePaid: true,
    timeline: [
      { status: 'SUBMITTED', timestamp: '2024-09-01 09:15', actor: 'Applicant' },
      { status: 'PAYMENT_PENDING', timestamp: '2024-09-01 09:30', actor: 'System' },
      { status: 'PHYSICAL_VERIFICATION', timestamp: '2024-09-02 11:00', actor: 'Membership Officer' },
    ],
  },
  {
    id: 'app_2',
    applicationReference: 'APP-2024-0422',
    applicantName: 'Kazeem Oladipo',
    phone: '+234 812 556 7788',
    email: 'kazeem.mec@gmail.com',
    trade: 'Mechanical & Engine Overhaul',
    proposedTier: 'SENIOR_TECHNICIAN',
    workshopName: 'Kazeem Motor Engineering',
    organisation: {
      id: 'org_unit_04',
      name: 'Ikeja Central Mechanic Village Unit 2',
      level: 'UNIT',
      code: 'IKJ-U02',
    },
    status: 'SUBMITTED',
    submittedAt: '2024-09-03',
    idDocumentType: 'DRIVERS_LICENSE',
    experienceYears: 11,
    specialisations: ['Cylinder Head Grinding', 'Diesel Injection Timing'],
    feePaid: false,
    timeline: [
      { status: 'SUBMITTED', timestamp: '2024-09-03 14:00', actor: 'Applicant' },
    ],
  },
  {
    id: 'app_3',
    applicationReference: 'APP-2024-0390',
    applicantName: 'Chibuike Nnamdi',
    phone: '+234 809 332 1100',
    email: 'chibuike.gear@gmail.com',
    trade: 'Transmission & Gearbox Specialist',
    proposedTier: 'MASTER_TECHNICIAN',
    workshopName: 'Ultimate Gearbox Technologies',
    organisation: {
      id: 'org_unit_04',
      name: 'Ikeja Central Mechanic Village Unit 2',
      level: 'UNIT',
      code: 'IKJ-U02',
    },
    status: 'PENDING_APPROVAL',
    submittedAt: '2024-08-25',
    idDocumentType: 'VOTERS_CARD',
    experienceYears: 16,
    specialisations: ['Automatic Transmission Rebuild', 'Torque Converter Servicing'],
    physicalVerificationNotes: 'Workshop visited on 28 Aug 2024. All lifting and diagnostic tools verified on-site.',
    verifiedByOfficer: 'Inspector F. Adeleke',
    verifiedAt: '2024-08-28',
    feePaid: true,
    timeline: [
      { status: 'SUBMITTED', timestamp: '2024-08-25', actor: 'Applicant' },
      { status: 'PHYSICAL_VERIFICATION', timestamp: '2024-08-26', actor: 'System' },
      { status: 'PENDING_APPROVAL', timestamp: '2024-08-28', actor: 'Inspector F. Adeleke' },
    ],
  },
];

const APPLICATION_STATUS_TABS: { key: string; label: string; status?: ApplicationStatus }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'PHYSICAL_VERIFICATION', label: 'Physical Verification', status: 'PHYSICAL_VERIFICATION' },
  { key: 'PENDING_APPROVAL', label: 'Pending Approval', status: 'PENDING_APPROVAL' },
  { key: 'SUBMITTED', label: 'Submitted', status: 'SUBMITTED' },
];

export const ApplicationsListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme, typography, spacing, layout } = useTheme();
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = DEMO_APPLICATIONS.filter((app) => {
    const matchesTab = activeTab === 'ALL' || app.status === activeTab;
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicationReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.trade.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'PHYSICAL_VERIFICATION':
        return <Badge label="VERIFICATION DUE" variant="warning" size="sm" />;
      case 'PENDING_APPROVAL':
        return <Badge label="PENDING APPROVAL" variant="info" size="sm" />;
      case 'APPROVED':
        return <Badge label="APPROVED" variant="success" size="sm" />;
      case 'CORRECTIONS_REQUIRED':
        return <Badge label="NEEDS CORRECTION" variant="error" size="sm" />;
      default:
        return <Badge label={status.replace('_', ' ')} variant="neutral" size="sm" />;
    }
  };

  return (
    <ScreenContainer scrollable={false}>
      {/* Header & Search */}
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.sm }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
          Membership Applications Review
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          Applications submitted within your assigned LGA & Unit jurisdiction.
        </Text>

        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              borderRadius: layout.borderRadius.md,
              marginTop: spacing.sm,
            },
          ]}
        >
          <Search size={18} color={theme.textMuted} style={{ marginRight: spacing.sm }} />
          <TextInput
            placeholder="Search applicant name, reference, trade..."
            placeholderTextColor={theme.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: theme.textPrimary, fontSize: typography.sizes.sm }]}
          />
        </View>

        {/* Tab Filters */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={APPLICATION_STATUS_TABS}
          keyExtractor={(item) => item.key}
          style={{ marginTop: spacing.sm }}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => {
            const isSelected = activeTab === item.key;
            return (
              <TouchableOpacity
                onPress={() => setActiveTab(item.key)}
                style={[
                  styles.filterPill,
                  {
                    backgroundColor: isSelected ? '#4338CA' : theme.surface,
                    borderColor: isSelected ? '#4338CA' : theme.border,
                    borderRadius: layout.borderRadius.full,
                  },
                ]}
              >
                <Text
                  style={{
                    color: isSelected ? '#FFFFFF' : theme.textSecondary,
                    fontSize: typography.sizes.xs,
                    fontWeight: isSelected ? '700' : '500',
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Applications List */}
      <FlatList
        data={filteredApps}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <Card
            variant="elevated"
            style={{ marginBottom: spacing.md }}
            onPress={() => navigation.navigate('ApplicationDetail', { application: item })}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, fontWeight: '700' }}>
                {item.applicationReference}
              </Text>
              {getStatusBadge(item.status)}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs }}>
              <User size={18} color="#4338CA" style={{ marginRight: spacing.xs }} />
              <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.base, fontWeight: typography.weights.bold }}>
                {item.applicantName}
              </Text>
            </View>

            <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
              {item.trade} • {item.proposedTier.replace('_', ' ')}
            </Text>

            <Text style={{ color: theme.textMuted, fontSize: 11, marginTop: 2 }}>
              Workshop: {item.workshopName}
            </Text>

            <View style={[styles.cardFooter, { borderTopColor: theme.border, marginTop: spacing.sm, paddingTop: spacing.xs }]}>
              <Text style={{ color: item.feePaid ? theme.success : theme.warning, fontSize: 11, fontWeight: '700' }}>
                {item.feePaid ? '✓ Registration Fee Paid' : '⏳ Fee Pending'}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#4338CA', fontSize: 11, fontWeight: '700', marginRight: 2 }}>
                  Review Application
                </Text>
                <ChevronRight size={14} color="#4338CA" />
              </View>
            </View>
          </Card>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: 42,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 4,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
});
