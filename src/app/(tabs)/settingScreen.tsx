import { globalStyles } from '@/styles/global';
import { Link } from 'expo-router';
import { ScrollView, Text } from 'react-native';

export default function SettingScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Settings</Text>
      <Link href='/settings_nameChangeScreen' style={{ fontSize: 18, color: '#007bff' }}>
        Change Username
      </Link>
    </ScrollView>
  );
}