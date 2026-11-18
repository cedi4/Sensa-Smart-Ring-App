import { StyleSheet } from 'react-native';

export const colors = {
  background: '#F0F0F0',
  header: '#242444',
  surface: '#DCE9EF',
  primary: '#59aec8',
  bar: '#00bcf5',
  text: '#000000',
  textSecondary:  '#000000',
  alert: '#ff5252',
  success: '#2e9e4a', 
  muted: '#c3c9c0',
  batteryGreen: '#198900',
  batteryYellow: '#d3e200',
  batteryRed: '#ff0000',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 30,
    marginBottom: 16,
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});