import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import axios from 'axios';
import PaginationDot from 'react-native-animated-pagination-dot';
import { Date, Const, Icon } from './utils';
import { COLOR } from './styles/color';

export default function App() {
  const [weather, setWeather] = useState({
    status: '',
    wind: 0,
    detail: 0
  });

  const [temperature, setTemperature] = useState({
    temp: 0,
    minTemp: 0,
    maxTemp: 0
  });

  const getTempAndWeather = async () => {
    const { data: geolocation } = await axios.get(
      `${Const.WEATHER_URL}/geo/1.0/direct?q=${Const.CITY_NAME}&limit=${Const.LIMIT}&appid=${process.env.API_KEY}`
    );

    const { lat, lon } = geolocation[0];

    const { data: weatherData } = await axios.get(
      `${Const.WEATHER_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${Const.UNITS}&appid=${process.env.API_KEY}`
    );

    const { weather, main } = weatherData;

    setWeather({
      status: weather[0].main,
      wind: Math.floor(wind.speed),
      detail: weatherData,
    });

    setTemperature({
      temp: main.temp,
      minTemp: main.temp_min,
      maxTemp: main.temp_max,
    });
  };

  useEffect(() => {
    getTempAndWeather();
  }, []);

  const { status, wind, detail } = weather;
  const { temp, minTemp, maxTemp } = temperature;

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.primary }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 24,
        }}
      >
        {Icon.BARS_ICON}
        <Text style={{ fontSize: 18, fontWeight: 700 }}>{Const.CITY_NAME}</Text>
        {Icon.SEARCH_ICON}
      </View>
      <View style={{ flex: 1.2, margin: 24, borderBottomWidth: 3 }}>
        <Text style={{ fontSize: 20, fontWeight: 700 }}>{Date.DAY}</Text>
        <Text style={{ fontSize: 16 }}>
          {Date.MONTH}&nbsp;
          {Date.DATE}일
        </Text>
      </View>
      <View style={{ flex: 3.5, margin: 24, borderBottomWidth: 3 }}>
        <Text style={{ fontSize: 100, fontWeight: 700 }}>{temp}°</Text>
        <Text style={{ fontSize: 16 }}>{status}</Text>
      </View>
      <View style={{ flex: 2, margin: 24 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontWeight: 700 }}>최고 {maxTemp}°</Text>
          <Text style={{ fontWeight: 700 }}>
            {detail.rain
              ? `강수량 ${detail.rain['1h']}`
              : detail.snow
              ? `강우량 ${detail.rain['1h']}`
              : detail.clouds
              ? `흐림 ${detail.clouds.all}%`
              : '맑음'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text>최저 {minTemp}°</Text>
          <Text>바람속도 {wind} km/h</Text>
        </View>
      </View>
      <View style={{ padding: 24, alignItems: 'center' }}>
        <PaginationDot activeDotColor={'black'} curPage={page} maxPage={4} />
      </View>
      <StatusBar barStyle='dark-content' backgroundColor={COLOR.primary} />
    </View>
  );
}
