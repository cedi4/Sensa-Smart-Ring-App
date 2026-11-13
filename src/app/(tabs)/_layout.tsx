import { colors } from '@/styles/global';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.surface,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' size={size} color={color as string} />
          ),
        }}
      />
       <Tabs.Screen
       name='eventHistory'
       options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='book-outline' size={size} color={color as string} />
       ),
       }}
       />
      <Tabs.Screen
        name='settingScreen'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings' size={size} color={color as string} />
          ),
        }}
       />
    </Tabs>
  );
}
