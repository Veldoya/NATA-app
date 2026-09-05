// Officer Workspace - Executive Dashboard & Operational Console

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {
  ShieldCheck,
  UserCheck,
  FileCheck2,
  Banknote,
  Network,
  History,
  Award,
  ChevronRight,
  AlertCircle,
  Users,
} from 'lucide-react-native';
import { useAuth } from '../../auth/AuthContext';
import { usePermissions } from '../../auth/usePermissions';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { WorkspaceHeader } from '../../components/layout/WorkspaceHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface OfficerDashboardScreenProps {
  navigation: any;
}

export const OfficerDashboardScreen: React.FC<OfficerDashboardScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const permissions = usePermissions(user);
  const { theme, typography, spacing, layout } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <ScreenContainer
      headerComponent={<WorkspaceHeader />}
      refreshing={refreshing}
      onRefresh={onRefresh}
    >
      {/* 1. Officer Scope & Authority Card */}
      <Card
        variant="elevated"
        style={{
          backgroundColor: '#312E81', // Indigo Deep for Officer Console
          borderColor: '#4338CA',
          marginTop: spacing.sm,
          padding: spacing.base,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Badge
            label="OFFICER WORKSPACE"
            variant="officer"
            size="sm"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            textStyle={{ color: '#FFFFFF' }}
          />
          <Text style={{ color: '#E0E7FF', fontSize: 11, fontWeight: '700' }}>
            SCOPE: {user?.organisation.level}
          </Text>
        </View>

        <Text
          style={{
            color: '#FFFFFF',
            fontSize: typography.sizes.lg,
            fontWeight: typography.weights.bold,
            marginTop: 6,
          }}
        >
          {user?.currentOffice || 'Authorized Executive Officer'}
        </Text>

        <Text style={{ color: '#C7D2FE', fontSize: typography.sizes.xs, marginTop: 2 }}>
          {user?.organisation.name} (Lagos State Council)
        </Text>

        <View style={[styles.kpiRow, { borderTopColor: 'rgba(255,255,255,0.2)', marginTop: spacing.md, paddingTop: spacing.xs }]}>
          <View style={styles.kpiItem}>
            <Text style={[styles.kpiNumber, { color: '#FFFFFF' }]}>12</Text>
            <Text style={[styles.kpiLabel, { color: '#E0E7FF' }]}>Pending Apps</Text>
          </View>
          <View style={styles.kpiItem}>
            <Text style={[styles.kpiNumber, { color: '#FEF3C7' }]}>4</Text>
            <Text style={[styles.kpiLabel, { color: '#E0E7FF' }]}>Verifications Due</Text>
          </View>
          <View style={styles.kpiItem}>
            <Text style={[styles.kpiNumber, { color: '#86EFAC' }]}>₦380k</Text>
            <Text style={[styles.kpiLabel, { color: '#E0E7FF' }]}>Cash Collected</Text>
          </View>
        </View>
      </Card>

      {/* 2. Operational Modules Grid (Role-Gated) */}
      <View style={{ marginTop: spacing.base }}>
        <Text
          style={{
            color: theme.textPrimary,
            fontSize: typography.sizes.base,
            fontWeight: typography.weights.bold,
            marginBottom: spacing.xs,
          }}
        >
          Officer Administrative Modules
        </Text>

        <View style={styles.gridRow}>
          {/* Membership Applications Review */}
          <TouchableOpacity
            style={[
              styles.gridCard,
              { backgroundColor: theme.card, borderColor: theme.border, borderRadius: layout.borderRadius.md },
            ]}
            onPress={() => navigation.navigate('Applications')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#EEF2FF' }]}>
              <UserCheck size={20} color="#4338CA" />
            </View>
            <Text style={[styles.gridTitle, { color: theme.textPrimary }]}>
              Membership Applications
            </Text>
            <Text style={{ color: theme.textSecondary, fontSize: 11, marginTop: 2 }}>
              12 in Review Queue
            </Text>
          </TouchableOpacity>

          {/* Physical Verification Field Tool */}
          <TouchableOpacity
            style={[
              styles.gridCard,
              { backgroundColor: theme.card, borderColor: theme.border, borderRadius: layout.borderRadius.md },
            ]}
            onPress={() => navigation.navigate('PhysicalVerification')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#FEF3C7' }]}>
              <FileCheck2 size={20} color="#D97706" />
            </View>
            <Text style={[styles.gridTitle, { color: theme.textPrimary }]}>
              Physical Field Verification
            </Text>
            <Text style={{ color: theme.textSecondary, fontSize: 11, marginTop: 2 }}>
              Unit & Village Checklist
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.gridRow, { marginTop: spacing.sm }]}>
          {/* Manual Cash Collection (Financial Secretary / Treasurer) */}
          <TouchableOpacity
            style={[
              styles.gridCard,
              { backgroundColor: theme.card, borderColor: theme.border, borderRadius: layout.borderRadius.md },
            ]}
            onPress={() => navigation.navigate('CashCollection')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
              <Banknote size={20} color="#16A34A" />
            </View>
            <Text style={[styles.gridTitle, { color: theme.textPrimary }]}>
              Record Cash Collection
            </Text>
            <Text style={{ color: theme.textSecondary, fontSize: 11, marginTop: 2 }}>
              Treasurer & Fin Sec Entry
            </Text>
          </TouchableOpacity>

          {/* Executive Tenures Governance */}
          <TouchableOpacity
            style={[
              styles.gridCard,
              { backgroundColor: theme.card, borderColor: theme.border, borderRadius: layout.borderRadius.md },
            ]}
            onPress={() => navigation.navigate('ExecutiveTenures')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#F3E8FF' }]}>
              <History size={20} color="#9333EA" />
            </View>
            <Text style={[styles.gridTitle, { color: theme.textPrimary }]}>
              Executive Tenures
            </Text>
            <Text style={{ color: theme.textSecondary, fontSize: 11, marginTop: 2 }}>
              Term Limits & Transitions
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.gridRow, { marginTop: spacing.sm }]}>
          {/* Organisation Hierarchy */}
          <TouchableOpacity
            style={[
              styles.gridCard,
              { backgroundColor: theme.card, borderColor: theme.border, borderRadius: layout.borderRadius.md },
            ]}
            onPress={() => navigation.navigate('OrgHierarchy')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
              <Network size={20} color="#0284C7" />
            </View>
            <Text style={[styles.gridTitle, { color: theme.textPrimary }]}>
              Council Hierarchy
            </Text>
            <Text style={{ color: theme.textSecondary, fontSize: 11, marginTop: 2 }}>
              State → LGA → Unit
            </Text>
          </TouchableOpacity>

          {/* Certificate Desk Maker-Checker Queue */}
          <TouchableOpacity
            style={[
              styles.gridCard,
              { backgroundColor: theme.card, borderColor: theme.border, borderRadius: layout.borderRadius.md },
            ]}
            onPress={() => navigation.navigate('CertificateDesk')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#FEE2E2' }]}>
              <Award size={20} color="#DC2626" />
            </View>
            <Text style={[styles.gridTitle, { color: theme.textPrimary }]}>
              Certificate Desk
            </Text>
            <Text style={{ color: theme.textSecondary, fontSize: 11, marginTop: 2 }}>
              Maker-Checker Approvals
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
  },
  kpiItem: {
    alignItems: 'center',
  },
  kpiNumber: {
    fontSize: 18,
    fontWeight: '800',
  },
  kpiLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  gridCard: {
    flex: 1,
    padding: 14,
    borderWidth: 1,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  gridTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
});
