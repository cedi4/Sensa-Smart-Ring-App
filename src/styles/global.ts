import { StyleSheet } from 'react-native';

export const colors = {
  background: '#F2F0EF',
  header: '#242444',
  surface: '#E6FFFE',
  primary: '#4fc3f7',
  text: '#004744',
  textSecondary: '#7c7c89',
  alert: '#ff5252',
  success: '#2e9e4a', 
  muted: '#c3c9c0',
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