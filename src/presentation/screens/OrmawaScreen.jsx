import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from '../components/Text';
import { router } from 'expo-router';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { Avatar } from '../components/Avatar';
import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import { Skeleton } from '../components/Skeleton';
import { font, space, theme, fonts } from '../theme';

const load = async () => {
  const [ormawa, events] = await Promise.all([container.getOrmawaList.execute(), container.searchEvents.execute()]);
  return ormawa.map((o) => ({ ...o, eventCount: events.filter((e) => e.ormawaId === o.id).length }));
};

function OrmawaSkeleton() {
  return (
    <View style={styles.content}>
      {[0, 1, 2].map((i) => <Skeleton key={i} style={styles.skeleton} />)}
    </View>
  );
}

export function OrmawaScreen() {
  const { data, error, retry } = useAsync(load);
  if (!data) return <Loading error={error} onRetry={retry} skeleton={<OrmawaSkeleton />} />;
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(o) => o.id}
      renderItem={({ item }) => (
        <Card onPress={() => router.push(`/ormawa/${item.id}`)}>
          <View style={styles.row}>
            <Avatar name={item.name} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.muted} numberOfLines={2}>{item.description}</Text>
              <Text style={styles.count}>{item.eventCount} event</Text>
            </View>
          </View>
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: theme.bg },
  content: { padding: space.lg, gap: space.lg },
  row: { flexDirection: 'row', gap: space.md },
  info: { flex: 1, gap: space.xs },
  name: { fontSize: font.lg, fontFamily: fonts.bold, color: theme.text },
  muted: { fontSize: font.sm, color: theme.muted },
  count: { fontSize: font.xs, fontFamily: fonts.semibold, color: theme.primary },
  skeleton: { height: 96, borderRadius: 20 },
});
