import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../presentation/theme';

export default function RootLayout() {
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
  content: { backgroundColor: theme.bg },
});

const screenOptions = {
  headerStyle: styles.header,
  headerTintColor: theme.text,
  headerShadowVisible: false,
  contentStyle: styles.content,
};
