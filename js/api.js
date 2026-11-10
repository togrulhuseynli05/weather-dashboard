// OpenWeatherMap və Open-Meteo sorğuları.
// Xəta mesajları js/messages.js faylındadır.

const BASE_URL = "https://api.openweathermap.org/data/2.5";


async function fetchData(url) {
  if (!WEATHER_API_KEY) {
    throw new Error(MESSAGES.apiKeyEmpty);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(getStatusMessage(response.status));
  }

  return response.json();
}

// URL düzəldir: endpoint (weather və ya forecast) və şəhər adı
function buildUrl(endpoint, city) {
  return `${BASE_URL}/${endpoint}?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;
}

// Cari hava
function getCurrentWeather(city) {
  return fetchData(buildUrl("weather", city));
}

// 3 saatlıq proqnoz
function getForecast(city) {
  return fetchData(buildUrl("forecast", city));
}

// Open-Meteo: açar lazım deyil. Cavabın "daily" hissəsini qaytarır
async function getDaily(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max&timezone=auto&forecast_days=7`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(MESSAGES.weeklyFailed);
  }

  const data = await response.json();
  return data.daily;
}