// Training Programmes & Skill Development List

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { GraduationCap, Calendar, Clock, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { TrainingProgramme } from '../../types';

export const DEMO_PROGRAMMES: TrainingProgramme[] = [
  {
    id: 'tr_1',
    code: 'NATA-TP-2024-EV01',
    title: 'Electric & Hybrid Vehicle Safety & High-Voltage Diagnostics',
    category: 'Advanced Automotive Technology',
    durationWeeks: 4,
    deliveryMode: 'HYBRID',
    venue: 'NATA State Training Centre, Ikeja & Online Simulator',
    accreditedBy: 'NATA Lagos State Council & National Board for Technical Education (NBTE)',
    description: 'Comprehensive high-voltage isolation, traction inverter troubleshooting, battery cell balancing, and emergency rescue protocol training.',
    modules: [
      { moduleCode: 'MOD-101', title: 'High Voltage Safety & Personal Protective Equipment (PPE)', competencies: ['PPE Inspection', 'HV De-energization', 'Insulation Resistance Test'] },
      { moduleCode: 'MOD-102', title: 'Traction Battery Module Balancing & Thermal Management', competencies: ['Cell Voltage Balancing', 'Cooling System Flush', 'Thermal Sensor Diagnostics'] },
    ],
    startDate: '2024-10-01',
    endDate: '2024-10-28',
    enrollmentStatus: 'IN_PROGRESS',
    progressPercentage: 65,
    attendanceRate: 92,
  },
  {
    id: 'tr_2',
    code: 'NATA-TP-2024-ECU02',
    title: 'Automotive ECU Programming, EEPROM & Key Coding Mastery',
    category: 'Electrical & Electronics',
    durationWeeks: 6,
    deliveryMode: 'PHYSICAL',
    venue: 'Lagos State Technical College, Agidingbi',
    accreditedBy: 'NATA Lagos State Certification Board',
    description: 'Immobilizer bypass, flash reprogramming via J2534 passthrough, EEPROM soldering and microchip hexadecimal data repair.',
    modules: [
      { moduleCode: 'MOD-201', title: 'CAN-Bus Oscilloscope Waveform Analysis', competencies: ['CAN High/Low Analysis', 'Bus Shorting Diagnosis'] },
    ],
    startDate: '2024-11-05',
    endDate: '2024-12-15',
    enrollmentStatus: 'APPLIED',
  },
  {
    id: 'tr_3',
    code: 'NATA-TP-2024-CR03',
    title: 'Common Rail Diesel (CRDI) High-Pressure System Diagnosis',
    category: 'Diesel Engineering',
    durationWeeks: 3,
    deliveryMode: 'PHYSICAL',
    venue: 'Oshodi Technical Training Workshop',
    accreditedBy: 'NATA State Training Directorate',
    description: 'High pressure pump pressure testing, piezoelectric injector calibration and DPF regeneration procedures.',
    modules: [],
    startDate: '2024-12-01',
    endDate: '2024-12-22',
    enrollmentStatus: 'NOT_ENROLLED',
  },
];

export const TrainingListScreen: React.FC = () => {
  const { theme, typography, spacing, layout } = useTheme();
  const [programmes, setProgrammes] = useState<TrainingProgramme[]>(DEMO_PROGRAMMES);

  const handleEnroll = (prog: TrainingProgramme) => {
    Alert.alert(
      'Enroll in Programme',
      `Apply for enrollment in "${prog.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Apply Now',
          onPress: () => {
            setProgrammes((prev) =>
              prev.map((p) =>
                p.id === prog.id ? { ...p, enrollmentStatus: 'APPLIED' } : p
              )
            );
            Alert.alert('Application Submitted', 'Your training application has been submitted to the Training Officer for review.');
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer scrollable={false}>
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
          Technical Training & Skills
        </Text>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          Accredited programmes for career development and tier progression.
        </Text>
      </View>

      <FlatList
        data={programmes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <Card
            variant={item.enrollmentStatus === 'IN_PROGRESS' ? 'elevated' : 'outlined'}
            style={{
              marginBottom: spacing.md,
              borderColor: item.enrollmentStatus === 'IN_PROGRESS' ? theme.primary : theme.border,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge label={item.deliveryMode} variant="neutral" size="sm" />
              {item.enrollmentStatus === 'IN_PROGRESS' ? (
                <Badge label="IN PROGRESS (65%)" variant="info" size="sm" />
              ) : item.enrollmentStatus === 'APPLIED' ? (
                <Badge label="APPLICATION PENDING" variant="warning" size="sm" />
              ) : (
                <Badge label="OPEN FOR ENROLLMENT" variant="success" size="sm" />
              )}
            </View>

            <Text
              style={{
                color: theme.textPrimary,
                fontSize: typography.sizes.base,
                fontWeight: typography.weights.bold,
                marginTop: spacing.xs,
              }}
            >
              {item.title}
            </Text>

            <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 4 }}>
              {item.description}
            </Text>

            <View style={[styles.metaRow, { borderTopColor: theme.border, marginTop: spacing.sm, paddingTop: spacing.xs }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Clock size={12} color={theme.textMuted} style={{ marginRight: 4 }} />
                <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
                  {item.durationWeeks} Weeks Duration
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Calendar size={12} color={theme.textMuted} style={{ marginRight: 4 }} />
                <Text style={{ color: theme.textSecondary, fontSize: 11 }}>
                  Starts: {item.startDate}
                </Text>
              </View>
            </View>

            {item.enrollmentStatus === 'NOT_ENROLLED' && (
              <Button
                title="Apply for Enrollment"
                onPress={() => handleEnroll(item)}
                variant="outline"
                size="sm"
                style={{ marginTop: spacing.sm }}
              />
            )}
          </Card>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
  },
});
