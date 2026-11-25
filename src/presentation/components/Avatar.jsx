import { StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { font, radius, theme, fonts } from '../theme';

// Warna dipilih dari nama; style disiapkan di StyleSheet agar tanpa inline style.
const colors = StyleSheet.create({
  c0: { backgroundColor: '#4F46E5' },
  c1: { backgroundColor: '#0891B2' },
  c2: { backgroundColor: '#C026D3' },
  c3: { backgroundColor: '#EA580C' },
  c4: { backgroundColor: '#16A34A' },
});

const initials = (name) =>
  name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export function Avatar({ name, large }) {
  const color = colors[`c${[...name].reduce((n, ch) => (n * 31 + ch.charCodeAt(0)) >>> 0, 0) % 5}`];
  return (
    <View style={[styles.base, large ? styles.large : styles.medium, color]}>
      <Text style={large ? styles.textLarge : styles.text}>{initials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', borderRadius: radius.md },
  medium: { width: 48, height: 48 },
  large: { width: 64, height: 64, borderRadius: radius.lg },
  text: { color: theme.onPrimary, fontSize: font.md, fontFamily: fonts.bold },
  textLarge: { color: theme.onPrimary, fontSize: font.xl, fontFamily: fonts.bold },
});
