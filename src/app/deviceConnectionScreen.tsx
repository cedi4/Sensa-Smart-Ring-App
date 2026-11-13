import DeviceCard from '@/components/DeviceCard';
import { colors, globalStyles } from '@/styles/global';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DeviceConnectionScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Device Connection</Text>

      {/* instructions */}
      <View style={styles.box}>
        <Text style={styles.help}>
          Wear the ring and keep it close to your phone. It will show up in the list below when it is found.
        </Text>
      </View>

      {/* animation status (just a circle for now) */}
      <View style={styles.statusCircle}>
        <Text style={styles.statusText}>Scanning...</Text>
      </View>

      {/* list of devices */}
      <View style={[styles.box, { marginBottom: 40 }]}>
        <Text style={styles.boxTitle}>List of Devices</Text>
        <DeviceCard name='Device 1' signal='SensaRing-A41F, strong signal' />
        <DeviceCard name='Device 2' signal='SensaRing-77C2, weak signal' />
        <DeviceCard name='Device 3' signal='SensaRing-B90D, weak signal' />
        <DeviceCard name='Device 4' signal='SensaRing-1E5A, weak signal' />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  help: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  statusCircle: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 110,
    borderRadius: 55,
    marginTop: 24,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  statusText: {
    fontSize: 14,
    color: colors.text,
  },
});