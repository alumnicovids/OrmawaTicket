import { StyleSheet, Text } from 'react-native';
import { Card } from './Card';
import { dateTime, rupiah } from '../format';
import { theme } from '../theme';

export function TicketCard({ ticket, onPress }) {
  return (
    <Card onPress={onPress}>
      <Text style={styles.title}>{ticket.eventTitle}</Text>
      <Text style={styles.muted}>{ticket.id} · {ticket.categoryName} × {ticket.quantity}</Text>
      <Text style={styles.text}>{rupiah(ticket.totalPrice)}</Text>
      <Text style={styles.muted}>Dibeli {dateTime(ticket.purchasedAt)}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 17, fontWeight: '700', color: theme.text },
  muted: { color: theme.muted },
  text: { color: theme.text },
});
