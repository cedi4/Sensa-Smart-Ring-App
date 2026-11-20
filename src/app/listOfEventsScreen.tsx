import EventRow from '@/components/EventRow';
import { useRingData } from '@/context/RingDataContext';
import { colors, globalStyles } from '@/styles/global';

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
          onPress: async () => {
            await clearEvents();
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>
        All Events
      </Text>

      <View style={styles.box}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
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
  },

  boxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
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
  },

  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 12,
  },
});