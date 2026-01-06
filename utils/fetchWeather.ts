import { WeatherResponse, ForecastItem } from "@/types/weather";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const fetchCurrentWeather = async (
  city: string,
  unit: "metric" | "imperial"
): Promise<WeatherResponse> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error();
  return res.json();
};

export const fetchForecast = async (
  city: string,
  unit: "metric" | "imperial"
): Promise<{ list: ForecastItem[] }> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error();
  return res.json();
};

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number,
  unit: "metric" | "imperial"
): Promise<{ current: WeatherResponse; forecast: ForecastItem[] }> => {
  const currentRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
  );
  const forecastRes = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
  );

  if (!currentRes.ok || !forecastRes.ok) throw new Error();

  const current = await currentRes.json();
  const forecastData = await forecastRes.json();

  return { current, forecast: forecastData.list };
};
