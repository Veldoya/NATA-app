// Email / SMS OTP Verification Screen

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { KeyRound, ShieldCheck } from 'lucide-react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const OTPScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { tempToken } = route.params || {};
  const { verifyOtp } = useAuth();
  const { theme, typography, spacing, layout } = useTheme();

  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otpCode.trim() || otpCode.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit verification code.');
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(tempToken || 'mock_token', otpCode);
    } catch (err: any) {
      Alert.alert('Verification Failed', err.message || 'The OTP code is invalid or expired.');
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
            backgroundColor: theme.primaryLight,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.sm,
          }}
        >
          <KeyRound size={28} color={theme.primary} />
        </View>

        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
          Enter Verification Code
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, textAlign: 'center', marginTop: 4, maxWidth: 280 }}>
          We sent a 6-digit security code to your registered email address.
        </Text>
      </View>

      <Card variant="elevated" style={{ padding: spacing.lg }}>
        <Input
          label="6-Digit OTP Code"
          placeholder="• • • • • •"
          keyboardType="numeric"
          value={otpCode}
          onChangeText={setOtpCode}
          maxLength={6}
        />

        <Button
          title="Verify & Proceed"
          onPress={handleVerify}
          variant="primary"
          loading={loading}
          style={{ marginTop: spacing.sm }}
        />
      </Card>
    </ScreenContainer>
  );
};
