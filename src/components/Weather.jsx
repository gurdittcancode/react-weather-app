import { useState } from "react";
import axios from "axios";
import "./Weather.css";

function Weather() {
  const API_KEY = "7ccd62e4c038094ac2af3e0b8c3bdda9";

  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState("");

  const weatherImages = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Humidity",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
    {
      type: "Windy",
      img: "https://cdn-icons-png.flaticon.com/512/4150/4150819.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/990/990395.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/4151/4151022.png",
    },
  ];

  const handleChange = (evt) => {
    evt.preventDefault();
    setSearchTerm(evt.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${API_KEY}&units=metric`;

      const response = await axios.get(URL);
      console.log(response);
      const data = response.data;
      console.log(data.weather[0].main);

      setWeatherIcon(
        weatherImages.find((w) => w.type === data.weather[0].main)
      );

      setWeatherData(data);
      setSearchTerm("");
    } catch (err) {
      console.log("Location not found");
      setWeatherIcon({
        type: "Not Found",
        img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
      });
    }
  };

  return (
    <div className="container">
      <div className="search-field">
        <input
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleChange}
          value={searchTerm}
          autoFocus
        />
        <div className="search-icon">
          <img
            src="https://cdn-icons-png.flaticon.com/512/10905/10905219.png"
            alt="..."
            onClick={fetchWeatherData}
          />
        </div>
      </div>

      <div className="weather-container">
        {weatherData && (
          <div className="weather-location">
            {weatherData.name}, {weatherData.sys.country}
          </div>
        )}
        {weatherIcon && (
          <>
            <div className="weather-image">
              <img src={weatherIcon.img} alt="..." />
            </div>
            <h3>{weatherIcon.type}</h3>
          </>
        )}
        {weatherData && (
          <div className="weather-temp">{weatherData.main.temp} °C</div>
        )}
        <div className="data-container">
          {weatherData && (
            <div className="element">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1197/1197102.png"
                alt=""
                className="icon"
              />
              <div className="data">
                <div className="humidity">{weatherData.main.humidity}%</div>
                <div className="category">Humidity</div>
              </div>
            </div>
          )}

          {weatherData && (
            <div className="element">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4150/4150819.png"
                alt=""
                className="icon"
              />
              <div className="data">
                <div className="wind-speed">{weatherData.wind.speed} km/h</div>
                <div className="category">Wind Speed</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
