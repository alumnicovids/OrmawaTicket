import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Calendar from 'lucide-react-native/icons/calendar';
import Music from 'lucide-react-native/icons/music';
import PartyPopper from 'lucide-react-native/icons/party-popper';
import Presentation from 'lucide-react-native/icons/presentation';
import Trophy from 'lucide-react-native/icons/trophy';
import { Skeleton } from './Skeleton';
import { font, space, theme, fonts } from '../theme';

// Poster buatan kode, dipakai kalau event tidak punya `imageUrl`. Warna gelap supaya teks putih terbaca (>= 4.5:1).
const looks = {
  musik: { icon: Music, colors: ['#4338CA', '#7C3AED'] },
  seminar: { icon: Presentation, colors: ['#0E7490', '#1D4ED8'] },
  lomba: { icon: Trophy, colors: ['#C2410C', '#B91C1C'] },
  festival: { icon: PartyPopper, colors: ['#A21CAF', '#BE185D'] },
};
const fallbackLook = { icon: Calendar, colors: ['#4338CA', '#7C3AED'] };

// `withTitle`: cetak nama ormawa dan judul di poster seperti flyer.
function GeneratedPoster({ event, ormawaName, withTitle, featured }) {
  const { icon: Icon, colors } = looks[event.categoryIds[0]] ?? fallbackLook;
  return (
    <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.fill}>
      <View style={styles.circleBig} />
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
    </LinearGradient>
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
  fill: { ...StyleSheet.absoluteFillObject, borderRadius: 0 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circleBig: {
    position: 'absolute',
    top: -90,
    right: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  circleSmall: {
    position: 'absolute',
    bottom: -50,
    left: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  watermark: { position: 'absolute', right: space.lg, bottom: space.lg, opacity: 0.3 },
  titleBlock: { position: 'absolute', left: space.lg, bottom: space.lg, maxWidth: '72%', gap: space.xs },
  label: { fontSize: font.xs, fontFamily: fonts.bold, letterSpacing: 1, textTransform: 'uppercase', color: theme.onPrimary },
  title: { fontSize: font.xl, fontFamily: fonts.extrabold, color: theme.onPrimary },
  titleFeatured: { fontSize: font.xxl, fontFamily: fonts.extrabold, color: theme.onPrimary },
});
