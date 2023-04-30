import { axiosClient } from 'api/axiosClient';
import { LIMIT } from 'api/const';
import { Const } from 'utils';

export const useGeolocation = async (): Promise<{
  lat: number;
  lon: number;
}> => {
  const { data: geolocation } = await axiosClient.get(
    `/geo/1.0/direct?q=${Const.CITY_NAME}&limit=${LIMIT}&appid=${process.env.API_KEY}`
  );

  const { lat, lon } = geolocation[0];

  return { lat, lon };
};
