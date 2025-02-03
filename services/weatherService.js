import axios from "axios";
import "dotenv/config";

const KEY = process.env.API_KEY;

export async function getCoordsOfCity(city) {
  try {
    const { data } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${KEY}`
    );

    if (data.length === 0) {
      throw new Error("City not found");
    }

    const { lat, lon } = data[0];
    return { lat, lon };
  } catch (error) {
    throw new Error("Error while fetching coordinates: " + error.message);
  }
}

export async function getCurrentWeather(lat, lon) {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`
    );
    return data;
  } catch (error) {
    throw new Error(
      "Error while fetching current weather data: " + error.message
    );
  }
}

export async function getForecastData(lat, lon) {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`
    );
    return data;
  } catch (error) {
    throw new Error("Error while fetching forecast data: " + error.message);
  }
}
