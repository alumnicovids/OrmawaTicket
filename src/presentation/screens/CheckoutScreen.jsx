import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { StockText } from '../components/StockText';
import { rupiah } from '../format';
import { theme } from '../theme';

export function CheckoutScreen() {
  const { eventId } = useLocalSearchParams();
  const { data: event, error } = useAsync(
    () => container.getEventById.execute(eventId).then((e) => { if (!e) throw new Error('Event tidak ditemukan'); return e; }),
  );
  const [categoryId, setCategoryId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buyError, setBuyError] = useState(null);
  if (!event) return <Loading error={error} />;

  const category = event.categories.find((c) => c.id === categoryId);

  const buy = async () => {
    try {
      const ticket = await container.purchaseTicket.execute({ eventId, categoryId, quantity });
      router.replace(`/ticket/${ticket.id}`);
    } catch (e) {
      setBuyError(e.message);
    }
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.label}>Pilih kategori</Text>
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
            <Text style={styles.text}>{c.name} · {rupiah(c.price)}</Text>
            <StockText stock={c.stock} />
          </Pressable>
        );
      })}

      {category && (
        <>
          <Text style={styles.label}>Jumlah</Text>
          <View style={styles.stepper}>
            <Button title="−" disabled={quantity <= 1} onPress={() => setQuantity(quantity - 1)} />
            <Text style={styles.quantity}>{quantity}</Text>
            <Button title="+" disabled={quantity >= category.stock} onPress={() => setQuantity(quantity + 1)} />
          </View>
          <Text style={styles.total}>Total {rupiah(category.price * quantity)}</Text>
        </>
      )}

      {buyError && <Text style={styles.danger}>{buyError}</Text>}
      <Button title="Bayar" disabled={!category} onPress={buy} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: theme.bg },
  content: { padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: '700', color: theme.text },
  label: { fontWeight: '600', color: theme.text },
  text: { color: theme.text },
  danger: { color: theme.danger },
  option: {
    padding: 14,
    borderRadius: theme.radius,
    backgroundColor: theme.card,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: { borderColor: theme.primary },
  optionDisabled: { opacity: 0.5 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  quantity: { fontSize: 18, color: theme.text },
  total: { fontSize: 18, fontWeight: '700', color: theme.text },
});
