// Governed Professional Progression Screen

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Award, CheckCircle2, CircleDot, Clock, ShieldAlert } from 'lucide-react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ProfessionalTier } from '../../types';

interface TierStep {
  tier: ProfessionalTier;
  title: string;
  minYears: number;
  requirements: string[];
}

const PROGRESSION_LADDER: TierStep[] = [
  {
    tier: 'APPRENTICE',
    title: 'Apprentice Member',
    minYears: 0,
    requirements: ['Enrolled in verified workshop', 'Basic safety induction passed'],
  },
  {
    tier: 'JOURNEYMAN',
    title: 'Journeyman Technician',
    minYears: 3,
    requirements: [
      'Trade assessment passed',
      'Minimum 3 years certified workshop practice',
      'Clean disciplinary record',
    ],
  },
  {
    tier: 'SENIOR_TECHNICIAN',
    title: 'Senior Technician',
    minYears: 7,
    requirements: [
      'Advanced diagnostics competency verified',
      'Mentorship of at least 2 apprentices',
      'Annual dues fully up to date',
    ],
  },
  {
    tier: 'MASTER_TECHNICIAN',
    title: 'Master Technician',
    minYears: 12,
    requirements: [
      'Master trade examination & portfolio approval',
      'Independent assessor review',
      'State Certification Committee endorsement',
      'Specialist technical publication or verified innovation',
    ],
  },
];

export const ProgressionScreen: React.FC = () => {
  const { user } = useAuth();
  const { theme, typography, spacing, layout } = useTheme();

  const currentTierIndex = PROGRESSION_LADDER.findIndex((t) => t.tier === user?.tier);

  return (
    <ScreenContainer>
      <View style={{ marginTop: spacing.md, marginBottom: spacing.base }}>
        <Text
          style={{
            color: theme.textPrimary,
            fontSize: typography.sizes.lg,
            fontWeight: typography.weights.bold,
          }}
        >
          Technician Career Progression
        </Text>
        <Text
          style={{
            color: theme.textSecondary,
            fontSize: typography.sizes.xs,
            marginTop: 2,
          }}
        >
          Governed standards established by the NATA Lagos State Council. Professional tier changes require authoritative assessment and State certification.
        </Text>
      </View>

      {/* Career Progression Pathway */}
      {PROGRESSION_LADDER.map((step, index) => {
        const isCompleted = index < currentTierIndex;
        const isCurrent = index === currentTierIndex;
        const isUpcoming = index > currentTierIndex;

        return (
          <Card
            key={step.tier}
            variant={isCurrent ? 'elevated' : 'outlined'}
            style={{
              borderColor: isCurrent ? theme.primary : isCompleted ? theme.success : theme.border,
              borderWidth: isCurrent ? 2 : 1,
              backgroundColor: isCurrent ? theme.primaryLight : theme.card,
              marginBottom: spacing.md,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={[
                  styles.stepIconCircle,
                  {
                    backgroundColor: isCompleted
                      ? theme.successBackground
                      : isCurrent
                      ? theme.primary
                      : theme.surfaceSubtle,
                  },
                ]}
              >
                {isCompleted ? (
                  <CheckCircle2 size={20} color={theme.success} />
                ) : isCurrent ? (
                  <Award size={20} color="#FFFFFF" />
                ) : (
                  <CircleDot size={20} color={theme.textMuted} />
                )}
              </View>

              <View style={{ flex: 1, marginLeft: spacing.sm }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text
                    style={{
                      color: theme.textPrimary,
                      fontSize: typography.sizes.base,
                      fontWeight: typography.weights.bold,
                    }}
                  >
                    {step.title}
                  </Text>
                  {isCurrent ? (
                    <Badge label="CURRENT TIER" variant="worker" size="sm" />
                  ) : isCompleted ? (
                    <Badge label="ACHIEVED" variant="success" size="sm" />
                  ) : (
                    <Badge label="UPCOMING" variant="neutral" size="sm" />
                  )}
                </View>
                <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
                  Minimum Experience: {step.minYears} Years
                </Text>
              </View>
            </View>

            {/* Requirements Checklist */}
            <View style={[styles.reqList, { borderTopColor: theme.border, marginTop: spacing.sm, paddingTop: spacing.xs }]}>
              {step.requirements.map((req, rIdx) => (
                <View key={rIdx} style={styles.reqRow}>
                  <Text style={{ color: isCompleted ? theme.success : theme.textSecondary, marginRight: 6 }}>
                    •
                  </Text>
                  <Text
                    style={{
                      color: isCompleted ? theme.textSecondary : theme.textPrimary,
                      fontSize: typography.sizes.xs,
                      flex: 1,
                    }}
                  >
                    {req}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        );
      })}

      {/* Governance Notice */}
      <View
        style={[
          styles.governanceNotice,
          {
            backgroundColor: theme.surfaceSubtle,
            borderColor: theme.border,
            borderRadius: layout.borderRadius.md,
            padding: spacing.md,
            marginTop: spacing.sm,
          },
        ]}
      >
        <ShieldAlert size={18} color={theme.primary} style={{ marginRight: spacing.sm }} />
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, flex: 1 }}>
          Upgrades are processed via the Training & Certification Desk after practical assessments and executive verification.
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  stepIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reqList: {
    borderTopWidth: 0.5,
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  governanceNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
});
