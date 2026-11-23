import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from './Button';
import { font, space, theme } from '../theme';

// Bar bawah: label + nilai (mis. harga) di kiri, tombol CTA di kanan.
export function StickyBar({ label, value, buttonTitle, onPress, disabled }) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.bar}>
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        <Button title={buttonTitle} onPress={onPress} disabled={disabled} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bar: { backgroundColor: theme.card, borderTopWidth: 1, borderTopColor: theme.border },
  row: { flexDirection: 'row', alignItems: 'center', gap: space.lg, padding: space.lg },
  info: { flex: 1 },
  label: { fontSize: font.xs, color: theme.muted },
  value: { fontSize: font.lg, fontWeight: '700', color: theme.text },
  button: { minWidth: 140 },
});
