import { StyleSheet, Text } from 'react-native';
import { Card } from './Card';
import { dateTime, rupiah } from '../format';
import { theme } from '../theme';

export function EventCard({ event, ormawaName, onPress }) {
  const minPrice = Math.min(...event.categories.map((c) => c.price));
  return (
    <Card onPress={onPress}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.ormawa}>{ormawaName}</Text>
      <Text style={styles.muted}>{dateTime(event.date)} · {event.location}</Text>
      <Text style={styles.text}>Mulai {rupiah(minPrice)}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 17, fontWeight: '700', color: theme.text },
  ormawa: { color: theme.primary },
  muted: { color: theme.muted },
  text: { color: theme.text },
});
