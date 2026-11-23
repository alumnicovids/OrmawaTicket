import { useCallback } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { Card } from '../components/Card';
import { EventCard } from '../components/EventCard';
import { Loading } from '../components/Loading';
import { theme } from '../theme';

export function OrmawaDetailScreen() {
  const { id } = useLocalSearchParams();
  const load = useCallback(async () => {
    const [ormawaList, events] = await Promise.all([
      container.getOrmawaList.execute(),
      container.searchEvents.execute({ ormawaId: id }),
    ]);
    const ormawa = ormawaList.find((o) => o.id === id);
    if (!ormawa) throw new Error('Ormawa tidak ditemukan');
    return { ormawa, events };
  }, [id]);

  const { data, error } = useAsync(load);
  if (!data) return <Loading error={error} />;

  const { ormawa, events } = data;
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={events}
      keyExtractor={(e) => e.id}
      ListHeaderComponent={
        <Card>
          <Text style={styles.name}>{ormawa.name}</Text>
          <Text style={styles.muted}>{ormawa.description}</Text>
          <Text style={styles.section}>Event ({events.length})</Text>
        </Card>
      }
      ListEmptyComponent={<Text style={styles.empty}>Belum ada event.</Text>}
      renderItem={({ item }) => (
        <EventCard event={item} ormawaName={ormawa.name} onPress={() => router.push(`/event/${item.id}`)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: theme.bg },
  content: { padding: 16, gap: 12 },
  name: { fontSize: 20, fontWeight: '700', color: theme.text },
  muted: { color: theme.muted },
  section: { fontWeight: '600', color: theme.text, marginTop: 8 },
  empty: { color: theme.muted, textAlign: 'center' },
});
