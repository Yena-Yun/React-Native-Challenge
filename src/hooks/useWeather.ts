import { useEffect, useState } from 'react';
import { axiosClient } from 'api/axiosClient';
import { UNITS } from 'api/const';
import { useGeolocation } from './useGeolocation';
import { WeatherType } from 'types/weatherType';

const defaultWeatherData = {
  clouds: 0,
  temp: 0,
  tempMin: 0,
  tempMax: 0,
  weather: '',
  weatherIcon: '',
  rain: 0,
  snow: 0,
  wind: 0,
};

export const useWeather = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const [weatherData, setWeatherData] =
    useState<WeatherType>(defaultWeatherData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // const { lat, lon } = await useGeolocation();

      try {
        const { data: weatherData } = await axiosClient.get(
          `/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${UNITS}&appid=${process.env.API_KEY}`
        );

        console.log(weatherData);

        setWeatherData({
          clouds: weatherData.clouds.all,
          temp: Math.round(weatherData.main.temp),
          tempMin: Math.round(weatherData.main.temp_min),
          tempMax: Math.round(weatherData.main.temp_max),
          weather: weatherData.weather[0].main,
          weatherIcon: weatherData.weather[0].icon || '01d',
          rain: weatherData.rain ? weatherData.rain['1h'] : 0,
          snow: weatherData.snow ? weatherData.snow['1h'] : 0,
          wind: Math.floor(weatherData.wind.speed),
        });
      } catch (err: any) {
        setError(err);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading) {
      fetchData();
    }
  }, []);

  return [weatherData, isLoading, error] as [WeatherType, boolean, any];
};
