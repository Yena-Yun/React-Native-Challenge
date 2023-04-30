export interface WeatherType {
  clouds: number;
  temp: number;
  tempMin: number;
  tempMax: number;
  weather: string;
  weatherIcon: string;
  rain?: number;
  snow?: number;
  wind: number;
}
