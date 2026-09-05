// Worker Workspace Bottom Tab Navigation & Domain Stacks

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Home,
  Wrench,
  Building,
  ShieldCheck,
  User,
} from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import {
  WorkerTabParamList,
  WorkStackParamList,
  WorkshopStackParamList,
  NataStackParamList,
  ProfileStackParamList,
} from './types';

// Worker Screens
import { WorkerHomeScreen } from '../features/home/WorkerHomeScreen';
import { JobsListScreen } from '../features/work/JobsListScreen';
import { JobDetailScreen } from '../features/work/JobDetailScreen';
import { EstimateEditorScreen } from '../features/work/EstimateEditorScreen';
import { ServiceHistoryScreen } from '../features/work/ServiceHistoryScreen';
import { WorkshopScreen } from '../features/workshop/WorkshopScreen';
import { CapabilitiesScreen } from '../features/workshop/CapabilitiesScreen';
import { EquipmentScreen } from '../features/workshop/EquipmentScreen';
import { DuesListScreen } from '../features/payments/DuesListScreen';
import { PaymentHistoryScreen } from '../features/payments/PaymentHistoryScreen';
import { MyCertificatesScreen } from '../features/certificates/MyCertificatesScreen';
import { CertificateDetailScreen } from '../features/certificates/CertificateDetailScreen';
import { TrainingListScreen } from '../features/training/TrainingListScreen';
import { DTCLookupScreen } from '../features/automotive/DTCLookupScreen';
import { AIAssistantScreen } from '../features/automotive/AIAssistantScreen';
import { ProfileScreen } from '../features/profile/ProfileScreen';
import { DigitalMembershipCard } from '../features/profile/DigitalMembershipCard';
import { ProgressionScreen } from '../features/profile/ProgressionScreen';

const Tab = createBottomTabNavigator<WorkerTabParamList>();
const WorkStack = createNativeStackNavigator<WorkStackParamList>();
const WorkshopStack = createNativeStackNavigator<WorkshopStackParamList>();
const NataStack = createNativeStackNavigator<NataStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

function WorkNavigator() {
  const { theme } = useTheme();
  return (
    <WorkStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.textPrimary,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <WorkStack.Screen name="JobsList" component={JobsListScreen} options={{ headerShown: false }} />
      <WorkStack.Screen name="JobDetail" component={JobDetailScreen} options={{ title: 'Job Details' }} />
      <WorkStack.Screen name="EstimateEditor" component={EstimateEditorScreen} options={{ title: 'New Estimate' }} />
      <WorkStack.Screen name="ServiceHistory" component={ServiceHistoryScreen} options={{ title: 'Service History' }} />
    </WorkStack.Navigator>
  );
}

function WorkshopNavigator() {
  const { theme } = useTheme();
  return (
    <WorkshopStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.textPrimary,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <WorkshopStack.Screen name="WorkshopHome" component={WorkshopScreen} options={{ headerShown: false }} />
      <WorkshopStack.Screen name="Capabilities" component={CapabilitiesScreen} options={{ title: 'Capabilities' }} />
      <WorkshopStack.Screen name="Equipment" component={EquipmentScreen} options={{ title: 'Equipment' }} />
    </WorkshopStack.Navigator>
  );
}

function NataNavigator() {
  const { theme } = useTheme();
  return (
    <NataStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.textPrimary,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <NataStack.Screen name="Payments" component={DuesListScreen} options={{ headerShown: false }} />
      <NataStack.Screen name="PaymentHistory" component={PaymentHistoryScreen} options={{ title: 'Payment Receipts' }} />
      <NataStack.Screen name="Certificates" component={MyCertificatesScreen} options={{ title: 'My Certificates' }} />
      <NataStack.Screen name="CertificateDetail" component={CertificateDetailScreen} options={{ title: 'Certificate Record' }} />
      <NataStack.Screen name="Training" component={TrainingListScreen} options={{ title: 'Training Programmes' }} />
      <NataStack.Screen name="Automotive" component={DTCLookupScreen} options={{ title: 'Diagnostic Tools' }} />
      <NataStack.Screen name="AIAssistant" component={AIAssistantScreen} options={{ title: 'AI Diagnostics' }} />
    </NataStack.Navigator>
  );
}

function ProfileNavigator() {
  const { theme } = useTheme();
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.textPrimary,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <ProfileStack.Screen name="ProfileHome" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="DigitalCard" component={DigitalMembershipCard} options={{ title: 'Membership Record' }} />
      <ProfileStack.Screen name="Progression" component={ProgressionScreen} options={{ title: 'Progression Path' }} />
    </ProfileStack.Navigator>
  );
}

export const WorkerTabNavigator: React.FC = () => {
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
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textMuted,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={WorkerHomeScreen}
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="WorkTab"
        component={WorkNavigator}
        options={{
          tabBarLabel: 'WORK',
          tabBarIcon: ({ color, size }) => <Wrench size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="WorkshopTab"
        component={WorkshopNavigator}
        options={{
          tabBarLabel: 'WORKSHOP',
          tabBarIcon: ({ color, size }) => <Building size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="NataTab"
        component={NataNavigator}
        options={{
          tabBarLabel: 'NATA',
          tabBarIcon: ({ color, size }) => <ShieldCheck size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
