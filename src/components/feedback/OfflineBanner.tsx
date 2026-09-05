// Offline Network Warning Banner

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WifiOff } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';

interface OfflineBannerProps {
  isOffline?: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOffline = false }) => {
  const { theme, typography, spacing } = useTheme();

  if (!isOffline) return null;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.warningBackground,
          borderColor: theme.warning,
          paddingVertical: spacing.xs + 2,
          paddingHorizontal: spacing.md,
        },
      ]}
    >
      <WifiOff size={16} color={theme.warning} style={{ marginRight: spacing.xs }} />
      <Text
        style={[
          styles.text,
          {
            color: theme.warning,
            fontSize: typography.sizes.xs,
            fontWeight: typography.weights.semibold,
          },
        ]}
      >
        Working in offline mode. Viewing cached records. Approvals & payments require online access.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  text: {
    flex: 1,
  },
});
