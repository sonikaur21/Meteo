function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let percentageElement = document.querySelector("#percentage");
  percentageElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windsElement = document.querySelector("#winds");
  windsElement.innerHTML = `${response.data.wind.speed} km/h`;

  temperatureElement.innerHTML = Math.round(temperature);

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = ` <img src= "${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city); //added
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "79e2b848de54da3deo0aafeff8t7fa08";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  // added this whole function
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  //added
  let apiKey = "79e2b848de54da3deo0aafeff8t7fa08"; //added
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`; //added
  console.log(apiUrl); //added
  axios(apiUrl).then(displayForecast); //added
}
function displayForecast(response) /*inserted response in the paranthesis */ {
  console.log(response.data); //added

  // let days = ["Tue", "Wed", "Thu", "Fri", "Sat"]; deleted
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    //added index
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
  <div class="weather-forecast-date">${formatDay(day.time)}</div>
  <div class="weather-forecast-icon"> <img src="${
    day.condition.icon_url
  }" /></div>
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
      <strong>${Math.round(day.temperature.maximum /*added*/)}°</strong> 
    </div>
    <div class="weather-forecast-temperature">${Math.round(
      day.temperature.minimum // added
    )}°</div>
  </div>
  </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
//deleted this line
