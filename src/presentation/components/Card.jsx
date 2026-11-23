import { Pressable, StyleSheet, View } from 'react-native';
import { radius, shadow, space, theme } from '../theme';

export function Card({ onPress, children }) {
  if (!onPress) return <View style={styles.card}>{children}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: theme.card, borderRadius: radius.lg, padding: space.lg, gap: space.xs, ...shadow },
  pressed: { opacity: 0.9 },
});
