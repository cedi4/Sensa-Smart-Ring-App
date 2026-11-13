import { colors } from '@/styles/global';
import { StyleSheet, Text, View } from 'react-native';

type TimeRowProps = {
  label: string;   // "Morning"
  range: string;   // "12:00am - 11:59am"
  percent: number; // 0 to 100
};

export default function TimeRow({
  label,
  range,
  percent,
}: TimeRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.labelBox}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.range}>{range}</Text>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  labelBox: {
    width: 130,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  range: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  barTrack: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  barFill: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
});