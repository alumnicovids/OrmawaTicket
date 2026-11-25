import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { PlusJakartaSans_400Regular } from '@expo-google-fonts/plus-jakarta-sans/400Regular';
import { PlusJakartaSans_600SemiBold } from '@expo-google-fonts/plus-jakarta-sans/600SemiBold';
import { PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans/700Bold';
import { PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans/800ExtraBold';
import { StatusBar } from 'expo-status-bar';
import { fonts, theme } from '../presentation/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    [fonts.regular]: PlusJakartaSans_400Regular,
    [fonts.semibold]: PlusJakartaSans_600SemiBold,
    [fonts.bold]: PlusJakartaSans_700Bold,
    [fonts.extrabold]: PlusJakartaSans_800ExtraBold,
  });

  // Gagal memuat font tetap membuka app (font sistem), jangan macet di splash.
  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="ormawa/[id]" options={{ title: 'Detail Ormawa' }} />
        <Stack.Screen name="event/[id]" options={{ title: 'Detail Event' }} />
        <Stack.Screen name="checkout/[eventId]" options={{ title: 'Checkout' }} />
        <Stack.Screen name="ticket/[id]" options={{ title: 'Tiket' }} />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: theme.card },
  headerTitle: { fontFamily: fonts.bold },
  content: { backgroundColor: theme.bg },
});

const screenOptions = {
  headerStyle: styles.header,
  headerTitleStyle: styles.headerTitle,
  headerTintColor: theme.text,
  headerShadowVisible: false,
  contentStyle: styles.content,
};
