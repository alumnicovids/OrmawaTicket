import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../theme';

export function Button({ title, onPress, disabled }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: theme.primary, borderRadius: theme.radius, padding: 14, alignItems: 'center' },
  disabled: { opacity: 0.5 },
  title: { color: '#fff', fontWeight: '600' },
});
