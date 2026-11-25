import { StyleSheet } from 'react-native';
import { Text } from './Text';
import { theme } from '../theme';

const LOW_STOCK = 10;

export function StockText({ stock }) {
  const style = stock === 0 ? styles.empty : stock <= LOW_STOCK ? styles.low : styles.ok;
  return <Text style={style}>{stock === 0 ? 'Habis' : `Sisa ${stock}`}</Text>;
}

const styles = StyleSheet.create({
  ok: { color: theme.muted },
  low: { color: theme.warning },
  empty: { color: theme.danger },
});
