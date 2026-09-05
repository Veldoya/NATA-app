// Status Badge & Pill Component

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

export type BadgeVariant =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | 'officer'
  | 'worker';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  size = 'sm',
  icon,
  style,
  textStyle,
}) => {
  const { theme, typography, spacing, layout } = useTheme();

  const getColors = (): { bg: string; text: string } => {
    switch (variant) {
      case 'success':
        return { bg: theme.successBackground, text: theme.success };
      case 'warning':
        return { bg: theme.warningBackground, text: theme.warning };
      case 'error':
        return { bg: theme.errorBackground, text: theme.error };
      case 'info':
        return { bg: theme.infoBackground, text: theme.info };
      case 'officer':
        return { bg: theme.officerBadgeBg, text: theme.officerBadge };
      case 'worker':
        return { bg: theme.workerBadgeBg, text: theme.workerBadge };
      case 'neutral':
      default:
        return { bg: theme.surfaceSubtle, text: theme.textSecondary };
    }
  };

  const { bg, text } = getColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bg,
          borderRadius: layout.borderRadius.full,
          paddingVertical: size === 'sm' ? spacing.xxs : spacing.xs,
          paddingHorizontal: size === 'sm' ? spacing.sm : spacing.md,
        },
        style,
      ]}
    >
      {icon ? <View style={{ marginRight: spacing.xs }}>{icon}</View> : null}
      <Text
        style={[
          styles.text,
          {
            color: text,
            fontSize: size === 'sm' ? typography.sizes.xs : typography.sizes.sm,
            fontWeight: typography.weights.semibold,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
