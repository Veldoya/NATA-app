// Official Login Screen with MFA / OTP Routing & Workshop Claim Link

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { ShieldCheck, Lock, Mail, Building, ArrowRight } from 'lucide-react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { login } = useAuth();
  const { theme, typography, spacing, layout } = useTheme();

  const [email, setEmail] = useState('babatunde.technician@nata.ng');
  const [password, setPassword] = useState('NataSecured@2024');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Required Fields', 'Please enter your registered email and password.');
      return;
    }

    setLoading(true);
    try {
      const result = await login(email.trim(), password);
      if (result.requiresOtp) {
        navigation.navigate('OTPVerification', { tempToken: result.tempToken });
      } else if (result.requiresMfa) {
        navigation.navigate('MFAVerification', { tempToken: result.tempToken });
      }
    } catch (err: any) {
      Alert.alert('Login Failed', err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer scrollable={true} contentContainerStyle={{ justifyContent: 'center' }}>
      {/* NATA Council Crest & Header */}
      <View style={{ alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.lg }}>
        <View
          style={[
            styles.logoBadge,
            { backgroundColor: '#0D5C3A', borderColor: '#D97706', ...layout.shadows.md },
          ]}
        >
          <ShieldCheck size={36} color="#FEF3C7" />
        </View>

        <Text
          style={[
            styles.councilTitle,
            { color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.heavy },
          ]}
        >
          NATA WORKER
        </Text>

        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, textAlign: 'center', marginTop: 2 }}>
          Nigerian Automobile Technicians Association • Lagos State Council
        </Text>
      </View>

      {/* Login Card */}
      <Card variant="elevated" style={{ padding: spacing.lg }}>
        <Text
          style={{
            color: theme.textPrimary,
            fontSize: typography.sizes.md,
            fontWeight: typography.weights.bold,
            marginBottom: spacing.md,
          }}
        >
          Sign In to Your Workspace
        </Text>

        <Input
          label="Registered Email"
          placeholder="name@workshop.ng"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          leftIcon={<Mail size={18} color={theme.textMuted} />}
        />

        <Input
          label="Password"
          isPassword
          placeholder="••••••••••••"
          value={password}
          onChangeText={setPassword}
          leftIcon={<Lock size={18} color={theme.textMuted} />}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={{ alignSelf: 'flex-end', marginBottom: spacing.md }}
        >
          <Text style={{ color: theme.primary, fontSize: typography.sizes.xs, fontWeight: '600' }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <Button
          title="Sign In"
          onPress={handleLogin}
          variant="primary"
          loading={loading}
        />
      </Card>

      {/* Workshop Onboarding Deep Link */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ClaimWorkshop')}
        style={[
          styles.claimWorkshopLink,
          { backgroundColor: theme.surfaceSubtle, borderColor: theme.border, borderRadius: layout.borderRadius.md, marginTop: spacing.lg },
        ]}
      >
        <Building size={20} color={theme.primary} style={{ marginRight: spacing.sm }} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.textPrimary, fontSize: 13, fontWeight: '700' }}>
            Have a Workshop Invitation Code?
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
            Claim your accredited workshop profile here
          </Text>
        </View>
        <ArrowRight size={16} color={theme.primary} />
      </TouchableOpacity>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginBottom: 10,
  },
  councilTitle: {
    letterSpacing: 0.5,
  },
  claimWorkshopLink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
  },
});
