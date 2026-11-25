import { useCallback, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Text } from '../components/Text';
import { router } from 'expo-router';
import Search from 'lucide-react-native/icons/search';
import X from 'lucide-react-native/icons/x';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { EventCard, EventCardSkeleton } from '../components/EventCard';
import { Loading } from '../components/Loading';
import { categoryLabel } from '../format';
import { font, fonts, radius, space, theme } from '../theme';

function HomeSkeleton() {
  return (
    <View style={styles.content}>
      <EventCardSkeleton />
      <EventCardSkeleton />
    </View>
  );
}

export function HomeScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);

  const load = useCallback(async () => {
    const [events, ormawa, categories] = await Promise.all([
      container.searchEvents.execute({ query, category }),
      container.getOrmawaList.execute(),
      container.getEventCategories.execute(),
    ]);
    const ormawaNames = Object.fromEntries(ormawa.map((o) => [o.id, o.name]));
    return {
      categories,
      items: events.map((event) => ({
        event,
        ormawaName: ormawaNames[event.ormawaId],
        categoryName: categoryLabel(event.categoryIds, categories),
      })),
    };
  }, [query, category]);

  // Data lama tetap tampil saat memuat ulang, jadi TextInput tidak ikut hilang.
  const { data, error, retry } = useAsync(load);
  if (!data) return <Loading error={error} onRetry={retry} skeleton={<HomeSkeleton />} />;

  const chips = [{ id: null, name: 'Semua' }, ...data.categories];
  const filtering = Boolean(query.trim()) || category !== null;
  const reset = () => { setQuery(''); setCategory(null); };
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Search color={theme.muted} size={18} />
        <TextInput
          style={styles.search}
          placeholder="Cari event"
          placeholderTextColor={theme.muted}
          accessibilityLabel="Cari event"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
        />
        {query !== '' && (
          <Pressable accessibilityRole="button" accessibilityLabel="Hapus pencarian" hitSlop={12} onPress={() => setQuery('')}>
            <X color={theme.muted} size={18} />
          </Pressable>
        )}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll} contentContainerStyle={styles.chips}>
        {chips.map((c) => (
          <Chip key={String(c.id)} label={c.name} selected={c.id === category} onPress={() => setCategory(c.id)} />
        ))}
      </ScrollView>
      <FlatList
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        data={data.items}
        keyExtractor={(item) => item.event.id}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Tidak ada event yang cocok.</Text>
            {filtering && <Button title="Reset filter" variant="secondary" onPress={reset} />}
          </View>
        }
        renderItem={({ item, index }) => (
          <EventCard
            {...item}
            featured={index === 0 && !filtering}
            onPress={() => router.push(`/event/${item.event.id}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
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
  search: { flex: 1, minHeight: 48, fontSize: font.md, color: theme.text, fontFamily: fonts.regular },
  chipsScroll: { flexGrow: 0, flexShrink: 0 },
  chips: { paddingHorizontal: space.lg, paddingBottom: space.md, gap: space.sm },
  content: { padding: space.lg, gap: space.lg },
  empty: { alignItems: 'center', gap: space.lg, marginTop: space.xxl },
  emptyText: { color: theme.muted, fontSize: font.md },
});
