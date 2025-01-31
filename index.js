import express from "express";
import "dotenv/config";
import {
  getCoordsOfCity,
  getCurrentWeather,
  getForecastData
} from "./services/weatherService.js";

const app = express();
app.use(express.json());

const PORT = 8080;

app.get("/weather/:city", async (req, res) => {
  try {
    const { city } = req.params;
    const { lat, lon } = await getCoordsOfCity(city);
    const weatherResponse = await getCurrentWeather(lat, lon);
    const forecastResponse = await getForecastData(lat, lon);

    res.json({
      city,
      temp: Math.round(weatherResponse.main.temp),
      feelsLike: Math.round(weatherResponse.main.feels_like),
      description: weatherResponse.weather[0].description,
      forecast: forecastResponse.list.slice(0, 12).map((item) => ({
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        time: item.dt_txt
      }))
    });
  } catch (error) {
    res.status(500).json({ error: "!!!!!" + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
