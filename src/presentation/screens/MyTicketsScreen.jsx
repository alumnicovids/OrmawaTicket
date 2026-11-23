import { FlatList, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { Loading } from '../components/Loading';
import { TicketCard } from '../components/TicketCard';
import { theme } from '../theme';

const load = () => container.getMyTickets.execute();

export function MyTicketsScreen() {
  const { data, error } = useAsync(load);
  if (!data) return <Loading error={error} />;
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(t) => t.id}
      ListEmptyComponent={<Text style={styles.empty}>Belum ada tiket. Beli dari halaman Beranda.</Text>}
      renderItem={({ item }) => (
        <TicketCard ticket={item} onPress={() => router.push(`/ticket/${item.id}`)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: theme.bg },
  content: { padding: 16, gap: 12, flexGrow: 1 },
  empty: { color: theme.muted, textAlign: 'center', marginTop: 48 },
});
