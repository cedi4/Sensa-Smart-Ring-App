import { globalStyles } from '@/styles/global';
import { Text, View } from 'react-native';
import RecentEvent from './RecentEvent';

export default function RecentEvents() {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={globalStyles.sectionTitle}>Recent Events</Text>
      <RecentEvent
        name='Face Touch'
      />
      <RecentEvent
        name='Face Pick'
      />
      <RecentEvent
        name='Hair Pull'
      />
    </View>
  );
}