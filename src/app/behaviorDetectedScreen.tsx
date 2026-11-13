import { colors, globalStyles } from '@/styles/global';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function BehaviorDetectedScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Behavior Detected</Text>
      <Text style={styles.date}>Nov 9, 2026 - 8:42 AM</Text>

      {/* label + behavior type */}
      <View style={styles.box}>
        <Text style={styles.label}>Face Touch</Text>
        <TextInput
          style={styles.input}
          placeholder='Input Behavior Type'
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      {/* user notes */}
      <TextInput
        style={[styles.input, styles.notes]}
        placeholder='User Notes / Comments'
        placeholderTextColor={colors.textSecondary}
        multiline
      />

      <Link href='/' style={styles.button}>
        Save Event
      </Link>
      <Link href='/' style={styles.buttonOutline}>
        Not an event
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  box: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    color: colors.text,
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
  },
  notes: {
    marginTop: 20,
    height: 180,
    textAlignVertical: 'top',
    backgroundColor: colors.surface,
  },
  button: {
    backgroundColor: colors.primary,
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
    borderRadius: 10,
    marginTop: 24,
    overflow: 'hidden',
  },
  buttonOutline: {
    backgroundColor: colors.surface,
    color: colors.alert,
    fontSize: 16,
    textAlign: 'center',
    padding: 16,
    borderRadius: 10,
    marginTop: 12,
    marginBottom: 40,
    overflow: 'hidden',
  },
});