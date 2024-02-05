// App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_KEY, WEATHER_API_URL } from './components/weatherApi/weatherApi';
import Forecast from './components/forecast/forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const getDefaultWeatherData = async () => {
      const mumbaiWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?q=Mumbai&appid=${WEATHER_API_KEY}&units=metric`
      );
      const mumbaiForecastFetch = fetch(
        `${WEATHER_API_URL}/onecall?lat=19.0760&lon=72.8777&exclude=current,minutely,hourly,alerts&appid=${WEATHER_API_KEY}&units=metric`
      );
      try {
        const [mumbaiWeatherResponse, mumbaiForecastResponse] = await Promise.all([
          mumbaiWeatherFetch,
          mumbaiForecastFetch
        ]);
        const mumbaiWeatherData = await mumbaiWeatherResponse.json();
        const mumbaiForecastData = await mumbaiForecastResponse.json();

        setCurrentWeather({ city: 'Mumbai', ...mumbaiWeatherData });
        setForecast({ city: 'Mumbai', forecast: mumbaiForecastData.daily });
      } catch (error) {
        console.error('Error fetching default weather data:', error);
      }
    };
    getDefaultWeatherData();
  }, []);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (responses) => {
        const [currentWeatherResponse, forecastResponse] = responses;
        const currentWeatherData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();

        setCurrentWeather({ city: searchData.label, ...currentWeatherData });
        setForecast({ city: searchData.label, forecast: forecastData.daily });
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast forecastData={forecast} />}
    </div>
  );
}

export default App;
