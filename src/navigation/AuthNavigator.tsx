// Authentication Navigation Stack

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { LoginScreen } from '../features/auth/LoginScreen';
import { OTPScreen } from '../features/auth/OTPScreen';
import { MFAScreen } from '../features/auth/MFAScreen';
import { ForgotPasswordScreen } from '../features/auth/ForgotPasswordScreen';
import { ClaimWorkshopScreen } from '../features/workshop/ClaimWorkshopScreen';
import { useTheme } from '../theme/ThemeContext';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.textPrimary,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTPVerification"
        component={OTPScreen}
        options={{ title: 'OTP Verification' }}
      />
      <Stack.Screen
        name="MFAVerification"
        component={MFAScreen}
        options={{ title: 'Two-Factor Security' }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: 'Reset Password' }}
      />
      <Stack.Screen
        name="ClaimWorkshop"
        component={ClaimWorkshopScreen}
        options={{ title: 'Claim Workshop' }}
      />
    </Stack.Navigator>
  );
};
