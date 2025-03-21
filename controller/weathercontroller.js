const axios = require('axios');
const WeatherModel = require('../model/weathermodel'); 
require('dotenv').config();
const API_KEY = process.env.OPENWEATHER_API_KEY;
const formatedDate = new Date().toLocaleString();

exports.getWeather = async (req, res) => {
    try {
        const { city } = req.query;

        if (!city) {
            return res.status(400).json({
                message: 'Please provide a city name'
            });
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);
        const { name, main, weather, wind, timezone } = response.data;
        // const utcTime = new Date(); 
        // const cityTime = new Date(utcTime.getTime() + timezone * 1000);
        const utcTime = new Date();
        const cityTime = new Date(utcTime.toUTCString());
        cityTime.setSeconds(cityTime.getSeconds() + timezone);
        
        const weatherData = {
            city: name,
            temperature: main.temp,
            condition: weather[0].description,
            wind_speed: wind.speed,
            city_time: cityTime.toLocaleString(),
            searchedAt: formatedDate
        };

        const weatherEntry = new WeatherModel(weatherData);
        await weatherEntry.save();

        console.log('Weather Data:', weatherData);

        res.status(200).json({
            message: 'Weather data fetched successfully',
            data: weatherData
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'City not Found'
        });
    }
};
