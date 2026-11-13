import { colors, globalStyles } from '@/styles/global';
import { StyleSheet, Text, View } from 'react-native';
import Bar from './Bar';

export default function TodaysActivities() {
  return (
    <View style={styles.box}>
      <Text style={globalStyles.sectionTitle}>Today's Activities</Text>
      {/* big number + label */}
      <View style={styles.countRow}>
        <Text style={styles.count}>6</Text>
        <Text style={styles.countLabel}>events detected</Text>
      </View>
      {/*  bars for the day */}
      <View style={styles.chart}>
        <Bar height={18} />
        <Bar height={52} highlight />
        <Bar height={18} />
        <Bar height={58} highlight />
        <Bar height={18} />
        <Bar height={58} highlight />
        <Bar height={18} />
        <Bar height={28} />
      </View>
      {/* time labels under the bars */}
      <View style={styles.labels}>
        <Text style={styles.labelText}>6 AM</Text>
        <Text style={styles.labelText}>10 AM</Text>
        <Text style={styles.labelText}>2 PM</Text>
        <Text style={styles.labelText}>6 PM</Text>
        <Text style={styles.labelText}>10 PM</Text>
      </View>
    </View>
  );
}
 const styles = StyleSheet.create({
    box: {
        marginTop: 30, // moved here from the inline style
        padding: 16, // space between the box edge and what's inside
        backgroundColor: colors.surface,
        borderRadius: 12,
        overflow: 'hidden',
    },
    countRow: { 
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    count: { 
      fontSize: 44,
      fontWeight: 'bold',
      color: colors.text,
      marginRight: 10,
    },
    countLabel: { 
      fontSize: 14,
      color: colors.textSecondary,
    },
    chart: { 
      flexDirection: 'row',
      alignItems: 'flex-end', // bars grow up from the bottom
      height: 64,
      gap: 6,
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.muted,
    },
    labels: { 
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4,
    },
    labelText: { 
      fontSize: 11,
      color: colors.textSecondary,
    },
 });