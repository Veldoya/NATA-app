// Council Organisation Hierarchy & Jurisdiction Navigator

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Network, ChevronRight, MapPin, Building, Search, Home } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { OrganisationScope, OrgLevel } from '../../types';

export const DEMO_ORGS: OrganisationScope[] = [
  { id: 'org_state_01', name: 'Lagos State Council (Apex)', level: 'STATE', code: 'LAG-STATE' },
  { id: 'org_lga_01', name: 'Ikeja Local Government Directorate', level: 'LGA', code: 'IKJ-LGA', parentId: 'org_state_01', parentName: 'Lagos State Council' },
  { id: 'org_ch_02', name: 'Ikeja Chapter / Onigbongbo LCDA', level: 'CHAPTER', code: 'IKJ-ONIG', parentId: 'org_lga_01', parentName: 'Ikeja LGA' },
  { id: 'org_unit_04', name: 'Ikeja Central Mechanic Village Unit 2', level: 'UNIT', code: 'IKJ-U02', parentId: 'org_ch_02', parentName: 'Ikeja Chapter' },
  { id: 'org_unit_05', name: 'Agidingbi Commercial Line Unit 1', level: 'UNIT', code: 'IKJ-AGD01', parentId: 'org_ch_02', parentName: 'Ikeja Chapter' },
  { id: 'org_lga_02', name: 'Oshodi-Isolo Local Government Directorate', level: 'LGA', code: 'OSH-LGA', parentId: 'org_state_01', parentName: 'Lagos State Council' },
  { id: 'org_ch_03', name: 'Oshodi Central Chapter', level: 'CHAPTER', code: 'OSH-CTR', parentId: 'org_lga_02', parentName: 'Oshodi LGA' },
];

export const OrgHierarchyScreen: React.FC = () => {
  const { theme, typography, spacing, layout } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrgs = DEMO_ORGS.filter(
    (o) =>
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.code && o.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      o.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelBadge = (level: OrgLevel) => {
    switch (level) {
      case 'STATE':
        return <Badge label="STATE APEX" variant="officer" size="sm" />;
      case 'LGA':
        return <Badge label="LGA LEVEL" variant="info" size="sm" />;
      case 'CHAPTER':
      case 'LCDA':
        return <Badge label="CHAPTER / LCDA" variant="warning" size="sm" />;
      case 'UNIT':
      case 'MECHANIC_VILLAGE':
        return <Badge label="UNIT / VILLAGE" variant="success" size="sm" />;
    }
  };

  return (
    <ScreenContainer scrollable={false}>
      {/* Header */}
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.sm }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
          Council Organisation Hierarchy
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          Jurisdictional structure: State → LGA → Chapter → Unit → Mechanic Village.
        </Text>

        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              borderRadius: layout.borderRadius.md,
              marginTop: spacing.sm,
            },
          ]}
        >
          <Search size={18} color={theme.textMuted} style={{ marginRight: spacing.sm }} />
          <TextInput
            placeholder="Search council unit, chapter, or code..."
            placeholderTextColor={theme.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: theme.textPrimary, fontSize: typography.sizes.sm }]}
          />
        </View>
      </View>

      <FlatList
        data={filteredOrgs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <Card variant="outlined" style={{ marginBottom: spacing.sm }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, fontWeight: '700' }}>
                {item.code}
              </Text>
              {getLevelBadge(item.level)}
            </View>

            <Text
              style={{
                color: theme.textPrimary,
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.bold,
                marginTop: spacing.xs,
              }}
            >
              {item.name}
            </Text>

            {item.parentName && (
              <Text style={{ color: theme.textMuted, fontSize: 11, marginTop: 2 }}>
                Parent Authority: {item.parentName}
              </Text>
            )}
          </Card>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: 42,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 4,
  },
});
