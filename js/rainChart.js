const RAIN_LEVEL_NAMES = { 100: "Rainy", 67: "Sunny", 33: "Heavy" };
let rainChart = null;


function renderRain(points, tz) {
  if (rainChart) rainChart.destroy();

  rainChart = new Chart(document.getElementById("rain-chart"), {
    type: "bar",
    data: {
      labels: points.map((p) => formatHour(p.dt, tz)),
      datasets: [
        {
          data: points.map((p) => Math.round(p.pop * 100)),
          backgroundColor: "#e5e7eb",
          borderRadius: 6,
          barThickness: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        y: {
          min: 0,
          max: 100,
          border: { display: false },
          grid: { color: "#2d2d3a", borderDash: [4, 4] },
          ticks: {
            stepSize: 100 / 3,
            color: "#9ca3af",
            font: { size: 11 },
            callback: (value) => RAIN_LEVEL_NAMES[Math.round(value)] ?? "",
          },
        },
        x: {
          border: { display: false },
          grid: { display: false },
          ticks: { color: "#9ca3af", font: { size: 9 } },
        },
      },
    },
  });
}
