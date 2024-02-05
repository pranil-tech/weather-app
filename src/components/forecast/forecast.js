// Forecast.js

import React, { useState } from 'react';
import './forecast.css';

const Forecast = ({ forecastData }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const convertTemperature = (temperature) => {
    return isCelsius ? `${Math.round(temperature)} °C` : `${Math.round((temperature * 9) / 5 + 32)} °F`;
  };

  const getDayOfWeek = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'short', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Debugging: Log forecastData to the console
  console.log('forecastData:', forecastData);

  // Check if forecastData is available and has the expected structure
  if (!forecastData || !Array.isArray(forecastData.list)) {
    // Debugging: Log the reason for not rendering
    console.log('Invalid forecastData structure or missing data.');
    return null; // or display an error message
  }

  // Use forecastData.list directly if it contains the list of forecast days
  const forecastDays = forecastData.list.slice(0, 5);

  return (
    <div className='forecast-container'>
      {/* ... rest of the component unchanged */}
    </div>
  );
};

export default Forecast;
