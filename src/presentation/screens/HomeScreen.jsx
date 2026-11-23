import { useCallback, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { EventCard } from '../components/EventCard';
import { Loading } from '../components/Loading';
import { theme } from '../theme';

export function HomeScreen() {
  const [query, setQuery] = useState('');
  const [ormawaId, setOrmawaId] = useState(null);

  const load = useCallback(async () => {
    const [events, ormawa] = await Promise.all([
      container.searchEvents.execute({ query, ormawaId }),
      container.getOrmawaList.execute(),
    ]);
    const names = Object.fromEntries(ormawa.map((o) => [o.id, o.name]));
    return { ormawa, items: events.map((event) => ({ event, ormawaName: names[event.ormawaId] })) };
  }, [query, ormawaId]);

  // Data lama tetap tampil saat memuat ulang, jadi TextInput tidak ikut hilang.
  const { data, error } = useAsync(load);
  if (!data) return <Loading error={error} />;

  const chips = [{ id: null, name: 'Semua' }, ...data.ormawa];
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Cari event"
        value={query}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
        returnKeyType="search"
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll} contentContainerStyle={styles.chips}>
        {chips.map((c) => {
          const selected = c.id === ormawaId;
          return (
            <Pressable
              key={String(c.id)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setOrmawaId(c.id)}
              style={[styles.chip, selected && styles.chipSelected]}
            >
              <Text style={selected ? styles.chipTextSelected : styles.chipText}>{c.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <FlatList
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        data={data.items}
        keyExtractor={(item) => item.event.id}
        ListEmptyComponent={<Text style={styles.empty}>Tidak ada event yang cocok.</Text>}
        renderItem={({ item }) => (
          <EventCard {...item} onPress={() => router.push(`/event/${item.event.id}`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  search: {
    margin: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: theme.radius,
    backgroundColor: theme.card,
    color: theme.text,
  },
  chipsScroll: { flexGrow: 0 },
  chips: { paddingHorizontal: 16, paddingBottom: 8, gap: 8 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: theme.card },
  chipSelected: { backgroundColor: theme.primary },
  chipText: { color: theme.text },
  chipTextSelected: { color: '#fff', fontWeight: '600' },
  content: { padding: 16, gap: 12 },
  empty: { color: theme.muted, textAlign: 'center', marginTop: 32 },
});
