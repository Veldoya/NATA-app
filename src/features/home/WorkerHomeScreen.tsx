// Worker Home Dashboard - "What needs my attention today?"

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {
  Wrench,
  FileText,
  GraduationCap,
  Award,
  CreditCard,
  AlertTriangle,
  ChevronRight,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
} from 'lucide-react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { WorkspaceHeader } from '../../components/layout/WorkspaceHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface WorkerHomeScreenProps {
  navigation: any;
}

export const WorkerHomeScreen: React.FC<WorkerHomeScreenProps> = ({ navigation }) => {
  const { user, isOfficerEligible } = useAuth();
  const { theme, typography, spacing, layout } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <ScreenContainer
      headerComponent={
        <WorkspaceHeader
          onPressNotifications={() => navigation.navigate('Notifications')}
          unreadNotificationsCount={2}
        />
      }
      refreshing={refreshing}
      onRefresh={onRefresh}
    >
      {/* 1. Membership Standing Banner */}
      <Card
        variant="elevated"
        style={{
          backgroundColor: theme.primary,
          borderColor: theme.primaryDark,
          marginTop: spacing.sm,
        }}
      >
        <View style={styles.membershipCardRow}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Badge
                label={user?.standing || 'ACTIVE'}
                variant="success"
                size="sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                textStyle={{ color: '#FFFFFF' }}
              />
              <Text style={[styles.membershipNumberText, { color: '#E2E8F0' }]}>
                {user?.membershipNumber}
              </Text>
            </View>

            <Text
              style={[
                styles.tierText,
                {
                  color: '#FFFFFF',
                  fontSize: typography.sizes.lg,
                  fontWeight: typography.weights.heavy,
                },
              ]}
            >
              {user?.tier.replace('_', ' ')}
            </Text>

            <Text style={[styles.tradeText, { color: '#CBD5E1', fontSize: typography.sizes.xs }]}>
              {user?.primaryTrade}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Profile', { screen: 'DigitalCard' })}
            style={styles.cardActionIcon}
          >
            <ShieldCheck size={36} color="#FFFFFF" />
            <Text style={styles.viewCardText}>View Card</Text>
          </TouchableOpacity>
        </View>

        {/* Organisation & Expiry Footer */}
        <View style={styles.membershipFooter}>
          <Text style={[styles.footerText, { color: '#E2E8F0' }]}>
            📍 {user?.organisation.name}
          </Text>
          <Text style={[styles.footerText, { color: '#FEF3C7', fontWeight: '600' }]}>
            Expires: Dec 2026
          </Text>
        </View>
      </Card>

      {/* 2. "What Needs My Attention Today?" Action Center */}
      <View style={{ marginTop: spacing.base }}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.textPrimary,
              fontSize: typography.sizes.md,
              fontWeight: typography.weights.bold,
              marginBottom: spacing.xs,
            },
          ]}
        >
          Needs Your Attention
        </Text>

        {/* Alert: Pending Estimate Approval */}
        <Card
          variant="outlined"
          style={{
            borderColor: theme.warning,
            backgroundColor: theme.warningBackground,
            paddingVertical: spacing.md,
          }}
          onPress={() => navigation.navigate('Work', { screen: 'JobDetail', params: { id: 'job_102' } })}
        >
          <View style={styles.actionCardInner}>
            <View style={[styles.alertIconCircle, { backgroundColor: theme.warning }]}>
              <Clock size={18} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1, marginLeft: spacing.sm }}>
              <Text
                style={[
                  styles.actionCardTitle,
                  { color: theme.textPrimary, fontWeight: typography.weights.bold },
                ]}
              >
                Estimate Awaiting Approval
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs }}>
                2018 Toyota Camry (V6 Engine Overhaul) — ₦385,000
              </Text>
            </View>
            <ChevronRight size={18} color={theme.textSecondary} />
          </View>
        </Card>

        {/* Alert: Workshop Accreditation Notice */}
        <Card
          variant="outlined"
          style={{
            borderColor: theme.border,
            backgroundColor: theme.card,
            paddingVertical: spacing.md,
          }}
          onPress={() => navigation.navigate('Workshop', { screen: 'Capabilities' })}
        >
          <View style={styles.actionCardInner}>
            <View style={[styles.alertIconCircle, { backgroundColor: theme.info }]}>
              <Sparkles size={18} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1, marginLeft: spacing.sm }}>
              <Text
                style={[
                  styles.actionCardTitle,
                  { color: theme.textPrimary, fontWeight: typography.weights.bold },
                ]}
              >
                2 Capabilities Under Review
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs }}>
                Hybrid High-Voltage Battery & Mercedes Benz ECU Coding
              </Text>
            </View>
            <ChevronRight size={18} color={theme.textSecondary} />
          </View>
        </Card>
      </View>

      {/* 3. Quick Action Operations Grid */}
      <View style={{ marginTop: spacing.lg }}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.textPrimary,
              fontSize: typography.sizes.md,
              fontWeight: typography.weights.bold,
              marginBottom: spacing.xs,
            },
          ]}
        >
          Daily Operations
        </Text>

        <View style={styles.gridRow}>
          {/* Work / Active Jobs */}
          <TouchableOpacity
            style={[
              styles.gridItem,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                borderRadius: layout.borderRadius.md,
              },
            ]}
            onPress={() => navigation.navigate('Work')}
          >
            <View style={[styles.gridIconCircle, { backgroundColor: theme.primaryLight }]}>
              <Wrench size={22} color={theme.primary} />
            </View>
            <Text style={[styles.gridItemTitle, { color: theme.textPrimary }]}>Active Jobs</Text>
            <Text style={[styles.gridItemSub, { color: theme.textSecondary }]}>3 In Progress</Text>
          </TouchableOpacity>

          {/* Workshop & Capabilities */}
          <TouchableOpacity
            style={[
              styles.gridItem,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                borderRadius: layout.borderRadius.md,
              },
            ]}
            onPress={() => navigation.navigate('Workshop')}
          >
            <View style={[styles.gridIconCircle, { backgroundColor: theme.accentLight }]}>
              <Award size={22} color={theme.accentDark} />
            </View>
            <Text style={[styles.gridItemTitle, { color: theme.textPrimary }]}>Workshop</Text>
            <Text style={[styles.gridItemSub, { color: theme.textSecondary }]}>Grade B Verified</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.gridRow, { marginTop: spacing.sm }]}>
          {/* Training Programmes */}
          <TouchableOpacity
            style={[
              styles.gridItem,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                borderRadius: layout.borderRadius.md,
              },
            ]}
            onPress={() => navigation.navigate('NATA', { screen: 'Training' })}
          >
            <View style={[styles.gridIconCircle, { backgroundColor: '#E0E7FF' }]}>
              <GraduationCap size={22} color="#4338CA" />
            </View>
            <Text style={[styles.gridItemTitle, { color: theme.textPrimary }]}>Training</Text>
            <Text style={[styles.gridItemSub, { color: theme.textSecondary }]}>1 Programme Active</Text>
          </TouchableOpacity>

          {/* Dues & Levies */}
          <TouchableOpacity
            style={[
              styles.gridItem,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                borderRadius: layout.borderRadius.md,
              },
            ]}
            onPress={() => navigation.navigate('NATA', { screen: 'Payments' })}
          >
            <View style={[styles.gridIconCircle, { backgroundColor: '#DCFCE7' }]}>
              <CreditCard size={22} color="#16A34A" />
            </View>
            <Text style={[styles.gridItemTitle, { color: theme.textPrimary }]}>Dues & Dues</Text>
            <Text style={[styles.gridItemSub, { color: theme.textSecondary }]}>Up to Date</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. Automotive Diagnostic Quick Launch */}
      <Card
        variant="elevated"
        style={{
          marginTop: spacing.lg,
          backgroundColor: theme.surfaceSubtle,
          borderColor: theme.border,
        }}
        onPress={() => navigation.navigate('NATA', { screen: 'Automotive' })}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: theme.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={22} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text
              style={{
                color: theme.textPrimary,
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.bold,
              }}
            >
              Automotive Tools & DTC Lookup
            </Text>
            <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs }}>
              Search OBD-II codes, diagnostic procedures & guarded AI reference
            </Text>
          </View>
          <ChevronRight size={20} color={theme.textMuted} />
        </View>
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  membershipCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  membershipNumberText: {
    fontSize: 11,
    marginLeft: 8,
    fontWeight: '600',
  },
  tierText: {
    marginTop: 2,
    letterSpacing: 0.5,
  },
  tradeText: {
    marginTop: 2,
  },
  cardActionIcon: {
    alignItems: 'center',
    padding: 6,
  },
  viewCardText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
  membershipFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  footerText: {
    fontSize: 11,
  },
  sectionTitle: {
    letterSpacing: 0.2,
  },
  actionCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCardTitle: {
    fontSize: 13,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  gridItem: {
    flex: 1,
    padding: 14,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  gridIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  gridItemTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  gridItemSub: {
    fontSize: 11,
    marginTop: 2,
  },
});
