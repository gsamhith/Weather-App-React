import { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";

const WeatherChart = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch("http://localhost:3000/weather");
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-3xl font-bold text-gray-600">
          Loading Weather Data...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-8 justify-center bg-sky-300">
      {weatherData.map((cityData, index) => (
        <WeatherCard
          key={index}
          city={cityData.city}
          weather={cityData.weather}
          temperature={cityData.temperature}
          humidity={cityData.humidity}
          lastUpdated={new Date(cityData.updated_at).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          iconUrl={cityData.iconUrl}
        />
      ))}
    </div>
  );
};

export default WeatherChart;