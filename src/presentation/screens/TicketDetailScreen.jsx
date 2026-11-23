import { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { container } from '../../di/container';
import { useAsync } from '../hooks/useAsync';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { Skeleton } from '../components/Skeleton';
import { dateTime, rupiah } from '../format';
import { font, radius, shadow, space, theme } from '../theme';

const NOTCH = 20;
const DASHES = Array.from({ length: 24 }, (_, i) => i);

function TicketSkeleton() {
  return (
    <View style={styles.content}>
      <Skeleton style={styles.skeleton} />
    </View>
  );
}

export function TicketDetailScreen() {
  const { id } = useLocalSearchParams();
  const load = useCallback(
    () => container.getTicketById.execute(id).then((t) => { if (!t) throw new Error('Tiket tidak ditemukan'); return t; }),
    [id],
  );
  const { data: ticket, error } = useAsync(load);
  if (!ticket) return <Loading error={error} skeleton={<TicketSkeleton />} />;
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.ticket}>
        <View style={styles.top}>
          <Text style={styles.status}>BERLAKU</Text>
          <Text style={styles.event}>{ticket.eventTitle}</Text>
          <Text style={styles.text}>{ticket.categoryName} × {ticket.quantity}</Text>
          <Text style={styles.text}>Total {rupiah(ticket.totalPrice)}</Text>
          <Text style={styles.muted}>Dibeli {dateTime(ticket.purchasedAt)}</Text>
        </View>

        <View style={styles.divider}>
          <View style={[styles.notch, styles.notchLeft]} />
          <View style={styles.dashes}>
            {DASHES.map((i) => <View key={i} style={styles.dash} />)}
          </View>
          <View style={[styles.notch, styles.notchRight]} />
        </View>

        <View style={styles.bottom}>
          <Text style={styles.muted}>Kode tiket</Text>
          <Text selectable style={styles.code}>{ticket.id}</Text>
        </View>
      </View>
      <Button title="Lihat Tiket Saya" variant="secondary" onPress={() => router.navigate('/tickets')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: theme.bg },
  content: { padding: space.lg, gap: space.xl },
  ticket: { borderRadius: radius.lg, backgroundColor: theme.card, ...shadow },
  top: { padding: space.xl, gap: space.xs },
  status: { alignSelf: 'flex-start', paddingVertical: space.xs, paddingHorizontal: space.md, borderRadius: radius.pill, overflow: 'hidden', backgroundColor: theme.primarySoft, color: theme.primary, fontSize: font.xs, fontWeight: '700' },
  event: { fontSize: font.xl, fontWeight: '700', color: theme.text, marginTop: space.sm },
  text: { fontSize: font.md, color: theme.text },
  muted: { fontSize: font.sm, color: theme.muted },
  divider: { height: NOTCH, justifyContent: 'center' },
  // Lubang karcis memakai warna latar layar.
  notch: { position: 'absolute', width: NOTCH, height: NOTCH, borderRadius: NOTCH / 2, backgroundColor: theme.bg },
  notchLeft: { left: -NOTCH / 2 },
  notchRight: { right: -NOTCH / 2 },
  // Garis putus-putus dari potongan kecil, karena borderStyle dashed tidak konsisten di Android.
  dashes: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: space.xl },
  dash: { width: 6, height: 2, backgroundColor: theme.border },
  bottom: { padding: space.xl, gap: space.xs, alignItems: 'center' },
  code: { fontSize: font.xxl, fontWeight: '800', color: theme.primary, letterSpacing: 3 },
  skeleton: { height: 320, borderRadius: 20 },
});
