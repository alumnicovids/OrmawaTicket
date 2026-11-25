import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '../components/Text';
import { router, useLocalSearchParams } from 'expo-router';
import Calendar from 'lucide-react-native/icons/calendar';
import Check from 'lucide-react-native/icons/check';
import MapPin from 'lucide-react-native/icons/map-pin';
import { container } from '../../di/container';
import { ticketStatus } from '../../domain/rules/ticketStatus';
import { useAsync } from '../hooks/useAsync';
import { Button } from '../components/Button';
import { IconText } from '../components/IconText';
import { Loading } from '../components/Loading';
import { Skeleton } from '../components/Skeleton';
import { dateTime, rupiah } from '../format';
import { font, radius, shadow, space, theme, fonts } from '../theme';

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
  const { id, new: justBought } = useLocalSearchParams();
  const load = useCallback(
    () => container.getTicketById.execute(id).then((t) => { if (!t) throw new Error('Tiket tidak ditemukan'); return t; }),
    [id],
  );
  const { data: ticket, error, retry } = useAsync(load);
  if (!ticket) return <Loading error={error} onRetry={retry} skeleton={<TicketSkeleton />} />;
  const expired = ticketStatus(ticket) === 'expired';
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      {justBought && (
        <View accessibilityRole="alert" style={styles.success}>
          <Check color={theme.primary} size={20} />
          <Text style={styles.successText}>Pembelian berhasil. Tiketmu sudah tersimpan.</Text>
        </View>
      )}
      <View style={styles.ticket}>
        <View style={styles.top}>
          <Text style={[styles.status, expired && styles.statusExpired]}>{expired ? 'SELESAI' : 'BERLAKU'}</Text>
          <Text style={styles.event}>{ticket.eventTitle}</Text>
          <IconText icon={Calendar}>{dateTime(ticket.eventDate)}</IconText>
          <IconText icon={MapPin}>{ticket.eventLocation}</IconText>
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
  success: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    padding: space.lg,
    borderRadius: radius.md,
    backgroundColor: theme.primarySoft,
  },
  successText: { flex: 1, fontSize: font.sm, fontFamily: fonts.semibold, color: theme.primary },
  ticket: { borderRadius: radius.lg, backgroundColor: theme.card, ...shadow },
  top: { padding: space.xl, gap: space.xs },
  status: { alignSelf: 'flex-start', paddingVertical: space.xs, paddingHorizontal: space.md, borderRadius: radius.pill, overflow: 'hidden', backgroundColor: theme.primarySoft, color: theme.primary, fontSize: font.xs, fontFamily: fonts.bold },
  statusExpired: { backgroundColor: theme.border, color: theme.muted },
  event: { fontSize: font.xl, fontFamily: fonts.bold, color: theme.text, marginTop: space.sm },
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
  code: { fontSize: font.xxl, fontFamily: fonts.extrabold, color: theme.primary, letterSpacing: 3 },
  skeleton: { height: 320, borderRadius: 20 },
});
