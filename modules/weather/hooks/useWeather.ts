import { useEffect, useState } from "react";
import type { WeatherData } from "../weather.types";
import { fetchCurrentWeather } from "../weather.service";

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadWeather = async () => {
      try {
        const data = await fetchCurrentWeather();
        if (isMounted) setWeather(data);
      } catch (error) {
        console.error("Weather fetch failed:", error);
        if (isMounted) setWeather(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadWeather();

    return () => {
      isMounted = false;
    };
  }, []);

  return { weather, loading };
};
