import { useEffect, useState } from "react";
import { WeatherResponse } from "@/types/weather";
import { fetchCurrentWeather } from "@/utils/fetchWeather";

const cities = [
  "Delhi","Mumbai","Chennai","Kolkata","London",
  "Paris","Tokyo","Sydney","New York","Berlin",
  "Dubai","Rome","Madrid","Toronto","Beijing",
  "Seoul","Bangkok","Moscow","Singapore","Hong Kong",
  "Los Angeles","Chicago","Houston","Phoenix","Boston"
];

interface Props {
  unit: "metric" | "imperial";
}

export default function WeatherTable({ unit }: Props) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<WeatherResponse[]>([]);

  useEffect(() => {
    Promise.all(cities.map((c) => fetchCurrentWeather(c, unit))).then(setData);
  }, [unit]);

  const pageData = data.slice(page * 5, page * 5 + 5);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 overflow-x-auto">
      <h3 className="font-bold text-lg mb-2">Weather Table</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="p-2">City</th>
            <th className="p-2">Temp</th>
            <th className="p-2">Condition</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((w) => (
            <tr key={w.name} className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <td className="p-2">{w.name}</td>
              <td className="p-2">{w.main.temp}</td>
              <td className="p-2">{w.weather[0].main}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 mt-2 justify-center">
        <button className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition" onClick={() => setPage((p) => Math.max(p - 1, 0))}>Prev</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition" onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}
