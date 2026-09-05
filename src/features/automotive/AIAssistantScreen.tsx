// Guarded AI Automotive Diagnostic Assistant

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Sparkles, Send, AlertTriangle, ShieldCheck, Wrench } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { automotiveApi } from '../../api/modules/automotive';
import { AIAssistantMessage } from '../../types';

export const AIAssistantScreen: React.FC = () => {
  const { theme, typography, spacing, layout } = useTheme();
  const [messages, setMessages] = useState<AIAssistantMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'AI',
      text: 'Hello Technician Babatunde. I am your NATA AI Diagnostic Assistant. You can describe vehicle symptoms, DTC fault combinations, or mechanical noise patterns to receive guided diagnostic testing procedures.',
      timestamp: new Date().toISOString(),
      safetyCaveat:
        '⚠️ Official Caveat: AI provides diagnostic recommendations only. All repairs must comply with vehicle OEM factory safety standards. The AI system does not grant certifications or official approvals.',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputPrompt.trim() || loading) return;

    const userMsg: AIAssistantMessage = {
      id: `usr_${Date.now()}`,
      sender: 'USER',
      text: inputPrompt.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const response = await automotiveApi.askAIAssistant(userMsg.text, messages);
      setMessages((prev) => [...prev, response]);
    } catch {
      // handled inside api client
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer scrollable={false}>
      {/* Header Caveat Banner */}
      <View
        style={[
          styles.caveatBanner,
          {
            backgroundColor: theme.warningBackground,
            borderColor: theme.warning,
            padding: spacing.xs + 2,
            marginBottom: spacing.xs,
          },
        ]}
      >
        <AlertTriangle size={14} color={theme.warning} style={{ marginRight: 6 }} />
        <Text style={{ color: theme.warning, fontSize: 10, flex: 1, fontWeight: '600' }}>
          Guarded Automotive Assistant • Diagnostic reference only. Does not replace professional technician judgment.
        </Text>
      </View>

      {/* Messages Thread */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.base }}
        renderItem={({ item }) => {
          const isUser = item.sender === 'USER';
          return (
            <View
              style={[
                styles.messageBubbleContainer,
                { alignItems: isUser ? 'flex-end' : 'flex-start' },
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  {
                    backgroundColor: isUser ? theme.primary : theme.surface,
                    borderColor: isUser ? theme.primary : theme.border,
                    borderRadius: layout.borderRadius.lg,
                  },
                ]}
              >
                {!isUser && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <Sparkles size={14} color={theme.primary} style={{ marginRight: 4 }} />
                    <Text style={{ color: theme.primary, fontSize: 11, fontWeight: '700' }}>
                      NATA Diagnostic AI
                    </Text>
                  </View>
                )}

                <Text
                  style={{
                    color: isUser ? '#FFFFFF' : theme.textPrimary,
                    fontSize: typography.sizes.sm,
                    lineHeight: 20,
                  }}
                >
                  {item.text}
                </Text>

                {item.safetyCaveat ? (
                  <View style={[styles.inlineCaveat, { borderTopColor: theme.border, marginTop: spacing.xs }]}>
                    <Text style={{ color: theme.textSecondary, fontSize: 10, fontStyle: 'italic' }}>
                      {item.safetyCaveat}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          );
        }}
      />

      {loading && (
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
          <ActivityIndicator size="small" color={theme.primary} />
          <Text style={{ color: theme.textSecondary, fontSize: 12, marginLeft: 8 }}>
            Analyzing diagnostic waveforms & technical bulletins...
          </Text>
        </View>
      )}

      {/* Message Input Box */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View
          style={[
            styles.inputRow,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              borderRadius: layout.borderRadius.full,
              paddingHorizontal: spacing.md,
              marginBottom: spacing.sm,
            },
          ]}
        >
          <TextInput
            placeholder="Ask about fault codes, sensor values, wiring..."
            placeholderTextColor={theme.textMuted}
            value={inputPrompt}
            onChangeText={setInputPrompt}
            onSubmitEditing={handleSend}
            style={[styles.inputField, { color: theme.textPrimary, fontSize: typography.sizes.sm }]}
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!inputPrompt.trim() || loading}
            style={[
              styles.sendButton,
              {
                backgroundColor: inputPrompt.trim() ? theme.primary : theme.surfaceSubtle,
              },
            ]}
          >
            <Send size={16} color={inputPrompt.trim() ? '#FFFFFF' : theme.textMuted} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  caveatBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  messageBubbleContainer: {
    marginVertical: 6,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 12,
    borderWidth: 1,
  },
  inlineCaveat: {
    borderTopWidth: 0.5,
    paddingTop: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: 48,
  },
  inputField: {
    flex: 1,
    paddingVertical: 4,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
