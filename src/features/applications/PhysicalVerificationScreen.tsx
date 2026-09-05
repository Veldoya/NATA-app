// Physical Verification Field Tool for Unit / Mechanic Village Visits

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { FileCheck2, MapPin, Camera, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react-native';
import { useAuth } from '../../auth/AuthContext';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}

export const PhysicalVerificationScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { user } = useAuth();
  const { theme, typography, spacing, layout } = useTheme();

  const [applicantRef, setApplicantRef] = useState(route.params?.application?.applicationReference || 'APP-2024-0419');
  const [applicantName, setApplicantName] = useState(route.params?.application?.applicantName || 'Rasheed Babalola');
  const [workshopLocation, setWorkshopLocation] = useState('Agidingbi Mechanic Village Unit 2');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: 'c1',
      title: 'Physical Identity Document Match',
      description: 'Physical NIN / Voter Card matches photo and registered name.',
      checked: true,
    },
    {
      id: 'c2',
      title: 'Physical Workshop Stand / Unit Presence',
      description: 'Applicant operates a recognized workshop bay/stand within the Unit.',
      checked: true,
    },
    {
      id: 'c3',
      title: 'Trade Tools & Diagnostic Capability Verification',
      description: 'Appropriate essential tools for declared trade specialisation verified.',
      checked: true,
    },
    {
      id: 'c4',
      title: 'Unit Executive Officer Attestation',
      description: 'Unit Chairman or Secretary confirms good standing and local reputation.',
      checked: true,
    },
  ]);

  const toggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleCompleteVerification = () => {
    const allChecked = checklist.every((c) => c.checked);
    if (!allChecked) {
      Alert.alert(
        'Incomplete Checklist',
        'All physical verification checks must be confirmed before recommending approval. Alternatively, you may request corrections.'
      );
      return;
    }

    Alert.alert(
      'Submit Physical Verification',
      `Confirm physical field verification for ${applicantName} (${applicantRef})?\n\nVerifying Officer: ${user?.firstName} ${user?.lastName}\nLocation: ${workshopLocation}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Live Verification',
          onPress: () => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              Alert.alert(
                'Verification Logged',
                'Physical verification recorded successfully. Application promoted to PENDING_APPROVAL.',
                [{ text: 'Return to Applications', onPress: () => navigation.navigate('Applications') }]
              );
            }, 800);
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer>
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FileCheck2 size={22} color="#4338CA" style={{ marginRight: spacing.xs }} />
          <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
            Physical Field Verification
          </Text>
        </View>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          On-site verification checklist for Unit and mechanic village inspections.
        </Text>
      </View>

      {/* Applicant Card */}
      <Card variant="elevated">
        <Input
          label="Application Reference"
          value={applicantRef}
          onChangeText={setApplicantRef}
        />
        <Input
          label="Applicant Full Name"
          value={applicantName}
          onChangeText={setApplicantName}
        />
        <Input
          label="Inspected Workshop / Location"
          value={workshopLocation}
          onChangeText={setWorkshopLocation}
        />
      </Card>

      {/* Field Inspection Checklist */}
      <View style={{ marginTop: spacing.base }}>
        <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.base, fontWeight: '700', marginBottom: spacing.xs }}>
          Field Verification Checklist
        </Text>

        {checklist.map((item) => (
          <Card
            key={item.id}
            variant="outlined"
            style={{
              marginBottom: spacing.xs,
              backgroundColor: item.checked ? theme.primaryLight : theme.card,
              borderColor: item.checked ? theme.primary : theme.border,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, marginRight: spacing.sm }}>
                <Text style={{ color: theme.textPrimary, fontSize: 13, fontWeight: '700' }}>
                  {item.title}
                </Text>
                <Text style={{ color: theme.textSecondary, fontSize: 11, marginTop: 2 }}>
                  {item.description}
                </Text>
              </View>
              <Switch
                value={item.checked}
                onValueChange={() => toggleChecklist(item.id)}
                trackColor={{ false: theme.border, true: theme.primary }}
              />
            </View>
          </Card>
        ))}
      </View>

      {/* Inspector Notes */}
      <View style={{ marginTop: spacing.base }}>
        <Input
          label="Inspector On-Site Observations & Evidence Notes"
          placeholder="e.g. Visited workshop on 4th Sept. Workshop contains 2-post lift, Autel scan tool, and 3 active apprentices."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
        />
      </View>

      {/* Live Confirmation Action */}
      <Button
        title="Submit Live Physical Verification"
        onPress={handleCompleteVerification}
        variant="primary"
        loading={loading}
        style={{ marginTop: spacing.base, marginBottom: spacing.xxl }}
      />
    </ScreenContainer>
  );
};
