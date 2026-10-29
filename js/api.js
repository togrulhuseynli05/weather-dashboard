// Sorğu funksiyaları: OpenWeatherMap (açar lazımdır) və Open-Meteo (açar lazım deyil)

const BASE_URL = "https://api.openweathermap.org/data/2.5";

async function fetchData(url) {
  if (!WEATHER_API_KEY) {
    throw new Error("API key is empty.");
  }

  const response = await fetch(url);

  if (response.status === 404) throw new Error("City not found.");
  if (response.status === 401) throw new Error("API key is wrong.");
  if (!response.ok) throw new Error("Something went wrong.");

  return response.json();
}

function buildUrl(endpoint, city) {
  return `${BASE_URL}/${endpoint}?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;
}

function getCurrentWeather(city) {
  return fetchData(buildUrl("weather", city));
}

function getForecast(city) {
  return fetchData(buildUrl("forecast", city));
}

// 7 günlük məlumat (Open-Meteo). Cavabın "daily" hissəsini qaytarır
async function getDaily(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max&timezone=auto&forecast_days=7`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Weekly forecast could not be loaded.");
  }

  const data = await response.json();
  return data.daily;
}
