// Vehicle & Technical Capabilities Module

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Award, CheckCircle2, Clock, AlertTriangle, XCircle, Plus, ShieldCheck } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { VehicleCapability, VerificationStatus } from '../../types';

export const DEMO_CAPABILITIES: VehicleCapability[] = [
  {
    id: 'cap_1',
    make: 'Toyota & Lexus',
    modelsSupported: 'Camry, Corolla, Prado, Land Cruiser, RX 350, GX 460',
    yearRange: '2004 - 2024',
    powertrains: ['PETROL', 'HYBRID'],
    specialisation: 'Engine Overhaul, Techstream Diagnostics & Smart Key Registration',
    status: 'VERIFIED',
    verifiedBy: 'State Technical Accreditation Board (Engr. M. Bello)',
    verifiedDate: '2024-03-10',
  },
  {
    id: 'cap_2',
    make: 'Mercedes-Benz',
    modelsSupported: 'C-Class (W204/W205), E-Class (W212/W213), GLK/GLE',
    yearRange: '2008 - 2023',
    powertrains: ['PETROL', 'DIESEL'],
    specialisation: '7G/9G Tronic Transmission & Star Xentry Diagnostics',
    status: 'VERIFIED',
    verifiedBy: 'Inspector F. Adeleke',
    verifiedDate: '2024-02-18',
  },
  {
    id: 'cap_3',
    make: 'Honda & Acura',
    modelsSupported: 'Accord, Civic, CR-V, MDX, RDX',
    yearRange: '2006 - 2024',
    powertrains: ['PETROL'],
    specialisation: 'VTEC Valve Timing, Automatic Transmission Solenoid Calibration',
    status: 'VERIFIED',
    verifiedBy: 'Inspector F. Adeleke',
    verifiedDate: '2024-01-25',
  },
  {
    id: 'cap_4',
    make: 'High-Voltage Electric & Hybrid (EV)',
    modelsSupported: 'Toyota Prius, Camry Hybrid, Lexus RX450h',
    yearRange: '2012 - 2024',
    powertrains: ['HYBRID', 'EV'],
    specialisation: 'NiMH & Li-Ion Traction Battery Cell Balancing & Inverter Diagnostics',
    status: 'UNDER_REVIEW',
  },
  {
    id: 'cap_5',
    make: 'BMW',
    modelsSupported: '3 Series, 5 Series, X5',
    yearRange: '2010 - 2022',
    powertrains: ['PETROL'],
    specialisation: 'ISTA/D Diagnostics & Valvetronic Servicing',
    status: 'SELF_DECLARED',
  },
];

export const CapabilitiesScreen: React.FC = () => {
  const { theme, typography, spacing, layout } = useTheme();
  const [capabilities, setCapabilities] = useState<VehicleCapability[]>(DEMO_CAPABILITIES);
  const [showDeclareModal, setShowDeclareModal] = useState(false);
  const [newMake, setNewMake] = useState('');
  const [newModels, setNewModels] = useState('');
  const [newSpecialisation, setNewSpecialisation] = useState('');

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'VERIFIED':
        return <Badge label="NATA VERIFIED" variant="success" size="sm" />;
      case 'UNDER_REVIEW':
        return <Badge label="UNDER REVIEW" variant="warning" size="sm" />;
      case 'SELF_DECLARED':
        return <Badge label="SELF DECLARED" variant="neutral" size="sm" />;
      case 'REJECTED_NEEDS_EVIDENCE':
        return <Badge label="NEEDS EVIDENCE" variant="error" size="sm" />;
    }
  };

  const handleDeclare = () => {
    if (!newMake.trim() || !newSpecialisation.trim()) {
      Alert.alert('Validation Error', 'Please specify vehicle make and specialisation.');
      return;
    }

    const newCap: VehicleCapability = {
      id: `cap_${Date.now()}`,
      make: newMake.trim(),
      modelsSupported: newModels.trim() || 'All Common Models',
      yearRange: '2010 - 2024',
      powertrains: ['PETROL'],
      specialisation: newSpecialisation.trim(),
      status: 'SELF_DECLARED',
    };

    setCapabilities((prev) => [newCap, ...prev]);
    setShowDeclareModal(false);
    setNewMake('');
    setNewModels('');
    setNewSpecialisation('');
    Alert.alert('Declared', 'Capability declared. It will appear as SELF DECLARED until independently verified by an accredited inspector.');
  };

  return (
    <ScreenContainer scrollable={false}>
      {/* Header */}
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
            Technical Capabilities
          </Text>
          <Button
            title="+ Declare"
            onPress={() => setShowDeclareModal(true)}
            variant="outline"
            size="sm"
          />
        </View>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          Self-declared competencies are clearly distinguished from official NATA Verified skills.
        </Text>
      </View>

      {/* Capabilities List */}
      <FlatList
        data={capabilities}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <Card
            variant={item.status === 'VERIFIED' ? 'elevated' : 'outlined'}
            style={{
              marginBottom: spacing.md,
              borderColor: item.status === 'VERIFIED' ? theme.success : theme.border,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.base, fontWeight: typography.weights.bold }}>
                {item.make}
              </Text>
              {getStatusBadge(item.status)}
            </View>

            <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 4 }}>
              Models: {item.modelsSupported} ({item.yearRange})
            </Text>

            <View style={{ marginTop: spacing.xs }}>
              <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.sm, fontWeight: '600' }}>
                Specialisation:
              </Text>
              <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs }}>
                {item.specialisation}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 6, marginTop: spacing.sm }}>
              {item.powertrains.map((pt) => (
                <Badge key={pt} label={pt} variant="neutral" size="sm" />
              ))}
            </View>

            {item.status === 'VERIFIED' && item.verifiedBy && (
              <View
                style={[
                  styles.verifiedFooter,
                  { borderTopColor: theme.border, marginTop: spacing.sm, paddingTop: spacing.xs },
                ]}
              >
                <ShieldCheck size={14} color={theme.success} style={{ marginRight: 4 }} />
                <Text style={{ color: theme.success, fontSize: 11, fontWeight: '600' }}>
                  Verified by: {item.verifiedBy} ({item.verifiedDate})
                </Text>
              </View>
            )}
          </Card>
        )}
      />

      {/* Declare Capability Modal */}
      <Modal visible={showDeclareModal} animationType="slide" transparent onRequestClose={() => setShowDeclareModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.surface, borderRadius: layout.borderRadius.xl }]}>
            <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.md, fontWeight: typography.weights.bold, marginBottom: spacing.md }}>
              Declare Workshop Capability
            </Text>

            <Input
              label="Vehicle Make / Brand"
              placeholder="e.g. Nissan / Infiniti"
              value={newMake}
              onChangeText={setNewMake}
            />

            <Input
              label="Models Supported"
              placeholder="e.g. Pathfinder, Altima, Patrol"
              value={newModels}
              onChangeText={setNewModels}
            />

            <Input
              label="Trade Specialisation / Systems"
              placeholder="e.g. CVT Transmission & Key Programming"
              value={newSpecialisation}
              onChangeText={setNewSpecialisation}
            />

            <View style={{ flexDirection: 'row', gap: 10, marginTop: spacing.base }}>
              <Button
                title="Cancel"
                onPress={() => setShowDeclareModal(false)}
                variant="outline"
                style={{ flex: 1 }}
              />
              <Button
                title="Declare"
                onPress={handleDeclare}
                variant="primary"
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  verifiedFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    padding: 20,
  },
});
