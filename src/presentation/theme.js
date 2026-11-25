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
  rippleOnPrimary: '#FFFFFF33',
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

// Aksen avatar ormawa (dipilih dari hash nama).
export const accents = ['#4F46E5', '#0891B2', '#C026D3', '#EA580C', '#16A34A'];

// Warna poster per kategori event: [dasar, aksen]. Cukup gelap agar teks putih terbaca (>= 4.5:1).
export const posterColors = {
  musik: ['#4338CA', '#7C3AED'],
  seminar: ['#0E7490', '#1D4ED8'],
  lomba: ['#C2410C', '#B91C1C'],
  festival: ['#A21CAF', '#BE185D'],
};

// Lingkaran putih dekoratif di poster.
export const posterOverlay = { strong: 'rgba(255,255,255,0.12)', soft: 'rgba(255,255,255,0.08)' };
