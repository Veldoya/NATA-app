// Worker Profile & Settings Screen

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import {
  User,
  ShieldCheck,
  Award,
  Lock,
  Moon,
  LogOut,
  ChevronRight,
  Building,
  History,
  HelpCircle,
} from 'lucide-react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { theme, isDark, setMode, typography, spacing, layout } = useTheme();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to log out of NATA Worker?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => logout() },
    ]);
  };

  return (
    <ScreenContainer>
      {/* 1. Header Card */}
      <Card
        variant="elevated"
        style={{
          marginTop: spacing.md,
          backgroundColor: theme.surface,
          alignItems: 'center',
          paddingVertical: spacing.lg,
        }}
      >
        <View
          style={[
            styles.avatarCircle,
            { backgroundColor: theme.primary, marginBottom: spacing.sm },
          ]}
        >
          <Text style={[styles.avatarText, { fontSize: typography.sizes.xl }]}>
            {user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : 'N'}
          </Text>
        </View>

        <Text
          style={[
            styles.userName,
            {
              color: theme.textPrimary,
              fontSize: typography.sizes.lg,
              fontWeight: typography.weights.bold,
            },
          ]}
        >
          {user?.firstName} {user?.lastName}
        </Text>

        <Text style={[styles.memberId, { color: theme.textSecondary, fontSize: typography.sizes.xs }]}>
          {user?.membershipNumber}
        </Text>

        <View style={{ flexDirection: 'row', marginTop: spacing.xs, gap: 6 }}>
          <Badge label={user?.standing || 'ACTIVE'} variant="success" size="sm" />
          <Badge label={user?.tier.replace('_', ' ') || 'TECHNICIAN'} variant="worker" size="sm" />
        </View>
      </Card>

      {/* 2. Professional Credentials & Governance Links */}
      <View style={{ marginTop: spacing.base }}>
        <Text
          style={[
            styles.sectionHeading,
            {
              color: theme.textSecondary,
              fontSize: typography.sizes.xs,
              fontWeight: typography.weights.bold,
              marginBottom: spacing.xs,
            },
          ]}
        >
          PROFESSIONAL IDENTITY
        </Text>

        <Card variant="outlined" style={{ padding: 0 }}>
          <TouchableOpacity
            style={[styles.menuRow, { borderBottomColor: theme.border, padding: spacing.base }]}
            onPress={() => navigation.navigate('DigitalCard')}
          >
            <ShieldCheck size={20} color={theme.primary} style={{ marginRight: spacing.md }} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.menuTitle, { color: theme.textPrimary }]}>
                Digital Membership Record
              </Text>
              <Text style={[styles.menuSub, { color: theme.textSecondary }]}>
                Verified Council Identity & Standing
              </Text>
            </View>
            <ChevronRight size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuRow, { borderBottomColor: theme.border, padding: spacing.base }]}
            onPress={() => navigation.navigate('Progression')}
          >
            <Award size={20} color={theme.accent} style={{ marginRight: spacing.md }} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.menuTitle, { color: theme.textPrimary }]}>
                Technician Progression
              </Text>
              <Text style={[styles.menuSub, { color: theme.textSecondary }]}>
                Governed Career Path & Requirements
              </Text>
            </View>
            <ChevronRight size={18} color={theme.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuRow, { padding: spacing.base }]}
            onPress={() => navigation.navigate('Workshop')}
          >
            <Building size={20} color={theme.info} style={{ marginRight: spacing.md }} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.menuTitle, { color: theme.textPrimary }]}>
                Workshop Affiliation
              </Text>
              <Text style={[styles.menuSub, { color: theme.textSecondary }]}>
                {user?.workshopName || 'Adeleke Premium Auto Diagnostic Hub'}
              </Text>
            </View>
            <ChevronRight size={18} color={theme.textMuted} />
          </TouchableOpacity>
        </Card>
      </View>

      {/* 3. Security & App Preferences */}
      <View style={{ marginTop: spacing.base }}>
        <Text
          style={[
            styles.sectionHeading,
            {
              color: theme.textSecondary,
              fontSize: typography.sizes.xs,
              fontWeight: typography.weights.bold,
              marginBottom: spacing.xs,
            },
          ]}
        >
          APP PREFERENCES & SECURITY
        </Text>

        <Card variant="outlined" style={{ padding: 0 }}>
          <View
            style={[
              styles.menuRow,
              { borderBottomColor: theme.border, borderBottomWidth: 1, padding: spacing.base },
            ]}
          >
            <Moon size={20} color={theme.textPrimary} style={{ marginRight: spacing.md }} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.menuTitle, { color: theme.textPrimary }]}>Dark Mode</Text>
              <Text style={[styles.menuSub, { color: theme.textSecondary }]}>
                {isDark ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={(val) => setMode(val ? 'dark' : 'light')}
              thumbColor={isDark ? theme.primary : '#FFFFFF'}
              trackColor={{ false: theme.border, true: theme.primaryLight }}
            />
          </View>

          <View style={[styles.menuRow, { padding: spacing.base }]}>
            <Lock size={20} color={theme.textPrimary} style={{ marginRight: spacing.md }} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.menuTitle, { color: theme.textPrimary }]}>
                Two-Factor Security (MFA)
              </Text>
              <Text style={[styles.menuSub, { color: theme.success, fontWeight: '600' }]}>
                Active & Enforced
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {/* 4. Logout Button */}
      <Button
        title="Sign Out"
        onPress={handleLogout}
        variant="danger"
        style={{ marginTop: spacing.lg, marginBottom: spacing.xl }}
        icon={<LogOut size={18} color="#FFFFFF" style={{ marginRight: 6 }} />}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  userName: {
    letterSpacing: 0.2,
  },
  memberId: {
    marginTop: 2,
    letterSpacing: 0.3,
  },
  sectionHeading: {
    letterSpacing: 0.5,
    marginLeft: 4,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  menuSub: {
    fontSize: 11,
    marginTop: 2,
  },
});
