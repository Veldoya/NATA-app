// Officer Workspace Tab Navigation & Administrative Stacks

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  LayoutDashboard,
  UserCheck,
  Award,
  Shield,
} from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { OfficerTabParamList, OfficerAppStackParamList } from './types';

// Officer Screens
import { OfficerDashboardScreen } from '../features/officer/OfficerDashboardScreen';
import { ApplicationsListScreen } from '../features/applications/ApplicationsListScreen';
import { ApplicationDetailScreen } from '../features/applications/ApplicationDetailScreen';
import { PhysicalVerificationScreen } from '../features/applications/PhysicalVerificationScreen';
import { CertificateDeskScreen } from '../features/officer/CertificateDeskScreen';
import { ExecutiveTenuresScreen } from '../features/officer/ExecutiveTenuresScreen';
import { OrgHierarchyScreen } from '../features/officer/OrgHierarchyScreen';
import { CashCollectionScreen } from '../features/payments/CashCollectionScreen';

const Tab = createBottomTabNavigator<OfficerTabParamList>();
const OfficerStack = createNativeStackNavigator<OfficerAppStackParamList>();

function ApplicationsNavigator() {
  const { theme } = useTheme();
  return (
    <OfficerStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.textPrimary,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <OfficerStack.Screen
        name="Applications"
        component={ApplicationsListScreen}
        options={{ headerShown: false }}
      />
      <OfficerStack.Screen
        name="ApplicationDetail"
        component={ApplicationDetailScreen}
        options={{ title: 'Review Application' }}
      />
      <OfficerStack.Screen
        name="PhysicalVerification"
        component={PhysicalVerificationScreen}
        options={{ title: 'Field Verification' }}
      />
    </OfficerStack.Navigator>
  );
}

function GovernanceNavigator() {
  const { theme } = useTheme();
  return (
    <OfficerStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.textPrimary,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <OfficerStack.Screen
        name="ExecutiveTenures"
        component={ExecutiveTenuresScreen}
        options={{ headerShown: false }}
      />
      <OfficerStack.Screen
        name="OrgHierarchy"
        component={OrgHierarchyScreen}
        options={{ title: 'Council Hierarchy' }}
      />
      <OfficerStack.Screen
        name="CashCollection"
        component={CashCollectionScreen}
        options={{ title: 'Record Cash Collection' }}
      />
    </OfficerStack.Navigator>
  );
}

export const OfficerTabNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: '#4338CA', // Indigo for Officer
        tabBarInactiveTintColor: theme.textMuted,
      }}
    >
      <Tab.Screen
        name="OfficerDashboard"
        component={OfficerDashboardScreen}
        options={{
          tabBarLabel: 'CONSOLE',
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ApplicationsTab"
        component={ApplicationsNavigator}
        options={{
          tabBarLabel: 'APPLICATIONS',
          tabBarIcon: ({ color, size }) => <UserCheck size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="CertificateDeskTab"
        component={CertificateDeskScreen}
        options={{
          tabBarLabel: 'CERT DESK',
          tabBarIcon: ({ color, size }) => <Award size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="GovernanceTab"
        component={GovernanceNavigator}
        options={{
          tabBarLabel: 'GOVERNANCE',
          tabBarIcon: ({ color, size }) => <Shield size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
