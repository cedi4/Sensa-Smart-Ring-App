// ADDED: allows us to show validation messages
import { Alert } from 'react-native';

// ADDED: gets the shared addEvent function
import { useRingData } from '@/context/RingDataContext';

// ADDED: identifies the event structure
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
  // ADDED: addEvent saves the event to SQLite
  const { addEvent } = useRingData();

  // ADDED: form values
  const [eventType, setEventType] =
    useState('nail_bite');

  const [confidence, setConfidence] =
    useState('94');

  const [batteryLevel, setBatteryLevel] =
    useState('74');

  const [timestamp, setTimestamp] =
    useState(new Date().toISOString());

  const submitTestEvent = async () => {
    // ADDED: convert text input values into numbers
    const confidenceNumber = Number(confidence);
    const batteryNumber = Number(batteryLevel);

    // ADDED: prevent invalid form data
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

    // ADDED: creates one artificial event
    const testEvent: RingEvent = {
      deviceEventId: Date.now(),
      eventType: eventType.trim(),
      timestamp,
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

    // ADDED: saves the event to SQLite
    await addEvent(testEvent);

    // ADDED: confirms that the event was added
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

        <Text style={styles.label}>
          Timestamp
        </Text>

        <TextInput
          style={styles.input}
          value={timestamp}
          onChangeText={setTimestamp}
          placeholder="Example: 2026-11-19T12:00:00.000Z"
          placeholderTextColor={colors.textSecondary}
        />

        <TextInput
          style={styles.input}
          value={batteryLevel}
          onChangeText={setBatteryLevel}
          keyboardType="numeric"
          placeholder="Example: 74"
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