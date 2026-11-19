import EventRow from '@/components/EventRow';
import { useRingData } from '@/context/RingDataContext';
import { colors, globalStyles } from '@/styles/global';
<<<<<<< HEAD
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
=======
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ListOfEventsScreen() {
  const {
    events,
    clearEvents,
  } = useRingData();

  const confirmDeleteEvents = () => {
    Alert.alert(
      'Delete event history?',
      'Are you sure you want to delete all saved events?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: clearEvents,
        },
      ]
    );
  };
>>>>>>> 158e569 (Made history list of events to show only 5 and to see the rest use a button)

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>
        All Events
      </Text>

      <View style={styles.box}>
<<<<<<< HEAD
        <Text style={styles.boxTitle}>
          Event History
        </Text>

        {/* Displays either the empty message or event rows */}
        {eventContent}
=======
        {/* Title and delete button on the same row */}
        <View style={styles.headerRow}>
          <Text style={styles.boxTitle}>
            Event History
          </Text>

          {/* Delete button at the top right */}
          <Pressable
            style={styles.deleteButton}
            onPress={confirmDeleteEvents}
          >
            <Text style={styles.deleteButtonText}>
              Delete
            </Text>
          </Pressable>
        </View>

        {events.length === 0 ? (
          <Text style={styles.emptyText}>
            No events recorded yet.
          </Text>
        ) : (
          events.map((event) => (
            <EventRow
              key={
                event.id ??
                event.deviceEventId
              }
              date={new Date(
                event.timestamp
              ).toLocaleDateString()}
              time={new Date(
                event.timestamp
              ).toLocaleTimeString()}
              detection={event.eventType}
            />
          ))
        )}
>>>>>>> 158e569 (Made history list of events to show only 5 and to see the rest use a button)
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
<<<<<<< HEAD
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 40,
=======
    marginBottom: 40,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
>>>>>>> 158e569 (Made history list of events to show only 5 and to see the rest use a button)
  },

  boxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
<<<<<<< HEAD
    textAlign: 'center',
    marginBottom: 12,
=======
  },

  deleteButton: {
    backgroundColor: '#b83232',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
>>>>>>> 158e569 (Made history list of events to show only 5 and to see the rest use a button)
  },

  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 12,
  },
});