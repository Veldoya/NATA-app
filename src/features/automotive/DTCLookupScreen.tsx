// Automotive Tools & Diagnostic Trouble Code (DTC) Search Screen

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Search, Sparkles, AlertTriangle, ChevronRight, BookOpen } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { OFFLINE_DTC_DATABASE } from '../../api/modules/automotive';
import { DTCCode } from '../../types';

export const DTCLookupScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const initialCode = route.params?.initialCode || '';
  const { theme, typography, spacing, layout } = useTheme();
  const [searchQuery, setSearchQuery] = useState(initialCode);
  const [selectedDtc, setSelectedDtc] = useState<DTCCode | null>(
    initialCode ? OFFLINE_DTC_DATABASE.find((d) => d.code === initialCode) || null : null
  );

  const filteredDtcList = OFFLINE_DTC_DATABASE.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenContainer scrollable={false}>
      {/* Search Bar & AI Diagnostics Quick Button */}
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.sm }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
          <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
            OBD-II Diagnostic Lookup
          </Text>
          <TouchableOpacity
            style={{ padding: spacing.xs }}
            onPress={() => navigation.navigate('AIAssistant')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Sparkles size={14} color={theme.primary} style={{ marginRight: 4 }} />
              <Text style={{ color: theme.primary, fontSize: typography.sizes.xs, fontWeight: '700' }}>
                AI Diagnostic →
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              borderRadius: layout.borderRadius.md,
              paddingHorizontal: spacing.md,
            },
          ]}
        >
          <Search size={18} color={theme.textMuted} style={{ marginRight: spacing.sm }} />
          <TextInput
            placeholder="Search code (e.g. P0300, P0171, ABS, Misfire)..."
            placeholderTextColor={theme.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[styles.searchInput, { color: theme.textPrimary, fontSize: typography.sizes.sm }]}
          />
        </View>
      </View>

      {/* Selected DTC Detail View Modal/Panel */}
      {selectedDtc ? (
        <Card variant="elevated" style={{ backgroundColor: theme.card, marginBottom: spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Badge label={selectedDtc.code} variant="error" size="md" />
            <TouchableOpacity onPress={() => setSelectedDtc(null)}>
              <Text style={{ color: theme.primary, fontSize: 12, fontWeight: '700' }}>Close Detail ✕</Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: theme.textPrimary,
              fontSize: typography.sizes.base,
              fontWeight: typography.weights.bold,
              marginTop: spacing.xs,
            }}
          >
            {selectedDtc.title}
          </Text>

          <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 4 }}>
            {selectedDtc.description}
          </Text>

          <View style={{ marginTop: spacing.sm }}>
            <Text style={{ color: theme.textPrimary, fontSize: 12, fontWeight: '700' }}>
              Common Symptoms:
            </Text>
            {selectedDtc.symptoms.map((s, idx) => (
              <Text key={idx} style={{ color: theme.textSecondary, fontSize: 11, marginTop: 2 }}>
                • {s}
              </Text>
            ))}
          </View>

          <View style={{ marginTop: spacing.sm }}>
            <Text style={{ color: theme.textPrimary, fontSize: 12, fontWeight: '700' }}>
              Standard Diagnostic Steps:
            </Text>
            {selectedDtc.diagnosticSteps.map((d, idx) => (
              <Text key={idx} style={{ color: theme.textSecondary, fontSize: 11, marginTop: 2 }}>
                {idx + 1}. {d}
              </Text>
            ))}
          </View>
        </Card>
      ) : null}

      {/* DTC List */}
      <FlatList
        data={filteredDtcList}
        keyExtractor={(item) => item.code}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <Card
            variant="outlined"
            style={{ marginBottom: spacing.sm }}
            onPress={() => setSelectedDtc(item)}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge label={item.code} variant="error" size="sm" />
              <Badge label={item.category} variant="neutral" size="sm" />
            </View>

            <Text
              style={{
                color: theme.textPrimary,
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.bold,
                marginTop: spacing.xs,
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}
              numberOfLines={2}
            >
              {item.description}
            </Text>
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
  },
  searchInput: {
    flex: 1,
    paddingVertical: 4,
  },
});
