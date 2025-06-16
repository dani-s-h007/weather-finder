const apiKey = '7ed25f10a90095664e511ea5dee67b3c'; 
const weatherResult = document.getElementById('weatherResult');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const historyList = document.getElementById('historyList');

function saveToHistory(city) {
  let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
  if (!history.includes(city)) {
    history.push(city);
    localStorage.setItem('weatherHistory', JSON.stringify(history));
    updateHistory();
  }
}

function updateHistory() {
  const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
  historyList.innerHTML = '';
  history.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    historyList.appendChild(li);
  });
}

async function getWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    weatherResult.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temp: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} m/s</p>
    `;
    saveToHistory(city);
  } catch (err) {
    weatherResult.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

updateHistory();
