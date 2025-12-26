"use client";

import { useState, useEffect } from "react";
import { WeatherData } from "../weather.types";
import { WeatherService } from "../weather.service";

interface UseWeatherReturn {
  weather: WeatherData | null;
  loading:boolean;
}

export const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);


  // Fetch weather using the service and validate response
useEffect(() => {
    let isMounted = true;

    const fetchWeather = async () => {
      try {
        const data = await WeatherService.fetchCurrentWeather();
        if (!data) throw new Error("Invalid weather response");
        if (isMounted) setWeather(data);
      } catch (err) {
        console.error("Weather fetch failed", err);
        if (isMounted) setWeather(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchWeather();
    return () => {
      isMounted = false; //clean up function to prevent update data when noe called. 
    };
  }, []);

  return { weather,loading};
};

// Enhanced: Map weather to season primarily based on temperature (°F), with condition as tiebreaker
export const getSeasonFromWeather = (weather: WeatherData): string => {
  const temp = weather.temperature;
  const condition = weather.condition.toLowerCase();

  // Validate temperature
  if (typeof temp !== "number" || isNaN(temp)) {
    return "fall"; // <-- Changed from "autumn" to "fall" to match data types (e.g., Prisma enum "FALL")
  }

  // Temperature-based mapping
  if (temp > 75) {
    return "summer"; // Hot
  } else if (temp >= 60) {
    // Mild range: Use condition to distinguish fall vs. summer edge
    return condition === "sunny" ? "summer" : "fall"; // <-- Changed "autumn" to "fall"
  } else if (temp >= 45) {
    // Cooler range: Use condition for spring vs. fall edge
    return condition === "rainy" || condition === "drizzle" ? "spring" : "fall"; // <-- Changed "autumn" to "fall"
  } else {
    // Cold: Winter, but check for snowy
    return condition === "snowy" ? "winter" : "spring";
  }
};
