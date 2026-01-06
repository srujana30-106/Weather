import { WeatherResponse } from "@/types/weather";

interface Props {
  weather: WeatherResponse;
  unit: "metric" | "imperial";
  className?: string;
}

export default function WeatherCard({
  weather,
  unit,
  className,
}: Props) {
  return (
    <div
      className={`bg-gradient-to-r from-blue-400 to-blue-600 
      dark:from-gray-700 dark:to-gray-900 
      p-6 rounded-xl shadow-lg text-white 
      flex flex-col items-center gap-2 
      transition-transform hover:scale-105 
      ${className ?? ""}`}
    >
      <h2 className="text-2xl font-bold">{weather.name}</h2>
      <p className="text-5xl font-extrabold">
        {weather.main.temp}°{unit === "metric" ? "C" : "F"}
      </p>
      <p className="text-xl">{weather.weather[0].main}</p>
      <div className="flex gap-6 mt-2">
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
}
