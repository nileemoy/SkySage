import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
import { Spin } from "antd";

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [wicon, setWicon] = useState(cloud_icon);

    const api_key = process.env.REACT_APP_API_KEY;

    const search = async () => {
        try {
            const cityInput = document.getElementsByClassName("cityInput")[0].value;
            if (cityInput === "") {
                return;
            }
            setLoading(true);
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${api_key}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.weather && data.weather.length > 0) {
                const weatherIcon = data.weather[0].icon;
                setWicon(getWeatherIcon(weatherIcon));
            }

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: data.main.temp,
                location: data.name
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
        }
    }

    const getWeatherIcon = (weatherIcon) => {
        switch (weatherIcon) {
            case "01d":
            case "01n":
                return clear_icon;
            case "02d":
            case "02n":
                return cloud_icon;
            case "03d":
            case "03n":
                return drizzle_icon;
            case "04d":
            case "04n":
                return drizzle_icon;
            case "09d":
            case "09n":
                return rain_icon;
            case "10d":
            case "10n":
                return rain_icon;
            case "13d":
            case "13n":
                return snow_icon;
            default:
                return clear_icon;
        }
    }

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search' />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            {loading ? (
                <div className="loading"><Spin /></div>
            ) : (
                <>
                    <div className="weather-image">
                        <img src={wicon} alt="" />
                    </div>
                    {weatherData && (
                        <>
                            <div className="weather-temp">{weatherData.temperature}°C</div>
                            <div className="weather-location">{weatherData.location}</div>
                            <div className="data-container">
                                <div className="element">
                                    <img src={humidity_icon} alt="" className="icon" />
                                    <div className="data">
                                        <div className="humidity-percentage">{weatherData.humidity}%</div>
                                        <div className="text">Humidity</div>
                                    </div>
                                </div>
                                <div className="element">
                                    <img src={wind_icon} alt="" className="icon" />
                                    <div className="data">
                                        <div className="wind-rate">{weatherData.windSpeed} km/h</div>
                                        <div className="text">Wind Speed</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default WeatherApp;
