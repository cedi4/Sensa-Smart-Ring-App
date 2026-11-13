import { colors } from '@/styles/global';
import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import RingStatus from './RingStatus';

  export default function StatusGrid() {
    const battery = 89;
    const connected = true; // will come from BLE later
    const statusColor = connected ? colors.success : colors.alert; // use specific color depending on connection status
    return (
      <View style={styles.box}>
        <Image source={require('../../assets/images/ringCAD.png')} style={styles.ringImage} />

      <View style={styles.info}>
        <Text style={styles.title}>Smart Ring</Text>
        <RingStatus label='Connection' value={connected ? 'Connected' : 'Disconnected'} color={statusColor} last />
        <RingStatus label='Battery' value={`${battery}%`} color={colors.success} last />
        {/* battery bar */}
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${battery}%` }]} />
          </View>
        <View>
        {/* Connect button, opens Device Connection */}
        <Link href='/deviceConnectionScreen' style={styles.connectButton}>
            Connect
          </Link>
        </View>
       </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    box: {
      flexDirection: 'row', // picture on the left, info on the right
      alignItems: 'center', 
      backgroundColor: colors.surface,
      borderRadius: 12,
      overflow: 'hidden', // clips the stripes to the rounded corners
    },
    ringImage: { 
    width: 72,
    height: 72,
    marginHorizontal: 16,
    resizeMode: 'contain',
    },
    info: { // takes the leftover width, so text isn't cut off
      flex: 1,
    },
    title: { 
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 12,
      marginLeft: 20, // lines the title up with the row text (4 stripe + 16 padding)
    },
    barTrack: { 
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.background,
      marginLeft: 20,
      marginRight: 16,
      marginBottom: 16,
      overflow: 'hidden',
    },
    barFill: { 
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.success,
    },
    connectButton: { 
      backgroundColor: colors.primary,
      color: colors.background,
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
      width: 64,
      height: 64,
      lineHeight: 64,
      borderRadius: 32,
      marginRight: 12,
      overflow: 'hidden',
    },
  });