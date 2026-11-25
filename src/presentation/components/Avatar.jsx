import { StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { accents, font, radius, theme, fonts } from '../theme';

// Warna dipilih dari nama; style disiapkan di StyleSheet agar tanpa inline style.
const colors = StyleSheet.create(
  Object.fromEntries(accents.map((c, i) => [`c${i}`, { backgroundColor: c }])),
);

const initials = (name) =>
  name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

export function Avatar({ name, large }) {
  const color = colors[`c${[...name].reduce((n, ch) => (n * 31 + ch.charCodeAt(0)) >>> 0, 0) % accents.length}`];
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
