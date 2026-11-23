import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

// Tampilkan spinner, atau pesan error jika `error` ada.
export function Loading({ error }) {
  return (
    <View style={styles.container}>
      {error ? <Text style={styles.error}>{error.message}</Text> : <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  error: { color: theme.danger },
});
