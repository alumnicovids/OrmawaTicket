import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Calendar from 'lucide-react-native/icons/calendar';
import Ticket from 'lucide-react-native/icons/ticket';
import Users from 'lucide-react-native/icons/users';
import { Tabs } from 'expo-router/js-tabs';
import { fonts, theme } from '../../presentation/theme';

const icon = (Icon) => ({ color }) => <Icon color={color} size={22} />;

// Tinggi bar bawaan (49) menyisakan ~10px untuk label, jadi kaki huruf (y, g) terpotong.
const TAB_BAR_HEIGHT = 60;

export default function TabsLayout() {
  const { bottom } = useSafeAreaInsets();
  const styles = useMemo(
    () => StyleSheet.create({
      header: { backgroundColor: theme.card },
      headerTitle: { fontFamily: fonts.bold },
      tabBar: { backgroundColor: theme.card, borderTopColor: theme.border, height: TAB_BAR_HEIGHT + bottom },
      tabLabel: { fontFamily: fonts.semibold, fontSize: 11, lineHeight: 14 },
    }),
    [bottom],
  );

  return (
    <Tabs
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerShadowVisible: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.muted,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Beranda', headerTitle: 'Event Kampus', tabBarIcon: icon(Calendar) }} />
      <Tabs.Screen name="ormawa" options={{ title: 'Ormawa', tabBarIcon: icon(Users) }} />
      <Tabs.Screen name="tickets" options={{ title: 'Tiket Saya', tabBarIcon: icon(Ticket) }} />
    </Tabs>
  );
}
