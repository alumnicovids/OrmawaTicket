import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import Calendar from 'lucide-react-native/icons/calendar';
import { Skeleton } from './Skeleton';
import { theme } from '../theme';

// Skeleton tampil sampai gambar selesai dimuat; jika gagal, tampil placeholder polos.
export function EventPoster({ uri, children }) {
  const [status, setStatus] = useState('loading');
  return (
    <View style={styles.frame}>
      {status === 'loading' && <Skeleton style={styles.fill} />}
      {status === 'error' ? (
        <View style={[styles.fill, styles.fallback]}>
          <Calendar color={theme.primary} size={32} />
        </View>
      ) : (
        <Image
          accessibilityIgnoresInvertColors
          source={uri}
          style={styles.fill}
          contentFit="cover"
          transition={200}
          cachePolicy="memory-disk"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { aspectRatio: 16 / 9, backgroundColor: theme.skeleton, overflow: 'hidden' },
  fill: { ...StyleSheet.absoluteFillObject, borderRadius: 0 },
  fallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: theme.primarySoft },
});
