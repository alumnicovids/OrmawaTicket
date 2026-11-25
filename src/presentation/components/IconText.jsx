import { StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { font, space, theme } from '../theme';

// `icon` = komponen ikon lucide.
export function IconText({ icon: Icon, children }) {
  return (
    <View style={styles.row}>
      <Icon color={theme.muted} size={16} />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  text: { flexShrink: 1, fontSize: font.sm, color: theme.muted },
});
