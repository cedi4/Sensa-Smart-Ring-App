import { StyleSheet, Text, View } from 'react-native';

type RecentEventProps = {
  name: string;
};

export default function RecentEvent({
  name,
}: RecentEventProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});