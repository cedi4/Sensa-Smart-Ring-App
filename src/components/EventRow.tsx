import { colors } from '@/styles/global';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

type EventRowProps = {
  date: string;      // "Nov 5"
  time: string;      // "8:42 AM"
  detection: string; // "Face Touch"
};

export default function EventRow({
  date,
  time,
  detection,
}: EventRowProps) {
  return (
    <Link href='/specificEventScreen' style={styles.row}>
      {date} - {time} - {detection} - More Info
    </Link>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#ffffff',
    color: colors.text,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
    overflow: 'hidden',
  },
});