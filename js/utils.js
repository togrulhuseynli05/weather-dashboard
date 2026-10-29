const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const WEATHER_ICONS = {
  Clear: "images/Sunny_1.svg",
  Clouds: "images/Sunny__2__2.svg",
  Drizzle: "images/Rainy-Sunny__2__1.svg",
  Rain: "images/Rainy__2__2.svg",
  Thunderstorm: "images/RAINY-SUNNY_1.svg",
  Snow: "images/Light_SnowShower_1.svg",
  Mist: "images/Windy_1.svg",
  Haze: "images/Windy_1.svg",
  Fog: "images/Windy_1.svg",
};

function localDate(dt, tz) {
  return new Date((dt + tz) * 1000);
}

// "11:45 AM"
function formatTime(dt, tz) {
  const date = localDate(dt, tz);
  const hour = date.getUTCHours();
  const minute = String(date.getUTCMinutes()).padStart(2, "0");
  const period = hour < 12 ? "AM" : "PM";
  return `${hour % 12 || 12}:${minute} ${period}`;
}

// "10AM" (yağış qrafiki üçün)
function formatHour(dt, tz) {
  const hour = localDate(dt, tz).getUTCHours();
  const period = hour < 12 ? "AM" : "PM";
  return `${hour % 12 || 12}${period}`;
}

// Cari hava üçün gün
function formatDay(dt, tz) {
  return DAYS[localDate(dt, tz).getUTCDay()];
}

// Open-Meteo tarixini ("2026-10-29") gün adına çevirir
function dayNameFromDate(dateText) {
  // Saatı 12:00 yazırıq ki, vaxt fərqi tarixi dəyişməsin
  const date = new Date(dateText + "T12:00:00");
  return DAYS[date.getDay()];
}

// API m/s verir, dizaynda km/h lazımdır
function windKmh(metersPerSecond) {
  return (metersPerSecond * 3.6).toFixed(1);
}

// Küləyin istiqaməti: 0° = N, 90° = E, 180° = S, 270° = W
function windDirection(degrees) {
  return DIRECTIONS[Math.round(degrees / 45) % 8];
}

// Şeh nöqtəsi: API vermir, Magnus düsturu ilə hesablayırıq
function dewPoint(tempC, humidity) {
  const rh = Math.max(humidity, 1); // 0% olsa log(0) xətası verər
  const a = 17.27;
  const b = 237.7;
  const alpha = Math.log(rh / 100) + (a * tempC) / (b + tempC);
  return Math.round((b * alpha) / (a - alpha));
}

// Cari hava və şəhərlər üçün ikon. Külək 8 m/s-dən çoxdursa, küləkli ikon
function weatherIcon(condition, windMs = 0) {
  if (windMs > 8 && (condition === "Clear" || condition === "Clouds")) {
    return "images/Sunnny_Windy_Icon_1.svg";
  }
  return WEATHER_ICONS[condition] || "images/Sunny__2__2.svg";
}

// Open-Meteo hava kodunu (WMO) ikona çevirir
function dailyIcon(code) {
  if (code <= 1) return "images/Sunny_1.svg"; // açıq
  if (code <= 3) return "images/Sunny__2__2.svg"; // az buludlu / buludlu
  if (code <= 48) return "images/Windy_1.svg"; // duman
  if (code <= 57) return "images/Rainy-Sunny__2__1.svg"; // çiləyən yağış
  if (code <= 67) return "images/Rainy__2__2.svg"; // yağış
  if (code <= 77) return "images/Light_SnowShower_1.svg"; // qar
  if (code <= 82) return "images/Rainy__2__2.svg"; // yağış leysanı
  if (code <= 86) return "images/Light_SnowShower_1.svg"; // qar leysanı
  return "images/RAINY-SUNNY_1.svg"; // ildırım
}
