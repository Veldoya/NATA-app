// Reusable Card Component

import React from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: 'elevated' | 'outlined' | 'subtle' | 'accent';
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  variant = 'elevated',
}) => {
  const { theme, spacing, layout } = useTheme();

  const getContainerStyles = (): ViewStyle => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: theme.card,
          borderColor: theme.border,
          borderWidth: 1,
        };
      case 'subtle':
        return {
          backgroundColor: theme.surfaceSubtle,
        };
      case 'accent':
        return {
          backgroundColor: theme.primaryLight,
          borderColor: theme.primary,
          borderWidth: 1,
        };
      case 'elevated':
      default:
        return {
          backgroundColor: theme.card,
          ...layout.shadows.sm,
          borderColor: theme.border,
          borderWidth: 0.5,
        };
    }
  };

  const cardStyle = [
    styles.card,
    {
      borderRadius: layout.borderRadius.lg,
      padding: spacing.base,
      ...getContainerStyles(),
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={cardStyle}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    overflow: 'hidden',
  },
});
