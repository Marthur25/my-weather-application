//1
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentTime = new Date();
let currentDay = days[currentTime.getDay()];
let currentHour = currentTime.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = currentTime.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let formatTime = `${currentDay} ${currentHour}:${currentMinutes}`;

let time = document.querySelector("#get-time");
time.innerHTML = `${formatTime}`;

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let locationElement = document.querySelector("#location");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
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
}












//2
function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
}

function convertTofahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(temperature * 1.8 + 32);
}
let fahlink = document.querySelector("#fahlink");
fahlink.addEventListener("click", convertTofahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = "19";
}
let cellink = document.querySelector("#cellink");
cellink.addEventListener("click", convertToCelsius);

//week 5
function updateSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "be6a30eb882e3e9dfeb3beff3e0189d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "be6a30eb882e3e9dfeb3beff3e0189d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}


//mine

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", updateSubmit);

let updateLocation = document.querySelector("#find-location");
updateLocation.addEventListener("click", getLocation);
