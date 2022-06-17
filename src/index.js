function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentTime = new Date(timestamp);
  let Day = currentTime.getDay(); //4
  let currentDay = days[Day];
  let currentHour = currentTime.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = currentTime.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let formatTime = `${currentDay} ${currentHour}:${currentMinutes}`;
  return formatTime;
}


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = 
  ` <div class="row">`; 
  forecast.forEach(function (forecastDay, index) { 
    if (index < 6) { 
    forecastHTML =
        forecastHTML +
    ` <div class="col-2">
    <div class="six-day-forecast">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42" />
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max"> ${Math.round( forecastDay.temp.max )}°/</span>
      <span class="weather-forecast-temperature-min"> ${Math.round( forecastDay.temp.min )}°</span>
    </div>
    </div>
</div> `; 
} 
});

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "be6a30eb882e3e9dfeb3beff3e0189d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#get-time");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
  }
  
function searchCity(city) {
  let apiKey = "be6a30eb882e3e9dfeb3beff3e0189d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function updateSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchCity(city.value);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(fetchCurrent);
}

function fetchCurrent(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "be6a30eb882e3e9dfeb3beff3e0189d0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}


let fetchCurrentData = document.querySelector("#find-location");
fetchCurrentData.addEventListener("click", getLocation);
let form = document.querySelector("#search-form");
form.addEventListener("submit", updateSubmit);
