let now = new Date();
let h5 = document.querySelector("h5");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h5.innerHTML = `${day} ${hours}:${minutes}`;

searchCity("Prague");

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "065d55f0dc357d457b78c1ad371a7843";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let current = document.querySelector("#location");
current.addEventListener("click", getCurrentLocation);

// Show typed city and temp
function showTemperature(response) {
  document.querySelector("#city").innerHTML = `${response.data.name} `;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels_like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
// Search city
function searchCity(city) {
  let citySearch = document.querySelector("#city-input").value;
  let apiKey = "065d55f0dc357d457b78c1ad371a7843";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
// Type city
function CityFill(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  city.innerHTML = cityInput.value;
  searchCity(cityInput);
}

let fillIn = document.querySelector("#search-form");
fillIn.addEventListener("submit", CityFill);
