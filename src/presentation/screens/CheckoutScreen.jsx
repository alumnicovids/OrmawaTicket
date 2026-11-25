import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '../components/Text';
import { router, useLocalSearchParams } from 'expo-router';
import Calendar from 'lucide-react-native/icons/calendar';
import MapPin from 'lucide-react-native/icons/map-pin';
import Minus from 'lucide-react-native/icons/minus';
import Plus from 'lucide-react-native/icons/plus';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { IconButton } from '../components/IconButton';
import { IconText } from '../components/IconText';
import { Loading } from '../components/Loading';
import { Skeleton } from '../components/Skeleton';
import { StickyBar } from '../components/StickyBar';
import { StockText } from '../components/StockText';
import { dateTime, rupiah } from '../format';
import { font, radius, space, theme, fonts } from '../theme';

function CheckoutSkeleton() {
  return (
    <View style={styles.body}>
      <Skeleton style={styles.lineTitle} />
      <Skeleton style={styles.option} />
      <Skeleton style={styles.option} />
    </View>
  );
}

export function CheckoutScreen() {
  const { eventId, category: initialCategory } = useLocalSearchParams();
  const load = useCallback(
    () => container.getEventById.execute(eventId).then((e) => { if (!e) throw new Error('Event tidak ditemukan'); return e; }),
    [eventId],
  );
  const { data: event, error, retry } = useAsync(load);
  const [categoryId, setCategoryId] = useState(initialCategory ?? null);
  const [quantity, setQuantity] = useState(1);
  const [buyError, setBuyError] = useState(null);
  const [paying, setPaying] = useState(false);
  if (!event) return <Loading error={error} onRetry={retry} skeleton={<CheckoutSkeleton />} />;

  const category = event.categories.find((c) => c.id === categoryId);

  const buy = async () => {
    setPaying(true);
    try {
      const ticket = await container.purchaseTicket.execute({ eventId, categoryId, quantity });
      router.replace(`/ticket/${ticket.id}?new=1`);
    } catch (e) {
      setBuyError(e.message);
      setPaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>{event.title}</Text>
        <IconText icon={Calendar}>{dateTime(event.date)}</IconText>
        <IconText icon={MapPin}>{event.location}</IconText>
        <Text style={styles.section}>Pilih kategori</Text>
        {event.categories.map((c) => {
          const selected = c.id === categoryId;
          return (
            <Pressable
              key={c.id}
              accessibilityRole="radio"
              accessibilityState={{ selected, disabled: c.stock === 0 }}
              disabled={c.stock === 0}
              onPress={() => { setCategoryId(c.id); setQuantity(1); setBuyError(null); }}
              style={[styles.option, selected && styles.optionSelected, c.stock === 0 && styles.optionDisabled]}
            >
              <View style={[styles.radio, selected && styles.radioSelected]}>
                {selected && <View style={styles.radioDot} />}
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionName}>{c.name}</Text>
                <StockText stock={c.stock} />
              </View>
              <Text style={styles.optionPrice}>{rupiah(c.price)}</Text>
            </Pressable>
          );
        })}

        {category && (
          <>
            <Text style={styles.section}>Jumlah</Text>
            <View style={styles.stepper}>
              <IconButton icon={Minus} label="Kurangi jumlah" disabled={quantity <= 1} onPress={() => setQuantity(quantity - 1)} />
              <Text accessibilityLiveRegion="polite" style={styles.quantity}>{quantity}</Text>
              <IconButton icon={Plus} label="Tambah jumlah" disabled={quantity >= category.stock} onPress={() => setQuantity(quantity + 1)} />
            </View>
          </>
        )}

        {buyError && <Text accessibilityRole="alert" style={styles.error}>{buyError}</Text>}
      </ScrollView>
      <StickyBar
        label={category ? 'Total' : 'Pilih kategori tiket dulu'}
        value={category ? rupiah(category.price * quantity) : '–'}
        buttonTitle={paying ? 'Memproses…' : 'Bayar'}
        disabled={!category || paying}
        onPress={buy}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },
  body: { padding: space.lg, gap: space.md },
  title: { fontSize: font.xl, fontFamily: fonts.bold, color: theme.text },
  section: { fontSize: font.lg, fontFamily: fonts.bold, color: theme.text, marginTop: space.sm },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: space.lg,
    borderRadius: radius.lg,
    backgroundColor: theme.card,
    borderWidth: 2,
    borderColor: theme.border,
  },
  optionSelected: { borderColor: theme.primary, backgroundColor: theme.primarySoft },
  optionDisabled: { opacity: 0.5 },
  optionInfo: { flex: 1, gap: space.xs },
  optionName: { fontSize: font.md, fontFamily: fonts.semibold, color: theme.text },
  optionPrice: { fontSize: font.md, fontFamily: fonts.bold, color: theme.text },
  radio: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: theme.muted,
  },
  radioSelected: { borderColor: theme.primary },
  radioDot: { width: 10, height: 10, borderRadius: radius.pill, backgroundColor: theme.primary },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: space.xl },
  quantity: { minWidth: 32, textAlign: 'center', fontSize: font.xl, fontFamily: fonts.bold, color: theme.text },
  error: { color: theme.danger, fontSize: font.sm },
  lineTitle: { height: 28, width: '70%' },
});
