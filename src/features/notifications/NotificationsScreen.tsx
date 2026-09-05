// In-App Notification Centre Screen

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Bell,
  CheckCircle2,
  Clock,
  CreditCard,
  Award,
  ShieldCheck,
  Building,
} from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { AppNotification } from '../../types';

export const DEMO_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    category: 'ESTIMATE',
    title: 'Estimate Approved by Customer',
    message: 'Mr. O*** S*** has approved Estimate Version #1 for 2016 Mercedes-Benz E350 (₦324,000).',
    createdAt: '2 hours ago',
    isRead: false,
    priority: 'HIGH',
  },
  {
    id: 'notif_2',
    category: 'OFFICER_APPROVAL',
    title: 'Physical Verification Scheduled',
    message: 'Inspector assigned to Agidingbi Mechanic Village for applicant ID verification.',
    createdAt: 'Yesterday',
    isRead: false,
    priority: 'NORMAL',
  },
  {
    id: 'notif_3',
    category: 'PAYMENT',
    title: 'Receipt Generated #REC-NATA-LAG-2024-0881',
    message: 'Your payment of ₦15,000 for 2024 Annual Practicing Due was verified.',
    createdAt: '3 days ago',
    isRead: true,
    priority: 'NORMAL',
  },
  {
    id: 'notif_4',
    category: 'TRAINING',
    title: 'Training Module 2 Ready',
    message: 'Course materials for Electric & Hybrid Diagnostics have been uploaded.',
    createdAt: '1 week ago',
    isRead: true,
    priority: 'LOW',
  },
];

export const NotificationsScreen: React.FC = () => {
  const { theme, typography, spacing, layout } = useTheme();
  const [notifications, setNotifications] = useState<AppNotification[]>(DEMO_NOTIFICATIONS);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ESTIMATE':
        return <Clock size={18} color={theme.accentDark} />;
      case 'OFFICER_APPROVAL':
        return <ShieldCheck size={18} color={theme.officerBadge} />;
      case 'PAYMENT':
        return <CreditCard size={18} color={theme.success} />;
      case 'TRAINING':
      case 'CERTIFICATE':
        return <Award size={18} color={theme.primary} />;
      default:
        return <Bell size={18} color={theme.primary} />;
    }
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <ScreenContainer scrollable={false}>
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
            Notifications
          </Text>
          <TouchableOpacity onPress={markAllRead} style={{ padding: spacing.xs }}>
            <Text style={{ color: theme.primary, fontSize: typography.sizes.xs, fontWeight: '700' }}>
              Mark all as read
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <Card
            variant={item.isRead ? 'outlined' : 'elevated'}
            style={{
              marginBottom: spacing.sm,
              backgroundColor: item.isRead ? theme.card : theme.primaryLight,
              borderColor: item.isRead ? theme.border : theme.primary,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: theme.surfaceSubtle, marginRight: spacing.sm },
                ]}
              >
                {getCategoryIcon(item.category)}
              </View>

              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.sm, fontWeight: '700' }}>
                    {item.title}
                  </Text>
                  {!item.isRead && (
                    <View style={[styles.unreadDot, { backgroundColor: theme.primary }]} />
                  )}
                </View>

                <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
                  {item.message}
                </Text>

                <Text style={{ color: theme.textMuted, fontSize: 10, marginTop: 6 }}>
                  {item.createdAt}
                </Text>
              </View>
            </View>
          </Card>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
