import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { Avatar } from '../components/Avatar';
import { EventCard, EventCardSkeleton } from '../components/EventCard';
import { Loading } from '../components/Loading';
import { Skeleton } from '../components/Skeleton';
import { font, space, theme } from '../theme';

function OrmawaDetailSkeleton() {
  return (
    <View style={styles.content}>
      <Skeleton style={styles.headerSkeleton} />
      <EventCardSkeleton />
    </View>
  );
}

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
  if (!data) return <Loading error={error} skeleton={<OrmawaDetailSkeleton />} />;

  const { ormawa, events } = data;
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={events}
      keyExtractor={(e) => e.id}
      ListHeaderComponent={
        <View style={styles.header}>
          <Avatar name={ormawa.name} large />
          <Text style={styles.name}>{ormawa.name}</Text>
          <Text style={styles.muted}>{ormawa.description}</Text>
          <Text style={styles.section}>Event ({events.length})</Text>
        </View>
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
  content: { padding: space.lg, gap: space.lg },
  header: { gap: space.sm },
  name: { fontSize: font.xl, fontWeight: '700', color: theme.text },
  muted: { fontSize: font.md, color: theme.muted },
  section: { fontSize: font.lg, fontWeight: '700', color: theme.text, marginTop: space.md },
  empty: { color: theme.muted, textAlign: 'center' },
  headerSkeleton: { height: 140, borderRadius: 20 },
});
