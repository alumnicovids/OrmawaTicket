import { StyleSheet } from 'react-native';
import Calendar from 'lucide-react-native/icons/calendar';
import Ticket from 'lucide-react-native/icons/ticket';
import Users from 'lucide-react-native/icons/users';
import { Tabs } from 'expo-router/js-tabs';
import { theme } from '../../presentation/theme';

const icon = (Icon) => ({ color, size }) => <Icon color={color} size={size} />;

export default function TabsLayout() {
  return (
    <Tabs screenOptions={screenOptions}>
      <Tabs.Screen name="index" options={{ title: 'Beranda', headerShown: false, tabBarIcon: icon(Calendar) }} />
      <Tabs.Screen name="ormawa" options={{ title: 'Ormawa', tabBarIcon: icon(Users) }} />
      <Tabs.Screen name="tickets" options={{ title: 'Tiket Saya', tabBarIcon: icon(Ticket) }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: theme.card },
  tabBar: { backgroundColor: theme.card, borderTopColor: theme.border },
});

const screenOptions = {
  headerStyle: styles.header,
  headerShadowVisible: false,
  tabBarStyle: styles.tabBar,
  tabBarActiveTintColor: theme.primary,
  tabBarInactiveTintColor: theme.muted,
};
