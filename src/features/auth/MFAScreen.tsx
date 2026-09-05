// Officer Multi-Factor Authentication (MFA / TOTP) Screen

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ShieldCheck, Lock } from 'lucide-react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const MFAScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { tempToken } = route.params || {};
  const { verifyMfa } = useAuth();
  const { theme, typography, spacing, layout } = useTheme();

  const [totpCode, setTotpCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!totpCode.trim() || totpCode.length < 6) {
      Alert.alert('Required', 'Please enter your 6-digit authenticator or recovery code.');
      return;
    }

    setLoading(true);
    try {
      await verifyMfa(tempToken || 'mock_mfa_token', totpCode);
    } catch (err: any) {
      Alert.alert('MFA Failed', err.message || 'Invalid authenticator code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer contentContainerStyle={{ justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.lg }}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: '#EEF2FF',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.sm,
          }}
        >
          <ShieldCheck size={28} color="#4338CA" />
        </View>

        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
          Officer Two-Factor Authentication
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, textAlign: 'center', marginTop: 4, maxWidth: 280 }}>
          Executive and privileged accounts require TOTP authenticator verification.
        </Text>
      </View>

      <Card variant="elevated" style={{ padding: spacing.lg }}>
        <Input
          label="6-Digit Authenticator Code"
          placeholder="• • • • • •"
          keyboardType="numeric"
          value={totpCode}
          onChangeText={setTotpCode}
          maxLength={6}
        />

        <Button
          title="Authenticate Officer Session"
          onPress={handleVerify}
          variant="primary"
          loading={loading}
          style={{ marginTop: spacing.sm }}
        />
      </Card>
    </ScreenContainer>
  );
};
