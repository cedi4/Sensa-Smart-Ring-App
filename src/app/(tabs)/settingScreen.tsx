import SettingRow from '@/components/SettingRow';
import { colors, globalStyles } from '@/styles/global';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SettingScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Settings</Text>

      {/* : Device card */}
      <Text style={globalStyles.sectionTitle}>Device</Text>
      <View style={styles.box}>
        <SettingRow label='Device Name' value='SensaRing-A41F' />
        <SettingRow label='Software Version' value='v1.0.3' last />
      </View>

      {/* : Preferences card */}
      <Text style={globalStyles.sectionTitle}>Preferences</Text>
      <View style={styles.box}>
        <SettingRow label='Vibration On/Off' value='On' />
        <SettingRow label='Vibration Strength' value='Medium' />
        <SettingRow label='Device Notifications' value='On' last />
      </View>

      {/* : Profile card */}
      <Text style={globalStyles.sectionTitle}>Profile</Text>
      <View style={styles.box}>
        <SettingRow label='Username' value='Cedric' />
        <SettingRow label='Email' value='you@example.com' last />
      </View>

      {/* your original link, moved under Profile;  a style key for spacing */}
      <Link href='/settings_nameChangeScreen' style={styles.link}>
        Change Username
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ 
  box: {
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  link: {
    fontSize: 16,
    color: '#007bff', // same blue as before
    marginTop: 12,
    marginBottom: 40,
  },
});