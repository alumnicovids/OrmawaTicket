import { ScrollView, StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import { dateTime, rupiah } from '../format';
import { theme } from '../theme';

export function TicketDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: ticket, error } = useAsync(
    () => container.getTicketById.execute(id).then((t) => { if (!t) throw new Error('Tiket tidak ditemukan'); return t; }),
  );
  if (!ticket) return <Loading error={error} />;
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Card>
        <Text style={styles.muted}>Kode tiket</Text>
        <Text style={styles.code}>{ticket.id}</Text>
        <Text style={styles.event}>{ticket.eventTitle}</Text>
        <Text style={styles.text}>{ticket.categoryName} × {ticket.quantity}</Text>
        <Text style={styles.text}>Total {rupiah(ticket.totalPrice)}</Text>
        <Text style={styles.muted}>Dibeli {dateTime(ticket.purchasedAt)}</Text>
      </Card>
      <Button title="Lihat Tiket Saya" onPress={() => router.navigate('/tickets')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: theme.bg },
  content: { padding: 16, gap: 16 },
  muted: { color: theme.muted },
  text: { color: theme.text },
  code: { fontSize: 28, fontWeight: '800', color: theme.primary, letterSpacing: 2 },
  event: { fontSize: 18, fontWeight: '700', color: theme.text, marginTop: 12 },
});
