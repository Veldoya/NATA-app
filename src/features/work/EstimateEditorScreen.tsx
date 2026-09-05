// Estimate Editor Screen - Creating Immutable Estimate Revisions

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Plus, Trash2, ShieldCheck, Check } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { EstimateLineItem } from '../../types';

export const EstimateEditorScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { theme, typography, spacing, layout } = useTheme();
  const [revisionReason, setRevisionReason] = useState('');
  const [items, setItems] = useState<
    Array<{ type: 'PARTS' | 'LABOUR'; description: string; quantity: string; unitPrice: string }>
  >([
    { type: 'PARTS', description: 'Spark Plugs (Set of 4)', quantity: '4', unitPrice: '8000' },
    { type: 'LABOUR', description: 'Labour & Diagnostic Test', quantity: '1', unitPrice: '25000' },
  ]);
  const [depositRequired, setDepositRequired] = useState('30000');

  const addItem = (type: 'PARTS' | 'LABOUR') => {
    setItems((prev) => [
      ...prev,
      { type, description: '', quantity: '1', unitPrice: '0' },
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) {
      Alert.alert('Notice', 'An estimate must contain at least one item.');
      return;
    }
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateItem = (index: number, field: string, value: string) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      return acc + qty * price;
    }, 0);
  };

  const subtotal = calculateSubtotal();

  const handleSave = () => {
    if (items.some((it) => !it.description.trim())) {
      Alert.alert('Validation Error', 'Please provide a description for all estimate lines.');
      return;
    }
    Alert.alert(
      'Submit Estimate Revision',
      `Submit immutable estimate with total of ₦${subtotal.toLocaleString()}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm & Present',
          onPress: () => {
            Alert.alert('Success', 'Estimate version published successfully.');
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
          New Estimate Version
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          Estimates follow immutable versioning. Previous customer presentations are preserved in history.
        </Text>
      </View>

      {/* Revision Reason Input */}
      <Input
        label="Reason for Revision / Notes"
        placeholder="e.g. Additional suspension bushing wear found during test drive"
        value={revisionReason}
        onChangeText={setRevisionReason}
      />

      {/* Line Items */}
      <View style={{ marginTop: spacing.sm }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.base, fontWeight: typography.weights.bold, marginBottom: spacing.xs }}>
          Parts & Labour Breakdown
        </Text>

        {items.map((item, index) => (
          <Card key={index} variant="outlined" style={{ marginBottom: spacing.sm, padding: spacing.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
              <Text style={{ color: theme.primary, fontSize: typography.sizes.xs, fontWeight: '700' }}>
                Item #{index + 1} ({item.type})
              </Text>
              <TouchableOpacity onPress={() => removeItem(index)}>
                <Trash2 size={16} color={theme.error} />
              </TouchableOpacity>
            </View>

            <Input
              placeholder="Description (e.g. Front Brake Pad Set)"
              value={item.description}
              onChangeText={(val) => updateItem(index, 'description', val)}
              containerStyle={{ marginBottom: spacing.xs }}
            />

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Input
                  label="Quantity"
                  keyboardType="numeric"
                  value={item.quantity}
                  onChangeText={(val) => updateItem(index, 'quantity', val)}
                  containerStyle={{ marginBottom: 0 }}
                />
              </View>
              <View style={{ flex: 2 }}>
                <Input
                  label="Unit Price (₦)"
                  keyboardType="numeric"
                  value={item.unitPrice}
                  onChangeText={(val) => updateItem(index, 'unitPrice', val)}
                  containerStyle={{ marginBottom: 0 }}
                />
              </View>
            </View>
          </Card>
        ))}

        {/* Add Item Buttons */}
        <View style={{ flexDirection: 'row', gap: 10, marginTop: spacing.xs }}>
          <Button
            title="+ Add Part"
            onPress={() => addItem('PARTS')}
            variant="outline"
            size="sm"
            style={{ flex: 1 }}
          />
          <Button
            title="+ Add Labour"
            onPress={() => addItem('LABOUR')}
            variant="outline"
            size="sm"
            style={{ flex: 1 }}
          />
        </View>
      </View>

      {/* Totals Summary */}
      <Card variant="elevated" style={{ marginTop: spacing.lg, backgroundColor: theme.surface }}>
        <Input
          label="Deposit Required (₦)"
          keyboardType="numeric"
          value={depositRequired}
          onChangeText={setDepositRequired}
        />

        <View style={[styles.summaryRow, { borderTopColor: theme.border, borderTopWidth: 1, paddingTop: spacing.xs }]}>
          <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.md, fontWeight: '800' }}>
            Estimated Total:
          </Text>
          <Text style={{ color: theme.primary, fontSize: typography.sizes.md, fontWeight: '800' }}>
            ₦{subtotal.toLocaleString()}
          </Text>
        </View>
      </Card>

      {/* Save Button */}
      <Button
        title="Submit Estimate Version"
        onPress={handleSave}
        variant="primary"
        style={{ marginTop: spacing.lg, marginBottom: spacing.xxl }}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
});
