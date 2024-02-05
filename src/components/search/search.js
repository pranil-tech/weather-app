// Search.js
import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { getWeatherData } from '../weatherApi/weatherApi';


const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/find?q=${inputValue}&appid=83fd155833a628094105b036293699c5&units=metric`, // Replace with your API key
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.list.map((city) => {
            return {
              value: `${city.coord.lat} ${city.coord.lon}`,
              label: `${city.name}, ${city.sys.country}`,
            };
          }),
        };
      });
  };

  const handleOnChange = async (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);

    // Get current weather data when a city is selected
    const weatherData = await getWeatherData(searchData.label.split(',')[0]);
    console.log('Current Weather Data:', weatherData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
