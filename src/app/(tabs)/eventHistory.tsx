import RecentEvent from '@/components/RecentEvent';
import { colors, globalStyles } from '@/styles/global';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function EventHistory() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>History</Text>

      <View style={{ marginTop: 30 }}>
        <Text style={globalStyles.sectionTitle}>This week</Text>
        <RecentEvent name='Thu, Nov 5: 9 events' />
        <RecentEvent name='Wed, Nov 4: 7 events' />
        <RecentEvent name='Tue, Nov 3: 11 events' />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});