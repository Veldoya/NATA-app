// Password Reset Screen

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Mail, KeyRound } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const ForgotPasswordScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme, typography, spacing } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendReset = () => {
    if (!email.trim()) {
      Alert.alert('Required', 'Please enter your registered email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Password Reset Link Sent',
        `A secure password reset link has been dispatched to ${email}.`,
        [{ text: 'Return to Login', onPress: () => navigation.goBack() }]
      );
    }, 800);
  };

  return (
    <ScreenContainer contentContainerStyle={{ justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.lg }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
          Reset Password
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, textAlign: 'center', marginTop: 4, maxWidth: 280 }}>
          Enter your registered email to receive official password reset instructions.
        </Text>
      </View>

      <Card variant="elevated" style={{ padding: spacing.lg }}>
        <Input
          label="Registered Email"
          placeholder="name@workshop.ng"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          leftIcon={<Mail size={18} color={theme.textMuted} />}
        />

        <Button
          title="Send Reset Instructions"
          onPress={handleSendReset}
          variant="primary"
          loading={loading}
          style={{ marginTop: spacing.sm }}
        />
      </Card>
    </ScreenContainer>
  );
};
