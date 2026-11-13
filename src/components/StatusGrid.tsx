import { colors } from '@/styles/global';
import { Image, StyleSheet, Text, View } from 'react-native';
import RingStatus from './RingStatus';

  export default function StatusGrid() {
    const battery = 89;
    return (
      <View style={styles.box}>
        <Image source={require('../../assets/images/ringCAD.png')} style={styles.ringImage} />

      <View style={styles.info}>
        <Text style={styles.title}>Smart Ring</Text>
        <RingStatus label='Connection' value='Disconnected' color='#09260d' last />
        <RingStatus label='Battery' value={`${battery}%`} color='#196e24' last />
        {/* battery bar */}
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${battery}%` }]} />
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
      backgroundColor: '#6bcb77',
    },
  });