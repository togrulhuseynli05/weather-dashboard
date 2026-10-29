// Səhifənin əsas hissəsi: məlumatı çəkir və ekrana yazır

const DEFAULT_CITY = "Baku";
const OTHER_CITIES = [
  "Beijing,CN",
  "California,US",
  "Dubai,AE",
  "Charlottetown,CA",
];

const COUNTRY_NAMES = {
  CN: "China",
  US: "United States",
  AE: "United Arab Emirates",
  CA: "Canada",
};

// id-si verilmiş elementin yazısını dəyişir
function setText(id, text) {
  document.getElementById(id).textContent = text;
}

//(loading və ya xəta)
function setStatus(text, isError = false) {
  const status = document.getElementById("status");
  status.textContent = text;
  status.className = isError ? "status error" : "status";
}

async function searchCity(city) {
  setStatus("Loading weather...");
  try {
    const current = await getCurrentWeather(city);
    const forecast = await getForecast(city);
    const daily = await getDaily(current.coord.lat, current.coord.lon);
    showWeather(current, forecast, daily);
    setStatus("");
  } catch (error) {
    setStatus(error.message, true);
  }
}

// Bütün kartları doldurur
function showWeather(current, forecast, daily) {
  const tz = current.timezone;
  const weather = current.weather[0];

  setText("location", `${current.name}, ${current.sys.country}`);

  // Bugünün kartı
  setText("today-day", formatDay(current.dt, tz));
  setText("today-time", formatTime(current.dt, tz));
  setText("today-temp", `${Math.round(current.main.temp)}°`);
  setText("today-desc", weather.description);
  document.getElementById("today-icon").src = weatherIcon(
    weather.main,
    current.wind.speed,
  );
  setText("today-feel", `${Math.round(current.main.feels_like)}°`);
  setText(
    "today-wind",
    `${windDirection(current.wind.deg)} ${windKmh(current.wind.speed)} km/h`,
  );
  setText("today-pressure", `${current.main.pressure} hPa`);
  setText("today-humidity", `${current.main.humidity}%`);
  setText("today-sunrise", formatTime(current.sys.sunrise, tz));
  setText("today-sunset", formatTime(current.sys.sunset, tz));

  // Today's Overview
  setText("wind-speed", windKmh(current.wind.speed));
  setText("wind-time", formatTime(current.dt, tz));
  setText("humidity-value", `${current.main.humidity}%`);
  setText(
    "dew-point",
    `The dew point is ${dewPoint(current.main.temp, current.main.humidity)}° right now`,
  );
  setText("visibility-value", (current.visibility / 1000).toFixed(1));
  setText(
    "visibility-text",
    current.visibility < 5000
      ? "Haze is affecting visibility"
      : "Visibility is good",
  );

  showWeekForecast(daily);
  renderRain(forecast.list.slice(0, 6), tz);
}

// Həftəlik kartlar
function showWeekForecast(daily) {
  let html = "";

  for (let i = 1; i < daily.time.length; i++) {
    const dayName = dayNameFromDate(daily.time[i]).slice(0, 3).toUpperCase();
    const icon = dailyIcon(daily.weather_code[i]);
    const maxTemp = Math.round(daily.temperature_2m_max[i]);

    html += `
      <article class="widget week-card">
        <span class="week-day">${dayName}</span>
        <img src="${icon}" alt="" />
        <span class="week-temp">${maxTemp}°</span>
      </article>`;
  }

  document.getElementById("week-grid").innerHTML = html;
}

// Other Cities
async function loadOtherCities() {
  let html = "";

  for (const city of OTHER_CITIES) {
    try {
      const data = await getCurrentWeather(city);
      html += cityCardHtml(data);
    } catch (error) {
      console.log(`${city} tapılmadı: ${error.message}`);
    }
  }

  document.getElementById("city-list").innerHTML = html;
}

// Bir şəhər üçün kartın HTML-i
function cityCardHtml(data) {
  const country = COUNTRY_NAMES[data.sys.country] || data.sys.country;
  const icon = weatherIcon(data.weather[0].main, data.wind.speed);

  return `
    <li class="widget city-card">
      <div>
        <p class="muted small">${country}</p>
        <p class="city-name">${data.name}</p>
        <p class="muted small cap">${data.weather[0].description}</p>
      </div>
      <img class="city-icon" src="${icon}" alt="" />
    </li>`;
}

// Enter və ya lupa düyməsi ilə axtarış
document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("city-input").value.trim();
  if (city) searchCity(city);
});

searchCity(DEFAULT_CITY);
loadOtherCities();
