import { Pressable, StyleSheet, Text } from 'react-native';
import { font, radius, space, theme } from '../theme';

// variant: 'primary' (default) | 'secondary'
export function Button({ title, onPress, disabled, variant = 'primary', style }) {
  const secondary = variant === 'secondary';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      android_ripple={{ color: secondary ? theme.border : '#ffffff33' }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary ? styles.secondary : styles.primary,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={secondary ? styles.secondaryText : styles.primaryText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: space.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  primary: { backgroundColor: theme.primary },
  secondary: { backgroundColor: theme.primarySoft },
  pressed: { opacity: 0.85 },
  disabled: { opacity: 0.4 },
  primaryText: { color: theme.onPrimary, fontSize: font.md, fontWeight: '600' },
  secondaryText: { color: theme.primary, fontSize: font.md, fontWeight: '600' },
});
