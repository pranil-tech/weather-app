import React, { useState } from "react";
import "./forecast.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const Forecast = ({ data }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  if (!data || !data.list) {
    return <div>Loading...</div>;
  }

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <div className="forecast-container">
      <label className="title">5 Day Forecast</label>
      <div className="toggle-container">
        <label>
          <input
            type="checkbox"
            checked={isCelsius}
            onChange={toggleTemperatureUnit}
          />
          <span>Toggle for °C/°F</span>
        </label>
      </div>
      <div className="daily">
        {data.list.slice(0, 5).map((item, idx) => (
          <div key={idx} className="forecast-box">
            <div className="forecast-top">
              <div className="forecast-city-info">
                <label className="forecast-city">{data.city.name}</label>
                <div className="time-info">
                  <span className="forecast-day">{forecastDays[idx]}, </span>
                  <label className="forecast-date">
                    {getDateFromTimestamp(item.dt)}
                  </label>
                </div>
                <span className="forecast-description">
                  {item.weather[0].description}
                </span>
              </div>
              <img
                alt="forecast"
                className="forecast-icon"
                src={`./weather-app/icons/${item.weather[0].icon}.png`}
              />
            </div>
            <div className="forecast-bottom">
              <div className="daily-details-grid-item">
                <span className="parameter-label">Average Temperature</span>
                <span className="parameter-value">
                  {isCelsius
                    ? `${item.main.temp} °C`
                    : `${(item.main.temp * 9) / 5 + 32} °F`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
