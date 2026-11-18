import { colors } from '@/styles/global';
import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import RingStatus from './RingStatus';

  export default function StatusGrid() {
    const battery = 88;
    const connected = false; // will come from BLE later
    const statusColor = connected ? colors.success : colors.alert; // use specific color depending on connection status
    const batteryColor = battery <= 10 ? colors.batteryRed : battery <= 20 ? colors.batteryYellow : colors.batteryGreen;
    return (
      <View style={styles.box}> 
        <Image source={require('../../assets/images/ringCAD.png')} style={styles.ringImage} />

      <View style={styles.info}>
        <Text style={styles.title}>Sensa Ring</Text>
        <RingStatus value={connected ? 'Connected' : 'Disconnected'} color={statusColor} connectDot last /> 
        <RingStatus label='Battery' value='' color={batteryColor} connectDot={false}   last /> 

        {/* battery bar */}
        <View style={styles.barRow}>
          <Text style={[styles.barPercentage, { color: batteryColor }]}>{battery}%</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${battery}%`, backgroundColor: batteryColor }]} />
          </View>
        </View>

        <View>
        </View>
      </View>
         {/* Connect button, opens Device Connection */}
        <Link href='/deviceConnectionScreen' style={styles.connectButton}>
            Connect
          </Link>
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
      color: '#004744',
      marginTop: 12,
      marginLeft: 40, // lines the title up with the row text (4 stripe + 16 padding)
      textShadowColor: '#4fc3f7',    
      textShadowOffset: { width: 0, height: 0 }, 
      textShadowRadius: 4,          
    },
    barTrack: { 
      flex: 1,
    height: 10,
    borderRadius: 4,
    backgroundColor: colors.background,
    overflow: 'hidden',
    },
    barRow: { 
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginRight: -40,
      marginBottom: 16,
    },
    barFill: { 
      height: '100%',
      borderRadius: 4,
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
    barPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 40,
    marginRight: 8,
    },
  });