import Bar from '@/components/Bar';
import EventRow from '@/components/EventRow';
import TimeRow from '@/components/TimeRow';
import { useRingData } from '@/context/RingDataContext';
import { colors, globalStyles } from '@/styles/global';
import { Link } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type HistoryRange = 'day' | 'week' | 'month';

export default function EventHistory() {
  const { events } = useRingData();

  // ADDED: Tracks which graph range is selected
  const [selectedRange, setSelectedRange] =
    useState<HistoryRange>('week');

  // To display only the 5 most recent events on the main history page
  const recentEvents = events.slice(0, 5);

  // ADDED: Get the beginning of the selected range
  const getStartDate = () => {
    const startDate = new Date();

    if (selectedRange === 'day') {
      startDate.setHours(0, 0, 0, 0);
    }

    if (selectedRange === 'week') {
      startDate.setDate(
        startDate.getDate() - startDate.getDay()
      );
      startDate.setHours(0, 0, 0, 0);
    }

    if (selectedRange === 'month') {
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
    }

    return startDate;
  };

  // ADDED: Get the end of the selected range
  const getEndDate = () => {
    const endDate = new Date();

    if (selectedRange === 'day') {
      endDate.setHours(23, 59, 59, 999);
    }

    if (selectedRange === 'week') {
      endDate.setDate(
        endDate.getDate() + (6 - endDate.getDay())
      );
      endDate.setHours(23, 59, 59, 999);
    }

    if (selectedRange === 'month') {
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0);
      endDate.setHours(23, 59, 59, 999);
    }

    return endDate;
  };

  // ADDED: Only events inside the selected range affect the graph
  const filteredGraphEvents = events.filter((event) => {
    const eventDate = new Date(event.timestamp);

    return (
      eventDate >= getStartDate() &&
      eventDate <= getEndDate()
    );
  });

  // ADDED: Chart values and labels
  let chartCounts: number[] = [];
  let chartLabels: string[] = [];

  if (selectedRange === 'day') {
    // Six four-hour sections for one day
    chartCounts = [0, 0, 0, 0, 0, 0];

    chartLabels = [
      '12AM',
      '4AM',
      '8AM',
      '12PM',
      '4PM',
      '8PM',
    ];

    filteredGraphEvents.forEach((event) => {
      const hour = new Date(
        event.timestamp
      ).getHours();

      const section = Math.floor(hour / 4);
      chartCounts[section] += 1;
    });
  }

  if (selectedRange === 'week') {
    // One value for each day of the week
    chartCounts = [0, 0, 0, 0, 0, 0, 0];

    chartLabels = [
      'SUN',
      'MON',
      'TUE',
      'WED',
      'THU',
      'FRI',
      'SAT',
    ];

    filteredGraphEvents.forEach((event) => {
      const day = new Date(
        event.timestamp
      ).getDay();

      chartCounts[day] += 1;
    });
  }

  if (selectedRange === 'month') {
    // One value for each week of the month
    const now = new Date();

    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();

    const numberOfWeeks = Math.ceil(
      daysInMonth / 7
    );

    chartCounts = Array(numberOfWeeks).fill(0);

    chartLabels = Array.from(
      { length: numberOfWeeks },
      (_, index) => `W${index + 1}`
    );

    filteredGraphEvents.forEach((event) => {
      const dayOfMonth = new Date(
        event.timestamp
      ).getDate();

      const weekIndex = Math.floor(
        (dayOfMonth - 1) / 7
      );

      chartCounts[weekIndex] += 1;
    });
  }

  // ADDED: Find the largest event count
  const largestCount = Math.max(
    ...chartCounts,
    0
  );

  // ADDED: Convert event counts into bar heights
  const chartHeights = chartCounts.map((count) => {
    if (count === 0 || largestCount === 0) {
      return 0;
    }

    return Math.max(
      10,
      Math.round((count / largestCount) * 95)
    );
  });

  // Existing high-risk-period calculation
  const periodCounts = {
    morning: 0,
    afternoon: 0,
    evening: 0,
    night: 0,
  };

  events.forEach((event) => {
    const hour = new Date(
      event.timestamp
    ).getHours();

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

  const totalPeriodEvents =
    periodCounts.morning +
    periodCounts.afternoon +
    periodCounts.evening +
    periodCounts.night;

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

      {/* CHANGED: Day / Week / Month are now pressable */}
      <View style={styles.segment}>
        <Pressable
          style={[
            styles.segmentButton,
            selectedRange === 'day' &&
              styles.selected,
          ]}
          onPress={() => setSelectedRange('day')}
        >
          <Text
            style={[
              styles.segmentText,
              selectedRange === 'day' &&
                styles.selectedText,
            ]}
          >
            Day
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.segmentButton,
            selectedRange === 'week' &&
              styles.selected,
          ]}
          onPress={() => setSelectedRange('week')}
        >
          <Text
            style={[
              styles.segmentText,
              selectedRange === 'week' &&
                styles.selectedText,
            ]}
          >
            Week
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.segmentButton,
            selectedRange === 'month' &&
              styles.selected,
          ]}
          onPress={() => setSelectedRange('month')}
        >
          <Text
            style={[
              styles.segmentText,
              selectedRange === 'month' &&
                styles.selectedText,
            ]}
          >
            Month
          </Text>
        </Pressable>
      </View>

      {/* CHANGED: detected behaviors graph now uses real events */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>
          Detected Behaviors
        </Text>

        <Text style={styles.boxSub}>
          (for the {selectedRange})
        </Text>

        <View style={styles.chart}>
          {chartHeights.map((height, index) => (
            <Bar
              key={chartLabels[index]}
              height={height}
              highlight={
                chartCounts[index] === largestCount &&
                largestCount > 0
              }
            />
          ))}
        </View>

        <View style={styles.days}>
          {chartLabels.map((label) => (
            <Text
              key={label}
              style={styles.dayText}
            >
              {label}
            </Text>
          ))}
        </View>
      </View>

      {/* Existing high-risk-period section */}
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

      {/* Existing recent-events section */}
      <View style={styles.box}>
        <View style={styles.recentHeader}>
          <Text style={[styles.boxTitle, styles.recentTitle]}>
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

  // ADDED: lets each range button fill one section
  segmentButton: {
    flex: 1,
  },

  segmentText: {
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textSecondary,
  },

  selected: {
    backgroundColor: colors.primary,
  },

  // ADDED: keeps selected text readable
  selectedText: {
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