import Bar from '@/components/Bar';
import EventRow from '@/components/EventRow';
import TimeRow from '@/components/TimeRow';
import { colors, globalStyles } from '@/styles/global';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function EventHistory() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>History</Text>

      {/* : Day / Week / Month (Week is highlighted for now, buttons come later) */}
      <View style={styles.segment}>
        <Text style={styles.segmentText}>Day</Text>
        <Text style={[styles.segmentText, styles.selected]}>Week</Text>
        <Text style={styles.segmentText}>Month</Text>
      </View>

      {/* : number of detected behaviors */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Number of detected behaviors</Text>
        <Text style={styles.boxSub}>(for the week)</Text>
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

      {/* : chart of when behaviors are detected */}
      <View style={styles.box}>
        <Text style={styles.boxTitle}>When behaviors are detected</Text>
        <TimeRow label='Morning' range='12:00am - 11:59am' percent={20} />
        <TimeRow label='Afternoon' range='12:00pm - 5:00pm' percent={55} />
        <TimeRow label='Evening' range='5:00pm - 8:00pm' percent={40} />
        <TimeRow label='Night' range='8:00pm - 12:00am' percent={10} />
      </View>

      {/* CHANGED: History of Activities, each row opens Specific Event */}
      <View style={[styles.box, { marginBottom: 40 }]}>
        <Text style={styles.boxTitle}>History of Activities</Text>
        <EventRow date='Nov 5' time='8:42 AM' detection='Face Touch' />
        <EventRow date='Nov 5' time='12:18 PM' detection='Face Pick' />
        <EventRow date='Nov 4' time='3:57 PM' detection='Hair Pull' />
        <EventRow date='Nov 4' time='9:10 PM' detection='Face Touch' />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  segment: { //  from here...
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
  }, // ...to here

  // your old styles, unused now but left alone:
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
});