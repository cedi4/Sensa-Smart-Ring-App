import { colors } from '@/styles/global';
import { StyleSheet, Text, View } from 'react-native';

type RingStatusProps = {
  label: string;
  value: string;
  color: string;
  last?: boolean;      
};

export default function RingStatus({
  label,
  value,
  color,
  last,     
}: RingStatusProps) {
  return (
    <View style={[styles.row, { borderLeftColor: color }, !last && styles.divider]}>  
      <Text style={styles.label}>{label}</Text>  
      <Text style={[styles.value, { color }]}>{value}</Text></View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16, // moved here from the box so the stripe sits at the edge
    borderLeftWidth: 4,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
});