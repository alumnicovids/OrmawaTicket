import { Tabs } from 'expo-router/js-tabs';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Beranda' }} />
      <Tabs.Screen name="ormawa" options={{ title: 'Ormawa' }} />
      <Tabs.Screen name="tickets" options={{ title: 'Tiket Saya' }} />
    </Tabs>
  );
}
