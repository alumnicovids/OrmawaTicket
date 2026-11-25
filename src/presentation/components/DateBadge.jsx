import { StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { EVENT_TIME_ZONE } from '../format';
import { font, radius, space, theme, fonts } from '../theme';

export function DateBadge({ iso }) {
  const d = new Date(iso);
  const part = (opts) => d.toLocaleString('id-ID', { ...opts, timeZone: EVENT_TIME_ZONE });
  return (
    <View style={styles.badge}>
      <Text style={styles.day} maxFontSizeMultiplier={1.2}>{part({ day: 'numeric' })}</Text>
      <Text style={styles.month} maxFontSizeMultiplier={1.2}>{part({ month: 'short' }).toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: space.md,
    right: space.md,
    minWidth: 48,
    paddingVertical: space.xs,
    paddingHorizontal: space.sm,
    borderRadius: radius.md,
    backgroundColor: theme.card,
    alignItems: 'center',
  },
  day: { fontSize: font.lg, fontFamily: fonts.bold, color: theme.text },
  month: { fontSize: font.xs, fontFamily: fonts.semibold, color: theme.primary },
});
