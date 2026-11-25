export const theme = {
  primary: '#4F46E5',
  primarySoft: '#EEF2FF',
  bg: '#F8FAFC',
  card: '#FFFFFF',
  text: '#0F172A',
  muted: '#475569',
  border: '#E2E8F0',
  warning: '#B45309',
  danger: '#DC2626',
  skeleton: '#E2E8F0',
  onPrimary: '#FFFFFF',
};

// Skala 4/8.
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
export const radius = { md: 12, lg: 20, pill: 999 };
export const font = { xs: 12, sm: 14, md: 16, lg: 18, xl: 22, xxl: 28 };

export const shadow = {
  shadowColor: '#0F172A',
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
};

// Plus Jakarta Sans: React Native butuh satu nama font per bobot (fontWeight diabaikan).
export const fonts = {
  regular: 'PlusJakartaSans_400Regular',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
};
