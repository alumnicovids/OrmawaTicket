import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="ormawa/[id]" options={{ title: 'Detail Ormawa' }} />
        <Stack.Screen name="event/[id]" options={{ title: 'Detail Event' }} />
        <Stack.Screen name="checkout/[eventId]" options={{ title: 'Checkout' }} />
        <Stack.Screen name="ticket/[id]" options={{ title: 'Tiket' }} />
      </Stack>
    </>
  );
}
