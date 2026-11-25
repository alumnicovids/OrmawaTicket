import { StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { Button } from './Button';
import { font, space, theme } from '../theme';

// Error -> pesan + tombol coba lagi; selain itu kerangka layar, diumumkan "Memuat" ke pembaca layar.
export function Loading({ error, skeleton, onRetry }) {
  if (!error) {
    return (
      <View accessible accessibilityLabel="Memuat" accessibilityState={{ busy: true }} style={styles.fill}>
        {skeleton}
      </View>
    );
  }
  return (
    <View style={styles.error}>
      <Text accessibilityRole="alert" style={styles.message}>{error.message}</Text>
      {onRetry && <Button title="Coba lagi" variant="secondary" onPress={onRetry} />}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  error: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.lg, padding: space.xl },
  message: { color: theme.danger, fontSize: font.md, textAlign: 'center' },
});
