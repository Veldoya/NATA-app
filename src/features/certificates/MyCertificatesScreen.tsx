// My Certificates & Live QR Scanner Launcher

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Award, QrCode, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CameraQRScanner } from '../../components/scanner/CameraQRScanner';
import { CertificateRecord } from '../../types';

export const DEMO_CERTIFICATES: CertificateRecord[] = [
  {
    id: 'cert_1',
    certificateNumber: 'NATA-CERT-2024-8891',
    title: 'Master Automotive Electrical & ECU Diagnostic Specialist',
    trade: 'Auto Electrical & Electronic Systems',
    issuedToName: 'Babatunde Adeleke',
    membershipNumber: 'NATA/LAG/IKJ/2023/0482',
    issueDate: '2024-04-12',
    status: 'VALID',
    trainingOfficerApprovedBy: 'Engr. K. Balogun (Training Directorate)',
    assessorApprovedBy: 'Chief Assessor M. Lawal',
    certificationOfficerApprovedBy: 'State Certification Officer O. Dosunmu',
    stateSecretaryApprovedBy: 'Comrade S. Adebayo (State Secretary)',
    stateChairmanApprovedBy: 'Alhaji (Engr.) J. Alade (State Chairman)',
    qrPayloadUrl: 'https://api.natalagoscouncil.com.ng/api/v1/certificates/verify-public?cert=NATA-CERT-2024-8891',
    verificationHash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    pdfDownloadUrl: 'https://storage.natalagoscouncil.com.ng/certificates/NATA-CERT-2024-8891.pdf',
  },
  {
    id: 'cert_2',
    certificateNumber: 'NATA-CERT-2022-4410',
    title: 'Journeyman Automotive Mechanical Systems & Transmission Overhaul',
    trade: 'Mechanical Engineering & Transmission',
    issuedToName: 'Babatunde Adeleke',
    membershipNumber: 'NATA/LAG/IKJ/2023/0482',
    issueDate: '2022-06-18',
    status: 'VALID',
    trainingOfficerApprovedBy: 'Engr. K. Balogun',
    assessorApprovedBy: 'Assessor T. Fashola',
    certificationOfficerApprovedBy: 'State Certification Desk',
    stateSecretaryApprovedBy: 'Comrade S. Adebayo',
    stateChairmanApprovedBy: 'Alhaji (Engr.) J. Alade',
    qrPayloadUrl: 'https://api.natalagoscouncil.com.ng/api/v1/certificates/verify-public?cert=NATA-CERT-2022-4410',
    verificationHash: 'SHA256:4b22c1998ff1fe23a92dc18148a1d65dfc2d4b1fa3d677284addd200126d1112',
    pdfDownloadUrl: 'https://storage.natalagoscouncil.com.ng/certificates/NATA-CERT-2022-4410.pdf',
  },
];

export const MyCertificatesScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme, typography, spacing, layout } = useTheme();
  const [scannerOpen, setScannerOpen] = useState(false);

  return (
    <ScreenContainer scrollable={false}>
      {/* Header & QR Scanner Launcher */}
      <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.textPrimary, fontSize: typography.sizes.lg, fontWeight: typography.weights.bold }}>
            Official Certificates
          </Text>

          <Button
            title="Scan QR"
            onPress={() => setScannerOpen(true)}
            variant="outline"
            size="sm"
            icon={<QrCode size={16} color={theme.primary} style={{ marginRight: 4 }} />}
          />
        </View>
        <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 2 }}>
          Authoritative credentials awarded following governed multi-level approval.
        </Text>
      </View>

      <FlatList
        data={DEMO_CERTIFICATES}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        renderItem={({ item }) => (
          <Card
            variant="elevated"
            style={{ marginBottom: spacing.md }}
            onPress={() => navigation.navigate('CertificateDetail', { certificate: item })}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge label={item.status} variant="success" size="sm" />
              <Text style={{ color: theme.textMuted, fontSize: 11, fontWeight: '600' }}>
                {item.certificateNumber}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs }}>
              <Award size={20} color={theme.accentDark} style={{ marginRight: spacing.xs }} />
              <Text
                style={{
                  color: theme.textPrimary,
                  fontSize: typography.sizes.base,
                  fontWeight: typography.weights.bold,
                  flex: 1,
                }}
              >
                {item.title}
              </Text>
            </View>

            <Text style={{ color: theme.textSecondary, fontSize: typography.sizes.xs, marginTop: 4 }}>
              Trade: {item.trade}
            </Text>

            <View style={[styles.cardFooter, { borderTopColor: theme.border, marginTop: spacing.sm, paddingTop: spacing.xs }]}>
              <Text style={{ color: theme.textMuted, fontSize: 11 }}>
                Issued: {item.issueDate}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: theme.primary, fontSize: 11, fontWeight: '700', marginRight: 2 }}>
                  View Details
                </Text>
                <ChevronRight size={14} color={theme.primary} />
              </View>
            </View>
          </Card>
        )}
      />

      <CameraQRScanner visible={scannerOpen} onClose={() => setScannerOpen(false)} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
  },
});
