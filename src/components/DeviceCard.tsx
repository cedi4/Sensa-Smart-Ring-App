import { colors } from '@/styles/global';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

type DeviceCardProps = {
  name: string;
  signal: string;
};

export default function DeviceCard({
  name,
  signal,
}: DeviceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.signal}>{signal}</Text>
      </View>
      <Link href='/' style={styles.button}>
        Connect
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  signal: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  button: {
    backgroundColor: colors.primary,
    color: colors.background,
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    overflow: 'hidden',
  },
});