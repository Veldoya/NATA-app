// NATA Lagos State Council - Official Brand Theme & Color Palette

export const colors = {
  light: {
    // Primary NATA Greens
    primary: '#0D5C3A', // NATA Deep Forest Green
    primaryDark: '#083E26',
    primaryLight: '#E8F5EE',
    primaryMuted: '#1E8254',

    // Secondary Accents / Gold & Amber
    accent: '#D97706', // Guild Gold / Amber
    accentLight: '#FEF3C7',
    accentDark: '#B45309',

    // Surfaces & Backgrounds
    background: '#F8FAFC', // Slate 50
    surface: '#FFFFFF',
    surfaceSubtle: '#F1F5F9', // Slate 100
    card: '#FFFFFF',
    cardElevated: '#FFFFFF',

    // Text & Content
    textPrimary: '#0F172A', // Slate 900
    textSecondary: '#475569', // Slate 600
    textMuted: '#94A3B8', // Slate 400
    textInverse: '#FFFFFF',

    // Borders & Dividers
    border: '#E2E8F0', // Slate 200
    borderStrong: '#CBD5E1', // Slate 300
    divider: '#F1F5F9',

    // Semantic Status
    success: '#16A34A',
    successBackground: '#DCFCE7',
    warning: '#D97706',
    warningBackground: '#FEF3C7',
    error: '#DC2626',
    errorBackground: '#FEE2E2',
    info: '#2563EB',
    infoBackground: '#DBEAFE',

    // Workspace indicators
    officerBadge: '#4338CA', // Indigo for Officer
    officerBadgeBg: '#EEF2FF',
    workerBadge: '#0D5C3A',
    workerBadgeBg: '#E8F5EE',

    // Special
    overlay: 'rgba(15, 23, 42, 0.6)',
    shadow: 'rgba(15, 23, 42, 0.08)',
  },
  dark: {
    // Primary NATA Greens
    primary: '#10B981', // Emerald 500 for high dark mode contrast
    primaryDark: '#059669',
    primaryLight: '#064E3B',
    primaryMuted: '#34D399',

    // Secondary Accents / Gold & Amber
    accent: '#F59E0B',
    accentLight: '#78350F',
    accentDark: '#D97706',

    // Surfaces & Backgrounds
    background: '#0B1120', // Night Slate
    surface: '#1E293B',
    surfaceSubtle: '#334155',
    card: '#1E293B',
    cardElevated: '#24334C',

    // Text & Content
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textInverse: '#0F172A',

    // Borders & Dividers
    border: '#334155',
    borderStrong: '#475569',
    divider: '#1E293B',

    // Semantic Status
    success: '#22C55E',
    successBackground: '#052E16',
    warning: '#FBBF24',
    warningBackground: '#451A03',
    error: '#F87171',
    errorBackground: '#450A0A',
    info: '#60A5FA',
    infoBackground: '#172554',

    // Workspace indicators
    officerBadge: '#818CF8',
    officerBadgeBg: '#312E81',
    workerBadge: '#34D399',
    workerBadgeBg: '#064E3B',

    // Special
    overlay: 'rgba(0, 0, 0, 0.8)',
    shadow: 'rgba(0, 0, 0, 0.4)',
  },
};

export type ColorTheme = typeof colors.light;
