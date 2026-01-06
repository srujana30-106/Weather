import { ForecastItem } from "@/types/weather";

interface Props {
  forecast: ForecastItem[];
  unit: "metric" | "imperial";
}

export default function Forecast({ forecast, unit }: Props) {
  const daily = forecast.filter((_, i) => i % 8 === 0).slice(0, 5);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {daily.map((item) => (
        <div
          key={item.dt_txt}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:scale-105 transform transition-all text-center"
        >
          <p className="font-medium">{item.dt_txt.split(" ")[0]}</p>
          <p className="text-2xl font-bold">
            {item.main.temp}°{unit === "metric" ? "C" : "F"}
          </p>
          <p className="text-gray-600 dark:text-gray-300">{item.weather[0].main}</p>
        </div>
      ))}
    </div>
  );
}
