import { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Calendar from 'lucide-react-native/icons/calendar';
import MapPin from 'lucide-react-native/icons/map-pin';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { Card } from '../components/Card';
import { EventPoster } from '../components/EventPoster';
import { IconText } from '../components/IconText';
import { Loading } from '../components/Loading';
import { Skeleton } from '../components/Skeleton';
import { StickyBar } from '../components/StickyBar';
import { StockText } from '../components/StockText';
import { dateTime, rupiah } from '../format';
import { font, space, theme } from '../theme';

function EventDetailSkeleton() {
  return (
    <View style={styles.container}>
      <Skeleton style={styles.posterSkeleton} />
      <View style={styles.body}>
        <Skeleton style={styles.lineShort} />
        <Skeleton style={styles.lineTitle} />
        <Skeleton style={styles.lineMedium} />
        <Skeleton style={styles.lineMedium} />
      </View>
    </View>
  );
}

export function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const load = useCallback(async () => {
    const [event, ormawa, categories] = await Promise.all([
      container.getEventById.execute(id),
      container.getOrmawaList.execute(),
      container.getEventCategories.execute(),
    ]);
    // Event tidak ditemukan dijadikan error supaya tidak skeleton selamanya.
    if (!event) throw new Error('Event tidak ditemukan');
    return {
      event,
      ormawaName: ormawa.find((o) => o.id === event.ormawaId)?.name,
      categoryName: categories.find((c) => c.id === event.category)?.name,
    };
  }, [id]);

  const { data, error } = useAsync(load);
  if (!data) return <Loading error={error} skeleton={<EventDetailSkeleton />} />;

  const { event, ormawaName, categoryName } = data;
  const soldOut = event.categories.every((c) => c.stock === 0);
  return (
    <View style={styles.container}>
      <ScrollView>
        <EventPoster uri={event.imageUrl} />
        <View style={styles.body}>
          <Text style={styles.ormawa}>{[ormawaName, categoryName].filter(Boolean).join(' · ')}</Text>
          <Text style={styles.title}>{event.title}</Text>
          <IconText icon={Calendar}>{dateTime(event.date)}</IconText>
          <IconText icon={MapPin}>{event.location}</IconText>

          <Text style={styles.section}>Tentang event</Text>
          <Text style={styles.text}>{event.description}</Text>

          <Text style={styles.section}>Kategori tiket</Text>
          {event.categories.map((c) => (
            <Card key={c.id}>
              <Text style={styles.categoryName}>{c.name}</Text>
              <Text style={styles.price}>{rupiah(c.price)}</Text>
              <StockText stock={c.stock} />
            </Card>
          ))}
        </View>
      </ScrollView>
      <StickyBar
        label="Mulai dari"
        value={rupiah(Math.min(...event.categories.map((c) => c.price)))}
        buttonTitle={soldOut ? 'Tiket habis' : 'Beli Tiket'}
        disabled={soldOut}
        onPress={() => router.push(`/checkout/${event.id}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  body: { padding: space.lg, gap: space.sm },
  ormawa: { fontSize: font.sm, fontWeight: '600', color: theme.primary },
  title: { fontSize: font.xxl, fontWeight: '700', color: theme.text },
  section: { fontSize: font.lg, fontWeight: '700', color: theme.text, marginTop: space.lg },
  text: { fontSize: font.md, color: theme.text, lineHeight: 24 },
  categoryName: { fontSize: font.md, fontWeight: '600', color: theme.text },
  price: { fontSize: font.lg, fontWeight: '700', color: theme.text },
  posterSkeleton: { aspectRatio: 16 / 9, borderRadius: 0 },
  lineShort: { height: 14, width: '30%' },
  lineTitle: { height: 28, width: '80%' },
  lineMedium: { height: 16, width: '55%' },
});
