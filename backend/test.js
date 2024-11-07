import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;

// List of cities
const cities = ["Bengaluru", "Hyderabad", "Delhi", "Kolkata", "Mumbai", "Chennai"];
let weatherData = []; // Variable to store the latest weather data

// Fetch general weather data for all cities
const fetchWeatherData = async () => {
    try {
        const data = await Promise.all(
            cities.map(async (city) => {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
                const result = await fetch(url);
                const responseData = await result.json();
                const iconCode = responseData.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

                return {
                    city: responseData.name,
                    weather: responseData.weather[0].description,
                    temperature: responseData.main.temp,
                    humidity: responseData.main.humidity,
                    iconUrl: iconUrl,
                    updated_at: new Date().toISOString(),
                };
            })
        );

        weatherData = data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

// Fetch detailed weather information for a specific city
const fetchCityWeatherDetails = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const result = await fetch(url);
        const responseData = await result.json();

        const dailyForecasts = responseData.list.slice(0, 7).map((entry) => ({
            date: entry.dt_txt,
            temperature: entry.main.temp,
            weather: entry.weather[0].description,
            iconUrl: `http://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`,
        }));

        return {
            city: responseData.city.name,
            forecasts: dailyForecasts,
        };
    } catch (error) {
        console.error("Error fetching city weather details:", error);
        return null;
    }
};

fetchWeatherData();
setInterval(fetchWeatherData, 300000); // Fetch data every 5 minutes

app.get('/', (req, res) => {
    res.send("Welcome to the Weather API!");
});

// Endpoint to get general weather data
app.get('/weather', (req, res) => {
    res.json(weatherData);
});

// New endpoint to fetch additional city-specific weather data (e.g., 7-day forecast)
app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;
    const cityWeatherDetails = await fetchCityWeatherDetails(city);

    if (cityWeatherDetails) {
        res.json(cityWeatherDetails);
    } else {
        res.status(404).json({ error: "City weather details not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});