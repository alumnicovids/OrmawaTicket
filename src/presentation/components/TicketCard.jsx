import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from './Text';
import ChevronRight from 'lucide-react-native/icons/chevron-right';
import { ticketStatus } from '../../domain/rules/ticketStatus';
import { Skeleton } from './Skeleton';
import { dateTime, rupiah } from '../format';
import { font, radius, shadow, space, theme, fonts } from '../theme';

export function TicketCard({ ticket, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.main}>
        <View style={styles.codeRow}>
          <Text style={styles.code}>{ticket.id}</Text>
          {ticketStatus(ticket) === 'expired' && <Text style={styles.expired}>SELESAI</Text>}
        </View>
        <Text style={styles.title} numberOfLines={2}>{ticket.eventTitle}</Text>
        <Text style={styles.muted}>{dateTime(ticket.eventDate)} · {ticket.eventLocation}</Text>
        <Text style={styles.muted}>{ticket.categoryName} × {ticket.quantity} · {rupiah(ticket.totalPrice)}</Text>
      </View>
      <ChevronRight color={theme.muted} size={20} />
    </Pressable>
  );
}

export function TicketCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.main}>
        <Skeleton style={styles.lineShort} />
        <Skeleton style={styles.lineLong} />
        <Skeleton style={styles.lineMedium} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: space.lg,
    borderRadius: radius.lg,
    backgroundColor: theme.card,
    ...shadow,
  },
  pressed: { opacity: 0.92 },
  main: { flex: 1, gap: space.xs },
  codeRow: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  expired: {
    paddingVertical: 2,
    paddingHorizontal: space.sm,
    borderRadius: radius.pill,
    overflow: 'hidden',
    backgroundColor: theme.border,
    color: theme.muted,
    fontSize: font.xs,
    fontFamily: fonts.bold,
  },
  code: { fontSize: font.xs, fontFamily: fonts.bold, color: theme.primary, letterSpacing: 1 },
  title: { fontSize: font.lg, fontFamily: fonts.bold, color: theme.text },
  muted: { fontSize: font.sm, color: theme.muted },
  lineShort: { height: 12, width: '30%' },
  lineLong: { height: 20, width: '75%', marginVertical: space.xs },
  lineMedium: { height: 14, width: '55%' },
});
