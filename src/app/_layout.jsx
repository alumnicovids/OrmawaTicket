import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="event/[id]" options={{ title: 'Detail Event' }} />
      <Stack.Screen name="checkout/[eventId]" options={{ title: 'Checkout' }} />
      <Stack.Screen name="ticket/[id]" options={{ title: 'Tiket' }} />
    </Stack>
  );
}
