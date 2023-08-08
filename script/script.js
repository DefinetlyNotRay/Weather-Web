const inputCity = document.querySelector(".location-input");
const searchBtn = document.querySelector(".search-button");
const MainWeather = document.querySelector(".current-data");
const temperature = document.querySelector(".temperature span");
const humidity = document.querySelector(".humidity span");
const wind = document.querySelector(".wind span");
const name1 = document.querySelector(".location-name");
const myImage = document.getElementById("myImage");
const iconToggle = document.getElementById("toggle-night");
const themeBtn = document.getElementById("theme-button");
const weatherTxt = document.querySelector(".weather__Txt");
const dataDetails = document.querySelector(".container-box");
const weatherDescription = document.querySelector(".weather__Txt");
const dataHourly = document.querySelector(".hourly__box");
const dataDaily = document.querySelector(".daily__box");
const nightMode = document.querySelector(".imgSVG");
const dailyTemp = document.querySelectorAll(".temperature__daily span");
const dailyImg = document.querySelectorAll(".img-daily");
const dayElements = document.querySelectorAll(".day.one");
const hourl = document.querySelectorAll(".idkss.one");
const daysWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const API_KEY = "f41b98f79b5a6b404c03cf906efea727";
const API_KEY2 = "RL72T94M95NFUXT3A2YVPKC4P";
const DAILY_API = "7dd36adea4ef165d3e84d666f7c93083";

let firstImage = true;

function toggleButton() {
  if (firstImage) {
    document.body.classList.toggle("night");
    document.body.classList.toggle(".search-button");
    iconToggle.src = "svg/sun-regular.svg";
    document.body.classList.toggle("body");
  } else {
    document.body.classList.toggle("body");
    document.body.classList.toggle(".search-button");
    iconToggle.src = "svg/moon-regular.svg";
    document.body.classList.toggle("night");
  }
  firstImage = !firstImage;
}

const getWeatherDetails = (locationName, lat, lon) => {
  const WEATHER_APP_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${API_KEY2}&unitGroup=metric&contentType=json `;

  const locationName1 = inputCity.value;
  fetch(WEATHER_APP_URL)
    .then((res) => res.json())
    .then((data) => {
      // Update the weather details on the webpage
      console.log(data);
      name1.textContent = `${locationName}`;
      myImage.src = `images/weather/${data.currentConditions.icon}.svg`;
      weatherDescription.textContent = data.currentConditions.conditions;
      temperature.textContent = `${data.currentConditions.temp}°C`;
      humidity.textContent = `${data.currentConditions.humidity}%`;
      wind.textContent = `${data.currentConditions.windspeed} Km/s`;

      // night mode and sun mode
      const currentTime = data.currentConditions.datetime.split(":");

      if (currentTime[0] > 12) {
        document.body.classList.toggle("night");
      } else {
        document.body.classList.toggle("body");
      }
      console.log(yes);

      // hourly daily
      data.days[0].hours.forEach((hourss, index) => {
        const split = hourss.datetime.split(":");

        if (split > currentTime) {
          hourl[index].querySelector("span").textContent = `${split[0]}`;
          console.log(split);
        }
      });
      console.log(currentTime);

      //daily stuff

      data.days.slice(1, 6).forEach((element, index) => {
        const indexCount = index + 1;
        const icons = element.icon;
        const temp = element.temp;
        const hi = data.days[indexCount].datetime;
        const d = new Date(hi);
        const dayIndex = d.getDay();
        const dayName = daysWeek[dayIndex];

        dayElements[index].querySelector("span").textContent = dayName;
        dailyImg[index].src = `images/weather/${icons}.svg`;
        dailyTemp[index].textContent = `${temp}°C`;
      });
    })
    .catch(() => {
      alert("an error has occurd");
      myImage.src = ``;
    });
};

function getCityCoords() {
  const locationName = inputCity.value.trim();
  if (!inputCity) return;
  const API_GEOCODING_KEY = `http://api.openweathermap.org/geo/1.0/direct?q=${locationName},&limit=1&appid=${API_KEY}`;

  fetch(API_GEOCODING_KEY)
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) {
        name1.textContent = `_________`;
        myImage.src = ``;
        weatherTxt.textContent = "";
        temperature.textContent = ``;
        humidity.textContent = ``;
        wind.textContent = ``;
        dataDetails.classList.remove("height");
        nightMode.style.display = "none";
        dataDaily.classList.remove("show");
        dataHourly.classList.remove("show");
      }
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
      alert("an error has occurd");
    });
}

function dropDown() {
  dataDaily.classList.add("show");
  dataHourly.classList.add("show");
  dataDetails.classList.add("height");
  nightMode.style.display = "block";
}

searchBtn.addEventListener("click", getCityCoords);

themeBtn.addEventListener("click", toggleButton);
searchBtn.addEventListener("click", dropDown);

function handleKeyDown(event) {
  if (event.key === "Enter") {
    getCityCoords();
    dropDown();
  }
}
