// Workshop Hub Screen - Overview, Staff, Accreditation & Capabilities

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import {
  Building,
  Award,
  Users,
  Wrench,
  ChevronRight,
  ShieldCheck,
  Plus,
  MapPin,
  Phone,
} from 'lucide-react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface WorkshopScreenProps {
  navigation: any;
}

export const WorkshopScreen: React.FC<WorkshopScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { theme, typography, spacing, layout } = useTheme();

  return (
    <ScreenContainer>
      {/* 1. Workshop Profile Banner */}
      <Card
        variant="elevated"
        style={{
          marginTop: spacing.sm,
          backgroundColor: theme.surface,
          borderColor: theme.border,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Badge label="GRADE B ACCREDITED" variant="success" size="sm" />
          <Text style={{ color: theme.textMuted, fontSize: 11 }}>
            REG: NATA/WS/IKJ/0042
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs }}>
          <Building size={22} color={theme.primary} style={{ marginRight: spacing.xs }} />
          <Text
            style={{
              color: theme.textPrimary,
              fontSize: typography.sizes.lg,
              fontWeight: typography.weights.bold,
            }}
          >
            Adeleke Auto Diagnostic Hub
          </Text>
        </View>

        <View style={{ marginTop: spacing.xs, gap: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MapPin size={14} color={theme.textMuted} style={{ marginRight: 6 }} />
            <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs }}>
              Plot 14, Mechanic Village, Agidingbi, Ikeja, Lagos
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Phone size={14} color={theme.textMuted} style={{ marginRight: 6 }} />
            <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs }}>
              +234 802 345 6789 • adeleke.hub@nata.ng
            </Text>
          </View>
        </View>
      </Card>

      {/* 2. Operations & Capability Links */}
      <View style={{ marginTop: spacing.base }}>
        <Text
          style={{
            color: theme.textPrimary,
            fontSize: typography.sizes.base,
            fontWeight: typography.weights.bold,
            marginBottom: spacing.xs,
          }}
        >
          Workshop Operations
        </Text>

        <Card variant="outlined" style={{ padding: 0 }}>
          {/* Technical Capabilities */}
          <TouchableOpacity
            style={[styles.menuRow, { borderBottomColor: theme.border, padding: spacing.base }]}
            onPress={() => navigation.navigate('Capabilities')}
          >
            <Award size={22} color={theme.accent} style={{ marginRight: spacing.md }} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.menuTitle, { color: theme.textPrimary }]}>
                Vehicle & Technical Capabilities
              </Text>
              <Text style={[styles.menuSub, { color: theme.textSecondary }]}>
                4 Verified • 2 Under Review
              </Text>
            </View>
            <ChevronRight size={18} color={theme.textMuted} />
          </TouchableOpacity>

          {/* Workshop Equipment */}
          <TouchableOpacity
            style={[styles.menuRow, { borderBottomColor: theme.border, padding: spacing.base }]}
            onPress={() => navigation.navigate('Equipment')}
          >
            <Wrench size={22} color={theme.primary} style={{ marginRight: spacing.md }} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.menuTitle, { color: theme.textPrimary }]}>
                Tools & Diagnostic Equipment
              </Text>
              <Text style={[styles.menuSub, { color: theme.textSecondary }]}>
                6 Verified Operational Tools
              </Text>
            </View>
            <ChevronRight size={18} color={theme.textMuted} />
          </TouchableOpacity>

          {/* Technicians & Apprentices */}
          <View style={[styles.menuRow, { padding: spacing.base }]}>
            <Users size={22} color={theme.info} style={{ marginRight: spacing.md }} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.menuTitle, { color: theme.textPrimary }]}>
                Staff & Apprentices
              </Text>
              <Text style={[styles.menuSub, { color: theme.textSecondary }]}>
                3 Master Techs • 2 Apprentices Registered
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {/* 3. Registered Technicians List */}
      <View style={{ marginTop: spacing.base }}>
        <Text
          style={{
            color: theme.textPrimary,
            fontSize: typography.sizes.base,
            fontWeight: typography.weights.bold,
            marginBottom: spacing.xs,
          }}
        >
          Workshop Technicians
        </Text>

        <Card variant="elevated" style={{ backgroundColor: theme.card, paddingVertical: spacing.sm }}>
          <View style={[styles.staffRow, { borderBottomColor: theme.border, borderBottomWidth: 0.5 }]}>
            <View>
              <Text style={{ color: theme.textPrimary, fontSize: 13, fontWeight: '700' }}>
                Babatunde Adeleke
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
                Workshop Owner • Senior Technician
              </Text>
            </View>
            <Badge label="OWNER" variant="worker" size="sm" />
          </View>

          <View style={[styles.staffRow, { borderBottomColor: theme.border, borderBottomWidth: 0.5 }]}>
            <View>
              <Text style={{ color: theme.textPrimary, fontSize: 13, fontWeight: '700' }}>
                Emeka Okafor
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
                NATA/LAG/IKJ/2023/1102 • Journeyman
              </Text>
            </View>
            <Badge label="ACTIVE" variant="success" size="sm" />
          </View>

          <View style={styles.staffRow}>
            <View>
              <Text style={{ color: theme.textPrimary, fontSize: 13, fontWeight: '700' }}>
                Sodiq Alabi
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
                Apprentice Member • Year 2
              </Text>
            </View>
            <Badge label="APPRENTICE" variant="neutral" size="sm" />
          </View>
        </Card>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  menuSub: {
    fontSize: 11,
    marginTop: 2,
  },
  staffRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
