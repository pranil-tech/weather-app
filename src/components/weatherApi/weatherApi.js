// weatherApi.js
import axios from 'axios';

export const WEATHER_API_KEY = '83fd155833a628094105b036293699c5';
export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = async (cityName) => {
  try {
    const response = await axios.get(`${WEATHER_API_URL}/weather`, {
      params: {
        q: cityName,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    });

    return {
      cityName: response.data.name,
      country: response.data.sys.country,
      weather: response.data.weather[0].main,
      temperature: response.data.main.temp,
      // Add more details as needed
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export { getWeatherData };
