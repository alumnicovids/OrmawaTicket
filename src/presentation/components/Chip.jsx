import { Pressable, StyleSheet, Text } from 'react-native';
import { font, radius, space, theme } from '../theme';

export function Chip({ label, selected, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip, selected && styles.selected]}
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
  text: { fontSize: font.sm, color: theme.text },
  textSelected: { color: theme.onPrimary, fontWeight: '600' },
});
