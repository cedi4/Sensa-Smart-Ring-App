import RecentEvent from '@/components/EventList';
import HomeHeader from '@/components/HomeHeader';
import StatusGrid from '@/components/StatusGrid';
import TodayActivity from '@/components/TodayList';
import { globalStyles } from '@/styles/global';
import { ScrollView, StyleSheet, Text } from 'react-native';


export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Good Evening, Cedric</Text>
     {/*Older date header component before step 18:
      <Text style={styles.date}>Monday, March 16</Text> */}
      <HomeHeader/>
      <StatusGrid />
      <TodayActivity />
      <RecentEvent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F0EF',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 50,
  },
  date: {
    fontSize: 14,
    color: '#a0a0b0',
    marginTop: 4,
    marginBottom: 30,
  },
});