import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from '../components/Text';
import { router } from 'expo-router';
import Ticket from 'lucide-react-native/icons/ticket';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { Loading } from '../components/Loading';
import { TicketCard, TicketCardSkeleton } from '../components/TicketCard';
import { font, space, theme, fonts } from '../theme';

const load = () => container.getMyTickets.execute();

function TicketsSkeleton() {
  return (
    <View style={styles.content}>
      <TicketCardSkeleton />
      <TicketCardSkeleton />
    </View>
  );
}

export function MyTicketsScreen() {
  const { data, error, retry } = useAsync(load);
  if (!data) return <Loading error={error} onRetry={retry} skeleton={<TicketsSkeleton />} />;
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(t) => t.id}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ticket color={theme.muted} size={40} />
          <Text style={styles.emptyTitle}>Belum ada tiket</Text>
          <Text style={styles.emptyText}>Tiket yang kamu beli akan muncul di sini.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <TicketCard ticket={item} onPress={() => router.push(`/ticket/${item.id}`)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: theme.bg },
  content: { padding: space.lg, gap: space.lg, flexGrow: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.sm, paddingTop: space.xxl },
  emptyTitle: { fontSize: font.lg, fontFamily: fonts.bold, color: theme.text },
  emptyText: { fontSize: font.sm, color: theme.muted },
});
