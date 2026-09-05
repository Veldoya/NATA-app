// Reusable Button Component with Variants, Haptics & Loading States

import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../theme/ThemeContext';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'gold';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const { theme, typography, spacing, layout } = useTheme();

  const handlePress = () => {
    if (disabled || loading) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // ignore on unsupporting platforms
    }
    onPress();
  };

  const getBackgroundColor = (): string => {
    if (disabled) return theme.surfaceSubtle;
    switch (variant) {
      case 'primary':
        return theme.primary;
      case 'secondary':
        return theme.primaryLight;
      case 'outline':
      case 'ghost':
        return 'transparent';
      case 'danger':
        return theme.error;
      case 'gold':
        return theme.accent;
      default:
        return theme.primary;
    }
  };

  const getTextColor = (): string => {
    if (disabled) return theme.textMuted;
    switch (variant) {
      case 'primary':
      case 'danger':
      case 'gold':
        return '#FFFFFF';
      case 'secondary':
        return theme.primary;
      case 'outline':
        return theme.primary;
      case 'ghost':
        return theme.textPrimary;
      default:
        return '#FFFFFF';
    }
  };

  const getPadding = (): { paddingVertical: number; paddingHorizontal: number } => {
    switch (size) {
      case 'sm':
        return { paddingVertical: spacing.xs + 2, paddingHorizontal: spacing.md };
      case 'lg':
        return { paddingVertical: spacing.base, paddingHorizontal: spacing.xl };
      case 'md':
      default:
        return { paddingVertical: spacing.md, paddingHorizontal: spacing.lg };
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={handlePress}
      disabled={disabled || loading}
      style={[
        styles.base,
        {
          backgroundColor: getBackgroundColor(),
          borderRadius: layout.borderRadius.md,
          borderColor: variant === 'outline' ? (disabled ? theme.border : theme.primary) : 'transparent',
          borderWidth: variant === 'outline' ? 1.5 : 0,
          ...getPadding(),
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <>
          {icon ? <>{icon}</> : null}
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
                fontSize: size === 'sm' ? typography.sizes.sm : size === 'lg' ? typography.sizes.md : typography.sizes.base,
                fontWeight: typography.weights.semibold,
                marginLeft: icon ? spacing.xs : 0,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
  },
  text: {
    textAlign: 'center',
  },
});
