import { useEffect } from 'react';
import { AccessibilityInfo, Animated, StyleSheet } from 'react-native';
import { theme } from '../theme';

// Satu animasi bersama untuk semua skeleton supaya berdenyut serempak.
const pulse = new Animated.Value(1);
let mounted = 0;
let loop = null;

const start = () => {
  AccessibilityInfo.isReduceMotionEnabled().then((reduce) => {
    if (reduce || mounted === 0 || loop) return;
    loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.45, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
    );
    loop.start();
  });
};

export function Skeleton({ style }) {
  useEffect(() => {
    mounted += 1;
    start();
    return () => {
      mounted -= 1;
      if (mounted === 0 && loop) {
        loop.stop();
        loop = null;
        pulse.setValue(1);
      }
    };
  }, []);

  const animated = { opacity: pulse };
  return <Animated.View accessibilityElementsHidden importantForAccessibility="no" style={[styles.base, style, animated]} />;
}

const styles = StyleSheet.create({
  base: { backgroundColor: theme.skeleton, borderRadius: 8 },
});
