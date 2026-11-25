import { StyleSheet, Text, View } from 'react-native';
import { EVENT_TIME_ZONE } from '../format';
import { font, radius, space, theme } from '../theme';

export function DateBadge({ iso }) {
  const d = new Date(iso);
  const part = (opts) => d.toLocaleString('id-ID', { ...opts, timeZone: EVENT_TIME_ZONE });
  return (
    <View style={styles.badge}>
      <Text style={styles.day}>{part({ day: 'numeric' })}</Text>
      <Text style={styles.month}>{part({ month: 'short' }).toUpperCase()}</Text>
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
