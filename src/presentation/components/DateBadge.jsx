import { StyleSheet, Text, View } from 'react-native';
import { font, radius, space, theme } from '../theme';

export function DateBadge({ iso }) {
  const d = new Date(iso);
  return (
    <View style={styles.badge}>
      <Text style={styles.day}>{d.getDate()}</Text>
      <Text style={styles.month}>{d.toLocaleString('id-ID', { month: 'short' }).toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: space.md,
    left: space.md,
    minWidth: 48,
    paddingVertical: space.xs,
    paddingHorizontal: space.sm,
    borderRadius: radius.md,
    backgroundColor: theme.card,
    alignItems: 'center',
  },
  day: { fontSize: font.lg, fontWeight: '700', color: theme.text },
  month: { fontSize: font.xs, fontWeight: '600', color: theme.primary },
});
