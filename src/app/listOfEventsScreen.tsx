import EventRow from '@/components/EventRow';
import { useRingData } from '@/context/RingDataContext';
import { colors, globalStyles } from '@/styles/global';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ListOfEventsScreen() {
  // Get all events loaded from SQLite/context
  const { events } = useRingData();

  let eventContent;

  if (events.length === 0) {
    eventContent = (
      <Text style={styles.emptyText}>
        No events recorded yet.
      </Text>
    );
  } else {
    eventContent = events.map((event) => (
      <EventRow
        key={event.id ?? event.deviceEventId}
        date={new Date(event.timestamp).toLocaleDateString()}
        time={new Date(event.timestamp).toLocaleTimeString()}
        detection={event.eventType}
      />
    ));
  }

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>
        All Events
      </Text>

      <View style={styles.box}>
        <Text style={styles.boxTitle}>
          Event History
        </Text>

        {/* Displays either the empty message or event rows */}
        {eventContent}
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
    marginBottom: 40,
  },

  boxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },

  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 12,
  },
});