import React from "react";
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
      <div className="daily">
        {data.list.slice(0, 5).map((item, idx) => (
          <div key={idx} className="forecast-box">
            <div className="top">
              <div className="info">
                <label className="city">{data.city.name}</label>
                <span className="day">{forecastDays[idx]}</span>
                <label className="date">{getDateFromTimestamp(item.dt)}</label>
                <span className="weather-description">
                  {item.weather[0].description}
                </span>
              </div>
              <img
                alt="forecast"
                className="forecast-icon"
                src={`./weather-app/icons/${item.weather[0].icon}.png`}
              />
            </div>
            <div className="bottom">
              <div className="daily-details-grid-item">
                <span className="parameter-label">Max Temp</span>
                <span className="parameter-value">{item.main.temp_max} °C</span>
              </div>
              <div className="daily-details-grid-item">
                <span className="parameter-label">Min Temp</span>
                <span className="parameter-value">{item.main.temp_min}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
