// Allows us to show validation messages
import { Alert } from 'react-native';

// Gets the shared addEvent function
import { useRingData } from '@/context/RingDataContext';

// Identifies the event structure
import { RingEvent } from '@/database/eventRepo';

import { colors, globalStyles } from '@/styles/global';

import { useState } from 'react';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function TestingScreen() {
  // addEvent saves the event to SQLite
  const { addEvent } = useRingData();

  // ADDED: Separate date and time values
  const currentDate = new Date();

  const [eventDate, setEventDate] = useState(
    currentDate.toISOString().slice(0, 10)
  );

  const [eventTime, setEventTime] = useState(
    currentDate.toTimeString().slice(0, 5)
  );

  // Form values
  const [eventType, setEventType] =
    useState('nail_bite');

  const [confidence, setConfidence] =
    useState('94');

  const [batteryLevel, setBatteryLevel] =
    useState('74');

  const submitTestEvent = async () => {
    // Convert text input values into numbers
    const confidenceNumber = Number(confidence);
    const batteryNumber = Number(batteryLevel);

    // ADDED: Combine the date and time into one JavaScript date
    const typedDate = new Date(
      `${eventDate}T${eventTime}:00`
    );

    // ADDED: Prevent invalid date or time values
    if (Number.isNaN(typedDate.getTime())) {
      Alert.alert(
        'Invalid date or time',
        'Use the format YYYY-MM-DD and HH:MM.'
      );

      return;
    }

    // Prevent invalid form data
    if (
      eventType.trim() === '' ||
      Number.isNaN(confidenceNumber) ||
      Number.isNaN(batteryNumber)
    ) {
      Alert.alert(
        'Invalid event',
        'Enter an event type, confidence, and battery value.'
      );

      return;
    }

    // Creates one artificial event
    const testEvent: RingEvent = {
      deviceEventId: Date.now(),
      eventType: eventType.trim(),

      // ADDED: Save the separate date and time as an ISO timestamp
      timestamp: typedDate.toISOString(),

      confidence: Math.min(
        100,
        Math.max(0, confidenceNumber)
      ),

      batteryLevel: Math.min(
        100,
        Math.max(0, batteryNumber)
      ),

      source: 'mock-ble',
    };

    // Saves the event to SQLite
    await addEvent(testEvent);

    // Confirms that the event was added
    Alert.alert(
      'Event added',
      `${testEvent.eventType} was saved.`
    );
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>
        Testing
      </Text>

      <Text style={styles.description}>
        Temporary testing screen. Add artificial ring
        events manually.
      </Text>

      <View style={styles.box}>
        <Text style={styles.label}>
          Event Type
        </Text>

        <TextInput
          style={styles.input}
          value={eventType}
          onChangeText={setEventType}
          placeholder="Example: nail_bite"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.label}>
          Confidence
        </Text>

        <TextInput
          style={styles.input}
          value={confidence}
          onChangeText={setConfidence}
          keyboardType="numeric"
          placeholder="Example: 94"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.label}>
          Battery Level
        </Text>

        <TextInput
          style={styles.input}
          value={batteryLevel}
          onChangeText={setBatteryLevel}
          keyboardType="numeric"
          placeholder="Example: 74"
          placeholderTextColor={colors.textSecondary}
        />

        {/* ADDED: Easier date input */}
        <Text style={styles.label}>
          Event Date
        </Text>

        <TextInput
          style={styles.input}
          value={eventDate}
          onChangeText={setEventDate}
          placeholder="Example: 2026-11-20"
          placeholderTextColor={colors.textSecondary}
        />

        {/* ADDED: Easier time input */}
        <Text style={styles.label}>
          Event Time
        </Text>

        <TextInput
          style={styles.input}
          value={eventTime}
          onChangeText={setEventTime}
          placeholder="Example: 15:30"
          placeholderTextColor={colors.textSecondary}
        />

        <Pressable
          style={styles.addButton}
          onPress={submitTestEvent}
        >
          <Text style={styles.buttonText}>
            Add Test Event
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  description: {
    marginTop: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  box: {
    marginTop: 24,
    marginBottom: 40,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },

  label: {
    marginTop: 14,
    marginBottom: 6,
    color: colors.text,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: colors.background,
    color: colors.text,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },

  addButton: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },

  buttonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});