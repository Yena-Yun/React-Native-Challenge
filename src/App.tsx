import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import { Date, Icon, Const } from './utils';
import { COLOR } from './styles/color';
import { useWeather } from 'src/hooks/useWeather';

export default function App() {
  const [weatherData, isLoading, error] = useWeather();

  const {
    clouds,
    temp,
    tempMin,
    tempMax,
    weather,
    weatherIcon,
    rain,
    snow,
    wind,
  } = weatherData;

  const weatherIconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;

  return (
    <View style={styles.container}>
      <View style={styles.statusbar}>
        {Icon.BARS_ICON}
        <Text style={styles.city}>{Const.CITY_NAME}</Text>
        {Icon.SEARCH_ICON}
      </View>
      <View style={styles.dates}>
        <Text style={styles.day}>{Date.DAY}</Text>
        <Text style={{ fontSize: 16 }}>
          {Date.MONTH}&nbsp;
          {Date.DATE}일
        </Text>
      </View>
      <View style={styles.main}>
        <Text style={styles.temp}>{temp}°</Text>
        <View style={styles.weatherWrap}>
          <Text style={styles.weather}>{weather}</Text>
          <Image source={{ uri: weatherIconUrl }} style={styles.weatherIcon} />
        </View>
      </View>
      <View style={{ flex: 2, margin: 24 }}>
        <View style={styles.detailRow}>
          <Text>최고 {tempMax}°</Text>
          <Text>
            {rain
              ? `강수량 ${rain}`
              : snow
              ? `강우량 ${snow}`
              : clouds
              ? `흐림 ${clouds}%`
              : '맑음'}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text>최저 {tempMin}°</Text>
          <Text>바람속도 {wind} km/h</Text>
        </View>
      </View>
      <StatusBar barStyle='dark-content' backgroundColor={COLOR.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
