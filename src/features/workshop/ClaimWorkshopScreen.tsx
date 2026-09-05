// Workshop Onboarding & Invitation Claim Flow

import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Building, ShieldCheck, KeyRound, CheckCircle2 } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const ClaimWorkshopScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { theme, typography, spacing, layout } = useTheme();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [inviteCode, setInviteCode] = useState(route.params?.code || '');
  const [otpCode, setOtpCode] = useState('');
  const [workshopName, setWorkshopName] = useState('Adeleke Auto Diagnostic Hub');
  const [address, setAddress] = useState('Plot 14, Agidingbi Mechanic Village, Ikeja');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyInvite = () => {
    if (!inviteCode.trim() || inviteCode.length < 6) {
      Alert.alert('Invalid Code', 'Please enter a valid 6-character workshop invitation code.');
      return;
    }
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (!otpCode.trim() || otpCode.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter the 6-digit OTP code sent to the workshop registered phone/email.');
      return;
    }
    setStep(3);
  };

  const handleCompleteClaim = () => {
    if (!password.trim() || password.length < 8) {
      Alert.alert('Validation Error', 'Password must be at least 8 characters with numbers and symbols.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Workshop Claimed!', 'Your workshop account has been claimed and linked to your NATA profile.', [
        { text: 'Proceed', onPress: () => navigation.navigate('Home') },
      ]);
    }, 1000);
  };

  return (
    <ScreenContainer>
      <View style={{ marginTop: spacing.md, marginBottom: spacing.lg, alignItems: 'center' }}>
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
          <Building size={28} color={theme.primary} />
        </View>

        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
          Claim Workshop Profile
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, textAlign: 'center', marginTop: 4, maxWidth: 300 }}>
          Invitation-only onboarding for workshop owners accredited by NATA Lagos State Council.
        </Text>
      </View>

      {step === 1 && (
        <Card variant="elevated">
          <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.base, fontWeight: '700', marginBottom: spacing.sm }}>
            Step 1: Enter Invitation Code
          </Text>
          <Input
            label="Workshop Invitation Reference"
            placeholder="e.g. NATA-WS-INV-9982"
            value={inviteCode}
            onChangeText={setInviteCode}
          />
          <Button title="Verify Invitation" onPress={handleVerifyInvite} variant="primary" />
        </Card>
      )}

      {step === 2 && (
        <Card variant="elevated">
          <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.base, fontWeight: '700', marginBottom: spacing.xs }}>
            Step 2: Enter Verification OTP
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginBottom: spacing.md }}>
            We sent a verification code to the registered workshop phone number ending in •••• 6789.
          </Text>
          <Input
            label="6-Digit OTP Code"
            keyboardType="numeric"
            placeholder="• • • • • •"
            value={otpCode}
            onChangeText={setOtpCode}
          />
          <Button title="Confirm OTP" onPress={handleVerifyOtp} variant="primary" />
        </Card>
      )}

      {step === 3 && (
        <Card variant="elevated">
          <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.base, fontWeight: '700', marginBottom: spacing.xs }}>
            Step 3: Confirm Profile & Set Password
          </Text>
          <Input label="Workshop Legal Name" value={workshopName} onChangeText={setWorkshopName} />
          <Input label="Workshop Address / Mechanic Village" value={address} onChangeText={setAddress} />
          <Input
            label="Create Secure Master Password"
            isPassword
            placeholder="Min 8 characters"
            value={password}
            onChangeText={setPassword}
          />
          <Button
            title="Complete Workshop Onboarding"
            onPress={handleCompleteClaim}
            variant="primary"
            loading={loading}
          />
        </Card>
      )}
    </ScreenContainer>
  );
};
