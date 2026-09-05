// Jobs List Screen - Status Filtering & Job Queue

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  Wrench,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Plus,
  Car,
  ChevronRight,
} from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { JobRecord, JobStatus } from '../../types';

export const DEMO_JOBS: JobRecord[] = [
  {
    id: 'job_101',
    jobReference: 'JOB-2024-0089',
    status: 'IN_PROGRESS',
    customerNameMasked: 'Mr. O*** S***',
    customerPhoneMasked: '+234 803 *** 1234',
    vehicleMake: 'Mercedes-Benz',
    vehicleModel: 'E350 4MATIC',
    vehicleYear: 2016,
    vinMasked: 'WDDHF5EB***491',
    plateMasked: 'JJJ-***-AA',
    mileage: 114500,
    customerComplaint: 'Transmission hard shift from 2nd to 3rd gear with intermittent check engine light.',
    dtcCodes: ['P0700', 'P0730'],
    assignedTechnicianId: 'usr_01',
    assignedTechnicianName: 'Babatunde Adeleke',
    workshopId: 'ws_ikeja_01',
    workshopName: 'Adeleke Premium Auto Diagnostic Hub',
    estimates: [
      {
        version: 1,
        createdAt: '2024-09-02T10:30:00Z',
        createdBy: 'Babatunde Adeleke',
        items: [
          { id: '1', type: 'PARTS', description: 'OEM Transmission Valve Body Conductor Plate', quantity: 1, unitPrice: 165000, totalPrice: 165000 },
          { id: '2', type: 'PARTS', description: 'ATF 134 Synthetic Fluid (7L)', quantity: 7, unitPrice: 12000, totalPrice: 84000 },
          { id: '3', type: 'LABOUR', description: 'Valve Body Service & SCN Coding', quantity: 1, unitPrice: 75000, totalPrice: 75000 },
        ],
        subtotal: 324000,
        tax: 0,
        depositRequired: 200000,
        grandTotal: 324000,
        status: 'APPROVED',
        customerDecisionAt: '2024-09-02T14:15:00Z',
      },
    ],
    currentEstimateVersion: 1,
    depositPaid: 200000,
    isPaid: false,
    createdAt: '2024-09-02T09:00:00Z',
    updatedAt: '2024-09-04T16:00:00Z',
    photos: [],
  },
  {
    id: 'job_102',
    jobReference: 'JOB-2024-0092',
    status: 'AWAITING_APPROVAL',
    customerNameMasked: 'Chief A*** B***',
    customerPhoneMasked: '+234 802 *** 8899',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry 3.5L V6',
    vehicleYear: 2018,
    vinMasked: '4T1BK1EB***772',
    plateMasked: 'KJA-***-XY',
    mileage: 89200,
    customerComplaint: 'Severe engine vibration on acceleration and rough idling in traffic.',
    dtcCodes: ['P0300', 'P0301', 'P0171'],
    assignedTechnicianId: 'usr_01',
    assignedTechnicianName: 'Babatunde Adeleke',
    workshopId: 'ws_ikeja_01',
    workshopName: 'Adeleke Premium Auto Diagnostic Hub',
    estimates: [
      {
        version: 1,
        createdAt: '2024-09-03T11:00:00Z',
        createdBy: 'Babatunde Adeleke',
        items: [
          { id: '1', type: 'PARTS', description: 'Denso Iridium Spark Plugs (Set of 6)', quantity: 6, unitPrice: 12500, totalPrice: 75000 },
          { id: '2', type: 'PARTS', description: 'OEM Ignition Coil Pack #1', quantity: 1, unitPrice: 42000, totalPrice: 42000 },
          { id: '3', type: 'PARTS', description: 'Intake Manifold Gasket Set', quantity: 1, unitPrice: 28000, totalPrice: 28000 },
          { id: '4', type: 'LABOUR', description: 'Intake Manifold Removal & Diagnostic Overhaul', quantity: 1, unitPrice: 45000, totalPrice: 45000 },
        ],
        subtotal: 190000,
        tax: 0,
        depositRequired: 100000,
        grandTotal: 190000,
        status: 'PRESENTED',
      },
    ],
    currentEstimateVersion: 1,
    depositPaid: 0,
    isPaid: false,
    createdAt: '2024-09-03T08:30:00Z',
    updatedAt: '2024-09-03T11:05:00Z',
    photos: [],
  },
  {
    id: 'job_103',
    jobReference: 'JOB-2024-0085',
    status: 'READY_FOR_PICKUP',
    customerNameMasked: 'Alhaji T*** K***',
    customerPhoneMasked: '+234 818 *** 4455',
    vehicleMake: 'Lexus',
    vehicleModel: 'RX 350 AWD',
    vehicleYear: 2017,
    vinMasked: '2T2BZMCA***610',
    plateMasked: 'APP-***-BD',
    mileage: 142000,
    customerComplaint: 'Air conditioning blowing warm air in hot afternoon traffic.',
    dtcCodes: ['B1421'],
    assignedTechnicianId: 'usr_01',
    assignedTechnicianName: 'Babatunde Adeleke',
    workshopId: 'ws_ikeja_01',
    workshopName: 'Adeleke Premium Auto Diagnostic Hub',
    estimates: [
      {
        version: 1,
        createdAt: '2024-08-30T10:00:00Z',
        createdBy: 'Babatunde Adeleke',
        items: [
          { id: '1', type: 'PARTS', description: 'Denso AC Compressor & Clutch Assembly', quantity: 1, unitPrice: 220000, totalPrice: 220000 },
          { id: '2', type: 'PARTS', description: 'R134a Refrigerant & PAG Oil Recharge', quantity: 1, unitPrice: 35000, totalPrice: 35000 },
          { id: '3', type: 'LABOUR', description: 'System Vacuum, Flush & Installation', quantity: 1, unitPrice: 50000, totalPrice: 50000 },
        ],
        subtotal: 305000,
        tax: 0,
        depositRequired: 200000,
        grandTotal: 305000,
        status: 'APPROVED',
        customerDecisionAt: '2024-08-30T13:00:00Z',
      },
    ],
    currentEstimateVersion: 1,
    depositPaid: 305000,
    isPaid: true,
    createdAt: '2024-08-30T09:00:00Z',
    updatedAt: '2024-09-04T17:00:00Z',
    photos: [],
  },
];

const STATUS_FILTERS: { key: string; label: string; status?: JobStatus }[] = [
  { key: 'ALL', label: 'All Jobs' },
  { key: 'IN_PROGRESS', label: 'In Progress', status: 'IN_PROGRESS' },
  { key: 'AWAITING_APPROVAL', label: 'Estimate Pending', status: 'AWAITING_APPROVAL' },
  { key: 'READY_FOR_PICKUP', label: 'Ready', status: 'READY_FOR_PICKUP' },
];

export const JobsListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme, typography, spacing, layout } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = DEMO_JOBS.filter((job) => {
    const matchesFilter =
      selectedFilter === 'ALL' || job.status === selectedFilter;
    const matchesSearch =
      job.vehicleMake.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobReference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'IN_PROGRESS':
        return <Badge label="IN PROGRESS" variant="info" size="sm" />;
      case 'AWAITING_APPROVAL':
        return <Badge label="ESTIMATE PENDING" variant="warning" size="sm" />;
      case 'READY_FOR_PICKUP':
        return <Badge label="READY FOR PICKUP" variant="success" size="sm" />;
      case 'COMPLETED':
        return <Badge label="COMPLETED" variant="neutral" size="sm" />;
      default:
        return <Badge label={status.replace('_', ' ')} variant="neutral" size="sm" />;
    }
  };

  return (
    <ScreenContainer scrollable={false}>
      {/* Header & Search */}
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xs }}>
          <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
            Workshop Jobs
          </Text>
          <TouchableOpacity
            style={{ padding: spacing.xs }}
            onPress={() => navigation.navigate('ServiceHistory')}
          >
            <Text style={{ color: theme.primary, fontSize: typography.sizes.xs, fontWeight: '700' }}>
              Service History →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              borderRadius: layout.borderRadius.md,
              paddingHorizontal: spacing.md,
            },
          ]}
        >
          <Search size={18} color={theme.textMuted} style={{ marginRight: spacing.sm }} />
          <TextInput
            placeholder="Search vehicle, reference, complaint..."
            placeholderTextColor={theme.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: theme.textPrimary, fontSize: typography.sizes.sm }]}
          />
        </View>

        {/* Filter Pills */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={STATUS_FILTERS}
          keyExtractor={(item) => item.key}
          style={{ marginTop: spacing.sm }}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => {
            const isSelected = selectedFilter === item.key;
            return (
              <TouchableOpacity
                onPress={() => setSelectedFilter(item.key)}
                style={[
                  styles.filterPill,
                  {
                    backgroundColor: isSelected ? theme.primary : theme.surface,
                    borderColor: isSelected ? theme.primary : theme.border,
                    borderRadius: layout.borderRadius.full,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    {
                      color: isSelected ? '#FFFFFF' : theme.textSecondary,
                      fontSize: typography.sizes.xs,
                      fontWeight: isSelected ? '700' : '500',
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Jobs FlatList */}
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        renderItem={({ item }) => (
          <Card
            variant="elevated"
            style={{ marginBottom: spacing.md }}
            onPress={() => navigation.navigate('JobDetail', { job: item })}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, fontWeight: '600' }}>
                {item.jobReference}
              </Text>
              {getStatusBadge(item.status)}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs }}>
              <Car size={18} color={theme.primary} style={{ marginRight: spacing.xs }} />
              <Text
                style={{
                  color: theme.textPrimary,
                  fontSize: typography.sizes.base,
                  fontWeight: typography.weights.bold,
                }}
              >
                {item.vehicleYear} {item.vehicleMake} {item.vehicleModel}
              </Text>
            </View>

            <Text
              style={{
                color: theme.textSecondary,
                fontSize: typography.sizes.xs,
                marginTop: 4,
              }}
              numberOfLines={2}
            >
              Complaint: {item.customerComplaint}
            </Text>

            {/* DTC Badges if any */}
            {item.dtcCodes.length > 0 && (
              <View style={{ flexDirection: 'row', gap: 6, marginTop: spacing.xs }}>
                {item.dtcCodes.map((code) => (
                  <Badge key={code} label={code} variant="error" size="sm" />
                ))}
              </View>
            )}

            <View
              style={[
                styles.jobCardFooter,
                { borderTopColor: theme.border, marginTop: spacing.sm, paddingTop: spacing.xs },
              ]}
            >
              <Text style={{ color: theme.textMuted, fontSize: 11 }}>
                Customer: {item.customerNameMasked}
              </Text>
              <Text style={{ color: theme.textPrimary, fontSize: 12, fontWeight: '700' }}>
                ₦{item.estimates[0]?.grandTotal.toLocaleString()}
              </Text>
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
  filterText: {
    letterSpacing: 0.2,
  },
  jobCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
});
