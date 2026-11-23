import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import { dateTime, rupiah } from '../format';
import { theme } from '../theme';

export function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: event, error } = useAsync(
    // Event tidak ditemukan dijadikan error supaya tidak spinner selamanya.
    () => container.getEventById.execute(id).then((e) => { if (!e) throw new Error('Event tidak ditemukan'); return e; }),
  );
  if (!event) return <Loading error={error} />;
  const soldOut = event.categories.every((c) => c.stock === 0);
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.muted}>{dateTime(event.date)} · {event.location}</Text>
      <Text style={styles.text}>{event.description}</Text>
      <View style={styles.categories}>
        {event.categories.map((c) => (
          <Card key={c.id}>
            <Text style={styles.categoryName}>{c.name}</Text>
            <Text style={styles.text}>{rupiah(c.price)}</Text>
            <Text style={c.stock ? styles.muted : styles.danger}>
              {c.stock ? `Sisa ${c.stock}` : 'Habis'}
            </Text>
          </Card>
        ))}
      </View>
      <Button title={soldOut ? 'Tiket habis' : 'Beli Tiket'} disabled={soldOut} onPress={() => router.push(`/checkout/${event.id}`)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: theme.bg },
  content: { padding: 16, gap: 12 },
  title: { fontSize: 22, fontWeight: '700', color: theme.text },
  muted: { color: theme.muted },
  text: { color: theme.text },
  danger: { color: theme.danger },
  categories: { gap: 8 },
  categoryName: { fontWeight: '600', color: theme.text },
});
