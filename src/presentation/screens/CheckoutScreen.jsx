import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Minus from 'lucide-react-native/icons/minus';
import Plus from 'lucide-react-native/icons/plus';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { IconButton } from '../components/IconButton';
import { Loading } from '../components/Loading';
import { Skeleton } from '../components/Skeleton';
import { StickyBar } from '../components/StickyBar';
import { StockText } from '../components/StockText';
import { rupiah } from '../format';
import { font, radius, space, theme } from '../theme';

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
  const { eventId } = useLocalSearchParams();
  const load = useCallback(
    () => container.getEventById.execute(eventId).then((e) => { if (!e) throw new Error('Event tidak ditemukan'); return e; }),
    [eventId],
  );
  const { data: event, error } = useAsync(load);
  const [categoryId, setCategoryId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buyError, setBuyError] = useState(null);
  const [paying, setPaying] = useState(false);
  if (!event) return <Loading error={error} skeleton={<CheckoutSkeleton />} />;

  const category = event.categories.find((c) => c.id === categoryId);

  const buy = async () => {
    setPaying(true);
    try {
      const ticket = await container.purchaseTicket.execute({ eventId, categoryId, quantity });
      router.replace(`/ticket/${ticket.id}`);
    } catch (e) {
      setBuyError(e.message);
      setPaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>{event.title}</Text>
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
        label="Total"
        value={rupiah(category ? category.price * quantity : 0)}
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
  title: { fontSize: font.xl, fontWeight: '700', color: theme.text },
  section: { fontSize: font.lg, fontWeight: '700', color: theme.text, marginTop: space.sm },
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
  optionName: { fontSize: font.md, fontWeight: '600', color: theme.text },
  optionPrice: { fontSize: font.md, fontWeight: '700', color: theme.text },
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
  quantity: { minWidth: 32, textAlign: 'center', fontSize: font.xl, fontWeight: '700', color: theme.text },
  error: { color: theme.danger, fontSize: font.sm },
  lineTitle: { height: 28, width: '70%' },
});
