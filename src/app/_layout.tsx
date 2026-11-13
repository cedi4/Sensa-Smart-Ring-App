import { colors } from '@/styles/global';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen 
        name='settings_nameChangeScreen'
        options={{ title: 'Change Username' }} 
      />
      <Stack.Screen
        name='deviceConnectionScreen'
        options={{ title: 'Device Connection' }}
      />
      <Stack.Screen
        name='behaviorDetectedScreen'
        options={{ title: 'Behavior Detected' }}
      />
      <Stack.Screen
        name='specificEventScreen'
        options={{ title: 'Specific Event' }}
      />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}