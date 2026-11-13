import { colors } from '@/styles/global';
import { StyleSheet, View } from 'react-native';

type BarProps = {
  height: number;
  highlight?: boolean; // the tall blue bar
};

export default function Bar({
  height,
  highlight,
}: BarProps) {
  return (
    <View
      style={[
        styles.bar,
        { height, backgroundColor: highlight ? colors.primary : colors.muted },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  bar: {
    flex: 1, // every bar shares the row equally
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
});