import { FlatList, StyleSheet, Text } from 'react-native';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import { theme } from '../theme';

const load = () => container.getOrmawaList.execute();

export function OrmawaScreen() {
  const { data, error } = useAsync(load);
  if (!data) return <Loading error={error} />;
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(o) => o.id}
      renderItem={({ item }) => (
        <Card>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.muted}>{item.description}</Text>
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: theme.bg },
  content: { padding: 16, gap: 12 },
  name: { fontSize: 17, fontWeight: '700', color: theme.text },
  muted: { color: theme.muted },
});
