// Root Navigation Switcher - Gating Auth, Worker & Officer Workspaces

import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AuthNavigator } from './AuthNavigator';
import { WorkerTabNavigator } from './WorkerTabNavigator';
import { OfficerTabNavigator } from './OfficerTabNavigator';
import { NotificationsScreen } from '../features/notifications/NotificationsScreen';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '../theme/ThemeContext';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const { isAuthenticated, activeWorkspace, isLoading } = useAuth();
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : activeWorkspace === 'OFFICER' ? (
          <RootStack.Screen name="OfficerApp" component={OfficerTabNavigator} />
        ) : (
          <RootStack.Screen name="WorkerApp" component={WorkerTabNavigator} />
        )}

        <RootStack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            headerShown: true,
            presentation: 'modal',
            title: 'Notifications',
            headerStyle: { backgroundColor: theme.surface },
            headerTintColor: theme.textPrimary,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
