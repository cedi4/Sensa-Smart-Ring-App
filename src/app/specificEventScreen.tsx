import SettingRow from '@/components/SettingRow';
import { colors, globalStyles } from '@/styles/global';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SpecificEventScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Specific Event</Text>

      {/* Event Data */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Event Data</Text>
        <SettingRow label='Date' value='Nov 5, 2026' />
        <SettingRow label='Time' value='8:42 AM' />
        <SettingRow label='Detection' value='Face Touch' />
        <SettingRow label='Source' value='Smart Ring' />
        <SettingRow label='Notes' value='None' last />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.surface,
    borderRadius: 20,
    overflow: 'hidden',
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
});