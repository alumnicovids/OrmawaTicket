import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapPin from 'lucide-react-native/icons/map-pin';
import { DateBadge } from './DateBadge';
import { EventPoster } from './EventPoster';
import { IconText } from './IconText';
import { Skeleton } from './Skeleton';
import { rupiah } from '../format';
import { font, radius, shadow, space, theme } from '../theme';

export function EventCard({ event, ormawaName, categoryName, featured, onPress }) {
  const minPrice = Math.min(...event.categories.map((c) => c.price));
  const soldOut = event.categories.every((c) => c.stock === 0);
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.shadow, pressed && styles.pressed]}
    >
      <View style={styles.card}>
        <EventPoster uri={event.imageUrl}>
          <DateBadge iso={event.date} />
        </EventPoster>
        <View style={styles.body}>
          <Text style={styles.ormawa}>{[ormawaName, categoryName].filter(Boolean).join(' · ')}</Text>
          <Text style={featured ? styles.titleFeatured : styles.title} numberOfLines={2}>{event.title}</Text>
          <IconText icon={MapPin}>{event.location}</IconText>
          <Text style={soldOut ? styles.soldOut : styles.price}>
            {soldOut ? 'Tiket habis' : `Mulai ${rupiah(minPrice)}`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export function EventCardSkeleton() {
  return (
    <View style={styles.shadow}>
      <View style={styles.card}>
        <Skeleton style={styles.posterSkeleton} />
        <View style={styles.body}>
          <Skeleton style={styles.lineShort} />
          <Skeleton style={styles.lineLong} />
          <Skeleton style={styles.lineMedium} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: { borderRadius: radius.lg, backgroundColor: theme.card, ...shadow },
  card: { borderRadius: radius.lg, overflow: 'hidden', backgroundColor: theme.card },
  pressed: { opacity: 0.92 },
  body: { padding: space.lg, gap: space.xs },
  ormawa: { fontSize: font.xs, fontWeight: '600', color: theme.primary },
  title: { fontSize: font.lg, fontWeight: '700', color: theme.text },
  titleFeatured: { fontSize: font.xl, fontWeight: '700', color: theme.text },
  price: { marginTop: space.xs, fontSize: font.md, fontWeight: '700', color: theme.text },
  soldOut: { marginTop: space.xs, fontSize: font.md, fontWeight: '700', color: theme.danger },
  posterSkeleton: { aspectRatio: 16 / 9, borderRadius: 0 },
  lineShort: { height: 12, width: '30%' },
  lineLong: { height: 20, width: '80%', marginVertical: space.xs },
  lineMedium: { height: 14, width: '50%' },
});
