import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { font, space, theme } from '../theme';

// Error -> pesan; kalau ada `skeleton` -> kerangka layar; selain itu spinner.
export function Loading({ error, skeleton }) {
  if (!error && skeleton) return skeleton;
  return (
    <View style={styles.container}>
      {error ? <Text style={styles.error}>{error.message}</Text> : <ActivityIndicator />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl },
  error: { color: theme.danger, fontSize: font.md },
});
