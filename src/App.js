import React, {useState} from "react";
import clear from './images/clear.png';
import cloud from './images/cloud.png';
import mist from './images/mist.png';
import rain from './images/rain.png';
import snow from './images/snow.png';
import {TbWind} from 'react-icons/tb';
import {WiHumidity} from 'react-icons/wi'

function App() {

  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({});

  const api = {
    key: "abdc400aae1ce6c21bd392aaa7c237c9",
    url: "https://api.openweathermap.org/data/2.5/"
};

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.url}weather?q=${location}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setLocation('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="app">
      <div className="container">
          <div className="search-box">
            <input 
            type="text" 
            value={location} 
            onChange={event => setLocation(event.target.value)}
            onKeyPress={search}
            placeholder="Search..." />
          </div>
          {(typeof weather.main != "undefined") ? (
          <div className="location-box">
              <div className="location">{weather.name},{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            ) : ('')}

          {weather.weather ? (
          <div className="weather-box">
            {weather.weather[0].main == "Clouds" ? (
            <img src={cloud} />
            ) : ('')}
            {weather.weather[0].main == "Rain" ? (
            <img src={rain} />
            ) : ('')}
            {weather.weather[0].main == "Clear" ? (
            <img src={clear} />
            ) : ('')}
            {weather.weather[0].main == "Snow" ? (
            <img src={snow} />
            ) : ('')}
            {weather.weather[0].main == "Mist" ? (
            <img src={mist} />
            ) : ('')}
            {weather.main ? (
            <h1 className="temperature">{Math.round(weather.main.temp)}°C</h1>
            ) : ('')}
            {weather.weather ? (
            <p className="description">{weather.weather[0].main}</p>
            ) : ('')}
          </div>
          ) : ('')}

          {weather.main ? (
          <div className="weather-details">
            {weather.main ? (
            <div className="humidity">
              <WiHumidity 
              style={{
                position: 'absolute',
                top: '492px',
                left: '60px',
              }}
              fontSize="35px"/>
                <div className="text">       
                    <p className="bold">{weather.main.humidity}%</p>
                    <p>Humidity</p>
                </div>
            </div>
            ) : ('')}
            {weather.wind ? (
            <div className="wind">
              <TbWind 
              style={{
                position: 'absolute',
                top: '495px',
                left: '205px',
              }}
              fontSize="30px"
              />
                <div className="text">
                    <p className="bold">{weather.wind.speed.toFixed()} MPH</p>
                    <p>Wind speed</p>
                </div>
            </div>
            ) : ('')}
          </div>
          ) : ('')}

      </div>
    </div>
  );
}

export default App;
