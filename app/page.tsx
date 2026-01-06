"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import Forecast from "@/components/Forecast";
import WeatherTable from "@/components/WeatherTable";
import ThemeToggle from "@/components/ThemeToggle";
import UnitToggle from "@/components/UnitToggle";
import Skeleton from "@/components/Skeleton";
import { WeatherResponse, ForecastItem } from "@/types/weather";
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchWeatherByCoords,
} from "@/utils/fetchWeather";

export default function Home() {
  const [city, setCity] = useState("Delhi");
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const loadWeather = async () => {
    try {
      setLoading(true);
      setError("");
      const current = await fetchCurrentWeather(city, unit);
      const forecastData = await fetchForecast(city, unit);
      setWeather(current);
      setForecast(forecastData.list);
    } catch {
      setError("City not found or network error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ AUTO LOCATION (GPS)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          setLoading(true);
          const { latitude, longitude } = pos.coords;
          const data = await fetchWeatherByCoords(latitude, longitude, unit);
          setWeather(data.current);
          setForecast(data.forecast);
        } catch {
          setError("Unable to fetch location weather");
        } finally {
          setLoading(false);
        }
      },
      () => setError("Location permission denied")
    );
  }, [unit]);

  return (
    <main className="w-full min-h-screen px-6 lg:px-16 bg-gradient-to-b from-blue-100 to-blue-50">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900">
          Weather App
        </h1>
        <div className="flex gap-4">
          <ThemeToggle />
          <UnitToggle unit={unit} setUnit={setUnit} />
        </div>
      </header>

      {/* Search */}
      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={loadWeather}
        className="mb-6"
      />

      {/* Status */}
      {loading && <Skeleton />}
      {error && (
        <p className="text-red-500 font-medium text-center my-4">{error}</p>
      )}

      {/* Weather Info */}
      {weather && !loading && (
        <div className="space-y-8">
          {/* Weather Card */}
          <WeatherCard
            weather={weather}
            unit={unit}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-transform hover:scale-105"
          />

          {/* Forecast */}
          <Forecast
            forecast={forecast}
            unit={unit}
            className="bg-white rounded-2xl shadow-md p-4 md:p-6 overflow-x-auto"
          />

          {/* Weather Table */}
          <WeatherTable
            unit={unit}
            className="bg-white rounded-2xl shadow-md p-4 md:p-6"
          />
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Weather App. Built with Next.js & Tailwind CSS.
      </footer>
    </main>
  );
}
