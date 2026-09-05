// Meaningful Empty State View

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionTitle?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionTitle,
  onActionPress,
  style,
}) => {
  const { theme, typography, spacing, layout } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          padding: spacing.xl,
          backgroundColor: theme.surface,
          borderRadius: layout.borderRadius.lg,
          borderColor: theme.border,
          borderWidth: 1,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: theme.primaryLight,
            marginBottom: spacing.base,
          },
        ]}
      >
        {icon || <Inbox size={32} color={theme.primary} />}
      </View>

      <Text
        style={[
          styles.title,
          {
            color: theme.textPrimary,
            fontSize: typography.sizes.md,
            fontWeight: typography.weights.bold,
            marginBottom: spacing.xs,
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.description,
          {
            color: theme.textSecondary,
            fontSize: typography.sizes.sm,
            marginBottom: actionTitle ? spacing.base : 0,
          },
        ]}
      >
        {description}
      </Text>

      {actionTitle && onActionPress ? (
        <Button
          title={actionTitle}
          onPress={onActionPress}
          variant="secondary"
          size="sm"
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    textAlign: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
});
