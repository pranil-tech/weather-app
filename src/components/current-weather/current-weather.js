import React, { useState } from 'react';
import './current-weather.css';

const CurrentWeather = ({ data }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  const convertTemperature = (temperature) => {
    return isCelsius ? `${Math.round(temperature)} °C` : `${Math.round((temperature * 9) / 5 + 32)} °F`;
  };

  const getDayAndDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className='weather'>
      <div className='top'>
        <div className='info'>
          <p className='city'>{data.city}</p>
          <p className='day'>{getDayAndDate(data.dt)}</p>
          <p className='weather-description'>{data.weather[0].description}</p>
        </div>
        <img alt='weather' className='weather-icon' src={`./icons/${data.weather[0].icon}.png`} />
      </div>
      <div className='bottom'>
        <div className='temperature-details'>
          <span className='parameter-value'>Feels Like</span>
          <p className='temperature'>{convertTemperature(data.main.temp)}</p>
        </div>
        <div className='details'>
          <div className='parameter-row'>
            <span className='parameter-label'>MinTemp</span>
            <span className='parameter-value'>{convertTemperature(data.main.temp_min)}</span>
          </div>
          <div className='parameter-row'>
            <span className='parameter-label'>MaxTemp</span>
            <span className='parameter-value'>{convertTemperature(data.main.temp_max)}</span>
          </div>
          <div className='parameter-row'>
            <span className='parameter-label'>Wind</span>
            <span className='parameter-value'>{data.wind.speed} m/s</span>
          </div>
          <div className='parameter-row'>
            <span className='parameter-label'>Humidity</span>
            <span className='parameter-value'>{data.main.humidity} %</span>
          </div>
        </div>
      </div>
      <div className='toggle-container'>
        <label>
          <input type='checkbox' checked={isCelsius} onChange={toggleTemperatureUnit} />
          <span>°C / °F</span>
        </label>
      </div>
    </div>
  );
};

export default CurrentWeather;
