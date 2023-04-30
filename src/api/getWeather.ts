import { axiosClient } from './axiosClient';
import { getGeolocation } from './getGeolocation';
import { UNITS } from './const';
import { WeatherType } from '../types/weatherType';

export const getWeather = async (): Promise<WeatherType> => {
  try {
    const { lat, lon } = await getGeolocation();

    const { data: weatherData } = await axiosClient.get(
      `/data/2.5/weather?lat=${lat}&lon=${lon}&units=${UNITS}&appid=${process.env.API_KEY}`
    );

    console.log(weatherData);

    const { clouds, main, weather, wind } = weatherData;

    return { clouds, main, weather, wind };
  } catch (err: any) {
    console.log(err);
    return err;
  }
};
