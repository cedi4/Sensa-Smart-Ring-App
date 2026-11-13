import { colors, globalStyles } from '@/styles/global';
import { StyleSheet, Text, View } from 'react-native';
import RecentEvent from './RecentEvent';

export default function TodaysActivities() {
  return (
    <View style={styles.box}>
      <Text style={globalStyles.sectionTitle}>Today's Activities</Text>
      <RecentEvent
        name='Face Touch'
      />
    </View>
  );
}
 const styles = StyleSheet.create({
    box: {
        marginTop: 30, // moved here from the inline style
        padding: 16, // ADDED: space between the box edge and what's inside
        backgroundColor: colors.surface,
        borderRadius: 12,
        overflow: 'hidden',
    },
 });