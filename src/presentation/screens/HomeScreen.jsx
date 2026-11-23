import { FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { EventCard } from '../components/EventCard';
import { Loading } from '../components/Loading';
import { theme } from '../theme';

const load = async () => {
  const [events, ormawa] = await Promise.all([container.getEvents.execute(), container.getOrmawaList.execute()]);
  const names = Object.fromEntries(ormawa.map((o) => [o.id, o.name]));
  return events.map((event) => ({ event, ormawaName: names[event.ormawaId] }));
};

export function HomeScreen() {
  const { data, error } = useAsync(load);
  if (!data) return <Loading error={error} />;
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(item) => item.event.id}
      renderItem={({ item }) => (
        <EventCard {...item} onPress={() => router.push(`/event/${item.event.id}`)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: theme.bg },
  content: { padding: 16, gap: 12 },
});
