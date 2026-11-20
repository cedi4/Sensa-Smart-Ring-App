import Bar from '@/components/Bar';
import { useRingData } from '@/context/RingDataContext';
import { colors } from '@/styles/global';
import { StyleSheet, Text, View } from 'react-native';

export default function TodayActivity() {
  const { events } = useRingData();

  // Six four-hour sections for today's activity
  const activityCounts = [0, 0, 0, 0, 0, 0];

  const today = new Date();

  // Count only events that happened today
  events.forEach((event) => {
    const eventDate = new Date(event.timestamp);

    const happenedToday =
      eventDate.getFullYear() === today.getFullYear() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getDate() === today.getDate();

    if (happenedToday) {
      const hour = eventDate.getHours();

      // Each bar represents four hours
      const section = Math.floor(hour / 4);

      activityCounts[section] += 1;
    }
  });

  // Find the largest number of events in one section
  const largestCount = Math.max(
    ...activityCounts,
    0
  );

  // Convert event counts to graph heights
  const barHeights = activityCounts.map((count) => {
    if (count === 0 || largestCount === 0) {
      return 0;
    }

    return Math.max(
      10,
      Math.round((count / largestCount) * 95)
    );
  });

  const labels = [
    '12AM',
    '4AM',
    '8AM',
    '12PM',
    '4PM',
    '8PM',
  ];

  const totalToday = activityCounts.reduce(
    (total, count) => total + count,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Today&apos;s Activity
      </Text>

      <Text style={styles.subtitle}>
        {totalToday} detected behavior
        {totalToday === 1 ? '' : 's'} today
      </Text>

      <View style={styles.chart}>
        {barHeights.map((height, index) => (
          <Bar
            key={labels[index]}
            height={height}
            highlight={
              activityCounts[index] === largestCount &&
              largestCount > 0
            }
          />
        ))}
      </View>

      <View style={styles.labels}>
        {labels.map((label) => (
          <Text
            key={label}
            style={styles.label}
          >
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 16,
    marginTop: 40,
    marginBottom: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 13,
    color: '#a0a0b0',
    textAlign: 'center',
    marginTop: 4,
  },

  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    gap: 10,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#536080',
  },

  labels: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },

  label: {
    flex: 1,
    textAlign: 'center',
    fontSize: 9,
    color: '#a0a0b0',
  },
});