import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PaginationDot from 'react-native-animated-pagination-dot';
import axios from 'axios';

export default function App() {
  const [page, setPage] = useState(0);
  const [weather, setWeather] = useState('');
  const [wind, setWind] = useState(0);
  const [weatherData, setWeatherData] = useState(0);
  const [temp, setTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);

  const bars = <Icon name='bars' size={30} color='#000000' />;
  const search = <Icon name='search' size={30} color='#000000' />;

  const CITY_NAME = 'Seoul';
  const LIMIT = 5;

  const getTempAndWeather = async () => {
    const result = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${CITY_NAME}&limit=${LIMIT}&appid=${process.env.API_KEY}`
    );

    const { lat, lon } = result.data[0];

    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`
    );

    setTemp(data.main.temp);
    setMinTemp(data.main.temp_min);
    setMaxTemp(data.main.temp_max);
    setWeather(data.weather[0].main);
    setWeatherData(data);
    setWind(Math.floor(data.wind.speed));
  };

  useEffect(() => {
  console.log('useEffect 실행!');

  getTempAndWeather();
  }, []);

  const now = new Date();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[now.getDay()];
  const month = now.toLocaleString('default', { month: 'long' });
  const date = now.getDate();

  return (
    <View style={{ flex: 1, backgroundColor: '#e9be0a' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 24,
        }}
      >
        {bars}
        <Text style={{ fontSize: 18, fontWeight: 700 }}>{CITY_NAME}</Text>
        {search}
      </View>
      <View style={{ flex: 1.2, margin: 24, borderBottomWidth: 3 }}>
        <Text style={{ fontSize: 20, fontWeight: 700 }}>{day}</Text>
        <Text style={{ fontSize: 16 }}>
          {month}&nbsp;
          {date}일
        </Text>
      </View>
      <View style={{ flex: 3.5, margin: 24, borderBottomWidth: 3 }}>
        <Text style={{ fontSize: 100, fontWeight: 700 }}>{temp}°</Text>
        <Text style={{ fontSize: 16 }}>{weather}</Text>
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
            {weatherData.rain
              ? `강수량 ${weatherData.rain['1h']}`
              : weatherData.snow
              ? `강우량 ${weatherData.rain['1h']}`
              : weatherData.clouds
              ? `흐림 ${weatherData.clouds.all}%`
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
      <StatusBar barStyle='dark-content' backgroundColor='#e9be0a' />
    </View>
  );
}
