// Dynamic Workspace Header with Workspace Switcher & Notification Bell

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Bell, ShieldCheck, Wrench, ArrowLeftRight } from 'lucide-react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../theme/ThemeContext';
import { Badge } from '../ui/Badge';

interface WorkspaceHeaderProps {
  onPressNotifications?: () => void;
  unreadNotificationsCount?: number;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  onPressNotifications,
  unreadNotificationsCount = 0,
}) => {
  const { user, activeWorkspace, isOfficerEligible, switchWorkspace } = useAuth();
  const { theme, typography, spacing, layout } = useTheme();

  const handleToggleWorkspace = () => {
    if (!isOfficerEligible) return;
    const nextWorkspace = activeWorkspace === 'WORKER' ? 'OFFICER' : 'WORKER';
    switchWorkspace(nextWorkspace);
  };

  const getInitials = (): string => {
    if (!user) return 'N';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderBottomColor: theme.border,
          borderBottomWidth: 1,
          paddingHorizontal: spacing.base,
          paddingVertical: spacing.md,
        },
      ]}
    >
      <View style={styles.leftRow}>
        {/* Avatar / Initials */}
        <View
          style={[
            styles.avatarCircle,
            {
              backgroundColor: activeWorkspace === 'OFFICER' ? theme.officerBadge : theme.primary,
            },
          ]}
        >
          <Text style={[styles.avatarText, { fontSize: typography.sizes.sm }]}>
            {getInitials()}
          </Text>
        </View>

        <View style={styles.userInfo}>
          <Text
            style={[
              styles.userName,
              {
                color: theme.textPrimary,
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.bold,
              },
            ]}
            numberOfLines={1}
          >
            {user ? `${user.firstName} ${user.lastName}` : 'NATA Member'}
          </Text>
          <Text
            style={[
              styles.userRoleText,
              {
                color: theme.textSecondary,
                fontSize: typography.sizes.xs,
              },
            ]}
            numberOfLines={1}
          >
            {activeWorkspace === 'OFFICER'
              ? user?.currentOffice || 'Authorized Officer'
              : user?.tier.replace('_', ' ') || 'Technician'}
          </Text>
        </View>
      </View>

      <View style={styles.rightRow}>
        {/* Workspace Switcher Button for Eligible Officers */}
        {isOfficerEligible ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleToggleWorkspace}
            style={[
              styles.switcherButton,
              {
                backgroundColor:
                  activeWorkspace === 'OFFICER' ? theme.officerBadgeBg : theme.primaryLight,
                borderColor:
                  activeWorkspace === 'OFFICER' ? theme.officerBadge : theme.primary,
                borderRadius: layout.borderRadius.full,
                paddingHorizontal: spacing.sm + 2,
                paddingVertical: spacing.xs,
              },
            ]}
          >
            {activeWorkspace === 'OFFICER' ? (
              <ShieldCheck size={14} color={theme.officerBadge} style={{ marginRight: 4 }} />
            ) : (
              <Wrench size={14} color={theme.primary} style={{ marginRight: 4 }} />
            )}
            <Text
              style={[
                styles.switcherText,
                {
                  color: activeWorkspace === 'OFFICER' ? theme.officerBadge : theme.primary,
                  fontSize: typography.sizes.xs,
                  fontWeight: typography.weights.bold,
                },
              ]}
            >
              {activeWorkspace === 'OFFICER' ? 'OFFICER' : 'WORKER'}
            </Text>
            <ArrowLeftRight
              size={12}
              color={activeWorkspace === 'OFFICER' ? theme.officerBadge : theme.primary}
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        ) : (
          <Badge label="WORKER" variant="worker" size="sm" />
        )}

        {/* Notification Bell */}
        {onPressNotifications ? (
          <TouchableOpacity
            onPress={onPressNotifications}
            style={[
              styles.iconButton,
              {
                backgroundColor: theme.surfaceSubtle,
                marginLeft: spacing.sm,
              },
            ]}
          >
            <Bell size={18} color={theme.textPrimary} />
            {unreadNotificationsCount > 0 ? (
              <View
                style={[
                  styles.notificationDot,
                  { backgroundColor: theme.error },
                ]}
              >
                <Text style={styles.dotText}>
                  {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    letterSpacing: 0.1,
  },
  userRoleText: {
    marginTop: 1,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switcherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  switcherText: {
    letterSpacing: 0.4,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  dotText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
});
