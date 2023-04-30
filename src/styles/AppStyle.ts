import { StyleSheet } from 'react-native';
import { COLOR } from './color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.primary,
  },
  statusbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  city: {
    fontSize: 18,
    fontWeight: '700',
  },
  dates: {
    flex: 1.2,
    margin: 24,
    borderBottomWidth: 3,
  },
  day: {
    fontSize: 20,
    fontWeight: '700',
  },
  main: {
    flex: 3.5,
    margin: 24,
    borderBottomWidth: 3,
  },
  temp: {
    fontSize: 100,
    fontWeight: '700',
  },
  weatherWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weather: {
    fontSize: 20,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginTop: 8,
  },
  detailWrap: {
    flex: 2,
    margin: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
