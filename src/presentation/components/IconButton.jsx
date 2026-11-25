import { Pressable, StyleSheet } from 'react-native';
import { radius, theme } from '../theme';

export function IconButton({ icon: Icon, label, onPress, disabled }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, disabled && styles.disabled, pressed && styles.pressed]}
    >
      <Icon color={theme.primary} size={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: theme.primarySoft,
  },
  disabled: { opacity: 0.4 },
  pressed: { opacity: 0.7 },
});
