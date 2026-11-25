import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { Image } from 'expo-image';
import Calendar from 'lucide-react-native/icons/calendar';
import Music from 'lucide-react-native/icons/music';
import PartyPopper from 'lucide-react-native/icons/party-popper';
import Presentation from 'lucide-react-native/icons/presentation';
import Trophy from 'lucide-react-native/icons/trophy';
import { Skeleton } from './Skeleton';
import { font, space, theme, fonts, posterColors, posterOverlay } from '../theme';

// Poster buatan kode, dipakai kalau event tidak punya `imageUrl`. Warna ada di theme.js.
const icons = { musik: Music, seminar: Presentation, lomba: Trophy, festival: PartyPopper };

// Warna per kategori lewat StyleSheet (tanpa inline style). Poster memakai View biasa, bukan gradien native:
// LinearGradient tidak tergambar dengan benar di Expo Go pada beberapa HP Android.
const byCategory = (index) =>
  StyleSheet.create(Object.fromEntries(Object.entries(posterColors).map(([name, c]) => [name, { backgroundColor: c[index] }])));
const base = byCategory(0);
const accent = byCategory(1);

// `withTitle`: cetak nama ormawa dan judul di poster seperti flyer.
function GeneratedPoster({ event, ormawaName, withTitle, featured }) {
  const category = event.categoryIds[0];
  const Icon = icons[category] ?? Calendar;
  const look = category in posterColors ? category : 'musik';
  return (
    <View style={[styles.fill, base[look]]}>
      <View style={[styles.circleBig, accent[look]]} />
      <View style={styles.circleSmall} />
      {withTitle ? (
        <>
          <View style={styles.watermark}>
            <Icon color={theme.onPrimary} size={96} strokeWidth={1.25} />
          </View>
          <View style={styles.titleBlock}>
            {ormawaName && <Text style={styles.label} numberOfLines={1} maxFontSizeMultiplier={1.1}>{ormawaName}</Text>}
            <Text style={featured ? styles.titleFeatured : styles.title} numberOfLines={3} maxFontSizeMultiplier={1.1}>{event.title}</Text>
          </View>
        </>
      ) : (
        <View style={styles.center}>
          <Icon color={theme.onPrimary} size={72} strokeWidth={1.5} />
        </View>
      )}
    </View>
  );
}

// Dengan `imageUrl`: skeleton sampai gambar selesai dimuat; bila gagal, jatuh ke poster kode.
export function EventPoster({ event, ormawaName, withTitle, featured, children }) {
  const [status, setStatus] = useState('loading');
  const generated = !event.imageUrl || status === 'error';
  return (
    <View style={styles.frame}>
      {generated ? (
        <GeneratedPoster event={event} ormawaName={ormawaName} withTitle={withTitle && !event.imageUrl} featured={featured} />
      ) : (
        <>
          {status === 'loading' && <Skeleton style={styles.fill} />}
          <Image
            accessibilityIgnoresInvertColors
            source={event.imageUrl}
            style={styles.fill}
            contentFit="cover"
            transition={200}
            cachePolicy="memory-disk"
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
          />
        </>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { aspectRatio: 16 / 9, backgroundColor: theme.skeleton, overflow: 'hidden' },
  fill: { ...StyleSheet.absoluteFill, borderRadius: 0 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circleBig: {
    position: 'absolute',
    top: -90,
    right: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    opacity: 0.6,
  },
  circleSmall: {
    position: 'absolute',
    bottom: -50,
    left: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: posterOverlay.soft,
  },
  watermark: { position: 'absolute', right: space.lg, bottom: space.lg, opacity: 0.3 },
  titleBlock: { position: 'absolute', left: space.lg, bottom: space.lg, maxWidth: '72%', gap: space.xs },
  label: { fontSize: font.xs, fontFamily: fonts.bold, letterSpacing: 1, textTransform: 'uppercase', color: theme.onPrimary },
  title: { fontSize: font.xl, fontFamily: fonts.extrabold, color: theme.onPrimary },
  titleFeatured: { fontSize: font.xxl, fontFamily: fonts.extrabold, color: theme.onPrimary },
});
