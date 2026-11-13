import { colors } from '@/styles/global';
import { StyleSheet, Text, View } from 'react-native';

type SettingRowProps = {
  label: string;
  value: string;
  last?: boolean; // no divider under the last row in a box
};

export default function SettingRow({
  label,
  value,
  last,
}: SettingRowProps) {
  return (
    <View style={[styles.row, !last && styles.divider]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  value: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});