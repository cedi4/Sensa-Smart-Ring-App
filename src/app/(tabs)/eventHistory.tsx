import Bar from '@/components/Bar';
import EventRow from '@/components/EventRow';
import TimeRow from '@/components/TimeRow';
import { useRingData } from '@/context/RingDataContext';
import { colors, globalStyles } from '@/styles/global';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function EventHistory() {
  const { events } = useRingData();

  // Displays only the five most recent events
  const recentEvents = events.slice(0, 5);

  // ADDED: Count events based on the time they occurred
  const periodCounts = {
    morning: 0,
    afternoon: 0,
    evening: 0,
    night: 0,
  };

  events.forEach((event) => {
    const hour = new Date(event.timestamp).getHours();

    if (hour >= 0 && hour < 12) {
      periodCounts.morning += 1;
    } else if (hour >= 12 && hour < 17) {
      periodCounts.afternoon += 1;
    } else if (hour >= 17 && hour < 20) {
      periodCounts.evening += 1;
    } else {
      periodCounts.night += 1;
    }
  });

  // ADDED: Count all events in the four time periods
  const totalPeriodEvents =
    periodCounts.morning +
    periodCounts.afternoon +
    periodCounts.evening +
    periodCounts.night;

  // ADDED: Convert each time-period count into a percentage
  const getPeriodPercentage = (count: number) => {
    if (totalPeriodEvents === 0) {
      return 0;
    }

    return Math.round(
      (count / totalPeriodEvents) * 100
    );
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>History</Text>

      {/* Day / Week / Month */}
      <View style={styles.segment}>
        <Text style={styles.segmentText}>Day</Text>
        <Text style={[styles.segmentText, styles.selected]}>
          Week
        </Text>
        <Text style={styles.segmentText}>Month</Text>
      </View>

      {/* Number of detected behaviors */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>
          Detected Behaviors
        </Text>

        <Text style={styles.boxSub}>
          (for the week)
        </Text>

        <View style={styles.chart}>
          <Bar height={55} />
          <Bar height={55} />
          <Bar height={80} />
          <Bar height={30} />
          <Bar height={95} highlight />
          <Bar height={65} />
          <Bar height={70} />
        </View>

        <View style={styles.days}>
          <Text style={styles.dayText}>SUN</Text>
          <Text style={styles.dayText}>MON</Text>
          <Text style={styles.dayText}>TUE</Text>
          <Text style={styles.dayText}>WED</Text>
          <Text style={styles.dayText}>THU</Text>
          <Text style={styles.dayText}>FRI</Text>
          <Text style={styles.dayText}>SAT</Text>
        </View>
      </View>

      {/* ADDED: High Risk Periods now use real event timestamps */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>
          High Risk Periods
        </Text>

        {totalPeriodEvents === 0 ? (
          <Text style={styles.emptyText}>
            No events recorded yet.
          </Text>
        ) : (
          <>
            <TimeRow
              label="Morning"
              range="12:00am - 11:59am"
              percent={getPeriodPercentage(
                periodCounts.morning
              )}
            />

            <TimeRow
              label="Afternoon"
              range="12:00pm - 4:59pm"
              percent={getPeriodPercentage(
                periodCounts.afternoon
              )}
            />

            <TimeRow
              label="Evening"
              range="5:00pm - 7:59pm"
              percent={getPeriodPercentage(
                periodCounts.evening
              )}
            />

            <TimeRow
              label="Night"
              range="8:00pm - 11:59pm"
              percent={getPeriodPercentage(
                periodCounts.night
              )}
            />
          </>
        )}
      </View>

      {/* Displays only the five most recent events */}
      <View style={styles.box}>
        <View style={styles.recentHeader}>
          <Text
            style={[
              styles.boxTitle,
              styles.recentTitle,
            ]}
          >
            Recent Events
          </Text>
        </View>

        {recentEvents.length === 0 ? (
          <Text style={styles.emptyText}>
            No events recorded yet.
          </Text>
        ) : (
          recentEvents.map((event) => (
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

        {/* Link appears below the event rows */}
        <Link
          href="/listOfEventsScreen"
          style={styles.seeMore}
        >
          See More
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  segment: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: colors.surface,
    borderRadius: 10,
    overflow: 'hidden',
  },

  segmentText: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textSecondary,
  },

  selected: {
    backgroundColor: colors.primary,
    color: colors.background,
    fontWeight: 'bold',
  },

  box: {
    marginTop: 20,
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },

  boxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },

  boxSub: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: -8,
  },

  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    gap: 10,
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.muted,
  },

  days: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },

  dayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    color: colors.textSecondary,
  },

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

  recentHeader: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  seeMore: {
    color: colors.primary,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 12,
  },

  recentTitle: {
    textAlign: 'left',
    marginBottom: 0,
  },
});