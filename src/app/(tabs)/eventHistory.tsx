import Bar from '@/components/Bar';
import EventRow from '@/components/EventRow';
import TimeRow from '@/components/TimeRow';
import { useRingData } from '@/context/RingDataContext';
import { colors, globalStyles } from '@/styles/global';
import { Link } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function EventHistory() {
  const { events } = useRingData();

  // Display only the five most recent events
  const recentEvents = events.slice(0, 5);

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>
        History
      </Text>

      {/* Day / Week / Month selector */}
      <View style={styles.segment}>
        <Text style={styles.segmentText}>
          Day
        </Text>

        <Text
          style={[
            styles.segmentText,
            styles.selected,
          ]}
        >
          Week
        </Text>

        <Text style={styles.segmentText}>
          Month
        </Text>
      </View>

      {/* Detected behaviors chart */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>
          Detected Behaviors
        </Text>

        <Text style={styles.boxSub}>
          For the week
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

      {/* High-risk time periods */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>
          High Risk Periods
        </Text>

        <TimeRow
          label="Morning"
          range="12:00am - 11:59am"
          percent={20}
        />

        <TimeRow
          label="Afternoon"
          range="12:00pm - 5:00pm"
          percent={55}
        />

        <TimeRow
          label="Evening"
          range="5:00pm - 8:00pm"
          percent={40}
        />

        <TimeRow
          label="Night"
          range="8:00pm - 12:00am"
          percent={10}
        />
      </View>

      {/* Five most recent events */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>
          Recent Events
        </Text>

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

        {/* Opens the full event list screen */}
        <View style={styles.seeMoreContainer}>
          <Link
            href="/listOfEventsScreen"
            style={styles.seeMore}
          >
            See More
          </Link>
        </View>
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

  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: 12,
  },

  seeMoreContainer: {
    alignItems: 'center',
    marginTop: 8,
  },

  seeMore: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});