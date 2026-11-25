import { Pressable, StyleSheet } from 'react-native';
import { Text } from './Text';
import { font, radius, space, theme, fonts } from '../theme';

export function Chip({ label, selected, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.chip, selected && styles.selected, pressed && styles.pressed]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: space.lg,
    borderRadius: radius.pill,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },
  selected: { backgroundColor: theme.primary, borderColor: theme.primary },
  pressed: { opacity: 0.7 },
  text: { fontSize: font.sm, color: theme.text },
  textSelected: { color: theme.onPrimary, fontFamily: fonts.semibold },
});
