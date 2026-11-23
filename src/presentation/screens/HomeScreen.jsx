import { useCallback, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Search from 'lucide-react-native/icons/search';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { Chip } from '../components/Chip';
import { EventCard, EventCardSkeleton } from '../components/EventCard';
import { Loading } from '../components/Loading';
import { font, radius, space, theme } from '../theme';

function HomeSkeleton() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Text style={styles.title}>Temukan event kampus</Text>
      <View style={styles.content}>
        <EventCardSkeleton />
        <EventCardSkeleton />
      </View>
    </SafeAreaView>
  );
}

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
  if (!data) return <Loading error={error} skeleton={<HomeSkeleton />} />;

  const chips = [{ id: null, name: 'Semua' }, ...data.ormawa];
  const filtering = Boolean(query.trim()) || ormawaId !== null;
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <Text style={styles.title}>Temukan event kampus</Text>
      <View style={styles.searchBox}>
        <Search color={theme.muted} size={18} />
        <TextInput
          style={styles.search}
          placeholder="Cari event"
          placeholderTextColor={theme.muted}
          accessibilityLabel="Cari event"
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll} contentContainerStyle={styles.chips}>
        {chips.map((c) => (
          <Chip key={String(c.id)} label={c.name} selected={c.id === ormawaId} onPress={() => setOrmawaId(c.id)} />
        ))}
      </ScrollView>
      <FlatList
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        data={data.items}
        keyExtractor={(item) => item.event.id}
        ListEmptyComponent={<Text style={styles.empty}>Tidak ada event yang cocok.</Text>}
        renderItem={({ item, index }) => (
          <EventCard
            {...item}
            featured={index === 0 && !filtering}
            onPress={() => router.push(`/event/${item.event.id}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  title: { fontSize: font.xxl, fontWeight: '700', color: theme.text, paddingHorizontal: space.lg, paddingTop: space.lg },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    margin: space.lg,
    marginBottom: space.md,
    paddingHorizontal: space.lg,
    borderRadius: radius.pill,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
  },
  search: { flex: 1, minHeight: 48, fontSize: font.md, color: theme.text },
  chipsScroll: { flexGrow: 0, flexShrink: 0 },
  chips: { paddingHorizontal: space.lg, paddingBottom: space.md, gap: space.sm },
  content: { padding: space.lg, gap: space.lg },
  empty: { color: theme.muted, textAlign: 'center', marginTop: space.xxl },
});
