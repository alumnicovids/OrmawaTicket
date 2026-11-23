import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../theme';

export function Card({ onPress, children }) {
  if (!onPress) return <View style={styles.card}>{children}</View>;
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.card}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: theme.card, borderRadius: theme.radius, padding: 16, gap: 4 },
});
