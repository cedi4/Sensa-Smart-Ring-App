import { colors, globalStyles } from '@/styles/global';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ControlsCard() {
  return (
    <View style={styles.box}>
      <Text style={globalStyles.sectionTitle}>Controls / Feedback</Text>
      <View style={styles.row}>
        {/* Behavior Detected Status + Action Button */}
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>Behavior Detected Status</Text>
          <Text style={styles.statusDetail}>Face Touch, 8:42 AM</Text>
          <Link href='/behaviorDetectedScreen' style={styles.circle}>
            Action
          </Link>
        </View>
        {/* Vibrate Ring Button (does nothing yet) */}
        <Text style={[styles.circle, styles.vibrate]}>Vibrate Ring</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: 30,
    marginBottom: 40,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  statusDetail: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: 10,
  },
  circle: {
    backgroundColor: colors.primary,
    color: colors.background,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 76,
    height: 76,
    lineHeight: 76,
    borderRadius: 38,
    overflow: 'hidden',
  },
  vibrate: {
    backgroundColor: colors.textSecondary,
    lineHeight: 20,
    paddingTop: 28,
  },
});