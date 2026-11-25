import { StyleSheet, Text, View } from 'react-native';
import { font, space, theme } from '../theme';

// Error -> pesan; selain itu kerangka layar (`skeleton`).
export function Loading({ error, skeleton }) {
  if (!error) return skeleton;
  return (
    <View style={styles.container}>
      <Text style={styles.error}>{error.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl },
  error: { color: theme.danger, fontSize: font.md },
});
