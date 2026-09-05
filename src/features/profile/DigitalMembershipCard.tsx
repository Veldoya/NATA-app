// Digital Membership Record (Non-QR Official Presentation)

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ShieldCheck, Award, MapPin, Building2, Calendar } from 'lucide-react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const DigitalMembershipCard: React.FC = () => {
  const { user } = useAuth();
  const { theme, typography, spacing, layout } = useTheme();

  return (
    <ScreenContainer>
      <View style={{ alignItems: 'center', marginTop: spacing.md, marginBottom: spacing.lg }}>
        <Text
          style={{
            color: theme.textPrimary,
            fontSize: typography.sizes.lg,
            fontWeight: typography.weights.bold,
            textAlign: 'center',
          }}
        >
          Digital Membership Record
        </Text>
        <Text
          style={{
            color: theme.textSecondary,
            fontSize: typography.sizes.xs,
            textAlign: 'center',
            marginTop: 4,
          }}
        >
          Official Professional Credential • NATA Lagos State Council
        </Text>
      </View>

      {/* Official Guild Identification Card */}
      <View
        style={[
          styles.cardContainer,
          {
            backgroundColor: '#0D5C3A',
            borderRadius: layout.borderRadius.xl,
            ...layout.shadows.lg,
          },
        ]}
      >
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.guildName}>NIGERIAN AUTOMOBILE TECHNICIANS ASSOCIATION</Text>
            <Text style={styles.councilName}>LAGOS STATE COUNCIL • PROFESSIONAL REGISTRY</Text>
          </View>
          <ShieldCheck size={28} color="#FEF3C7" />
        </View>

        {/* Card Body */}
        <View style={styles.cardBody}>
          {/* Avatar Placeholder */}
          <View style={styles.avatarBox}>
            <Text style={styles.avatarInitials}>
              {user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : 'NA'}
            </Text>
          </View>

          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={styles.nameText}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.tierBadgeText}>{user?.tier.replace('_', ' ')}</Text>
            <Text style={styles.memberNoText}>ID: {user?.membershipNumber}</Text>
          </View>
        </View>

        {/* Card Details Table */}
        <View style={styles.cardTable}>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Primary Trade</Text>
            <Text style={styles.tableValue}>{user?.primaryTrade}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Affiliated Workshop</Text>
            <Text style={styles.tableValue}>{user?.workshopName || 'Independent'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Assigned Scope</Text>
            <Text style={styles.tableValue}>{user?.organisation.name}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Standing</Text>
            <Text style={[styles.tableValue, { color: '#86EFAC', fontWeight: '700' }]}>
              {user?.standing}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableLabel}>Valid Until</Text>
            <Text style={styles.tableValue}>31 Dec 2026</Text>
          </View>
        </View>

        {/* Card Security Watermark / Seal */}
        <View style={styles.cardFooter}>
          <Text style={styles.securityNotice}>
            🔒 Authoritative server record verified. This digital record confirms active membership standing in Lagos State.
          </Text>
        </View>
      </View>

      {/* Verified Secondary Trades */}
      <View style={{ marginTop: spacing.xl }}>
        <Text
          style={{
            color: theme.textPrimary,
            fontSize: typography.sizes.base,
            fontWeight: typography.weights.bold,
            marginBottom: spacing.sm,
          }}
        >
          Specialisations & Endorsements
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {user?.secondaryTrades?.map((trade, idx) => (
            <Badge key={idx} label={trade} variant="neutral" size="md" />
          ))}
          <Badge label={`${user?.yearsExperience} Years Experience`} variant="info" size="md" />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#D97706',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    paddingBottom: 12,
  },
  guildName: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  councilName: {
    color: '#FEF3C7',
    fontSize: 8,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.3,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  avatarBox: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#083E26',
    borderWidth: 2,
    borderColor: '#D97706',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  tierBadgeText: {
    color: '#FEF3C7',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  memberNoText: {
    color: '#CBD5E1',
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  },
  cardTable: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  tableLabel: {
    color: '#CBD5E1',
    fontSize: 11,
  },
  tableValue: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
  },
  cardFooter: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  securityNotice: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 9,
    textAlign: 'center',
    lineHeight: 12,
  },
});
