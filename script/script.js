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
    document.body.classList.toggle("dark");
    document.body.classList.toggle(".search-button");
    iconToggle.src = "svg/sun-regular.svg";
    document.body.classList.toggle("body");
  } else {
    document.body.classList.toggle("body");
    document.body.classList.toggle(".search-button");
    iconToggle.src = "svg/moon-regular.svg";
    document.body.classList.toggle("dark");
  }
  firstImage = !firstImage;
}

// Inside the getWeatherDetails function, after you get the locationName:
const locationName = inputCity.value.trim();
if (!inputCity) {
  alert("not a real city");
}

function sendLocationToBackend(locationName) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "connection.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send("location_name=" + locationName);
}

const getWeatherDetails = async (locationName, lat, lon) => {
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
      const Time = data.currentConditions.datetime.split(":");

      if (Time[0] >= 12 && Time[0] < 17) {
        // It's afternoon
        document.body.classList.add("afternoon");
        document.body.classList.remove("night");
        document.body.classList.remove("morning");
      } else if (Time[0] >= 17) {
        // It's night
        document.body.classList.add("night");
        document.body.classList.remove("afternoon");
        document.body.classList.remove("morning");
      } else if (Time[0] < 12) {
        // It's morning
        document.body.classList.add("morning");
        document.body.classList.remove("afternoon");
        document.body.classList.remove("night");
      } else {
        // None of the conditions matched (this is unexpected)
        console.log("failed");
      }
      console.log(Time[0]);

      // hourly daily

      const currentHour = parseInt(
        data.currentConditions.datetime.split(":")[0],
        10
      ); // Extract hour from datetime
      const firstDayHours = data.days[0].hours;

      // Define a variable to keep track of the current day index
      let currentDayIndex = 0;

      // Concatenate data from all days' hours
      const allHoursData = data.days.reduce((accumulator, day) => {
        return accumulator.concat(day.hours);
      }, []);

      const hoursAfterCurrent = allHoursData.slice(currentHour);

      const dateTimeArray = hoursAfterCurrent.map((hour) => hour.datetime);
      const dateTemp = hoursAfterCurrent.map((hour) => hour.temp);
      const dateIcon = hoursAfterCurrent.map((hour) => hour.icon);
      const hourElements = document.querySelectorAll(".idkss");
      const tempElements = document.querySelectorAll(".temperature");
      const imageElements = document.querySelectorAll(".img_element");

      imageElements.forEach((imageElement, index) => {
        // Set the src attribute for the current image element
        imageElement.src = `images/weather/${dateIcon[index]}.svg`;
      });

      tempElements.forEach((tempElement, index) => {
        const tempSpan = tempElement.querySelector("span");
        if (tempSpan) {
          tempSpan.textContent = `${dateTemp[index]}°C` || "";
        }
      });

      hourElements.forEach((hourElement, index) => {
        const spanElement = hourElement.querySelector("span");
        if (spanElement) {
          spanElement.textContent = dateTimeArray[index] || "";
        }
      });

      // Check if we need to switch to the next day's data
      if (currentHour + dateTimeArray.length >= allHoursData.length) {
        currentDayIndex++;
      }

      console.log("Temperature values after current hour:", dateTemp);

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
  console.log(locationName);
  if (!inputCity) return;
  const API_GEOCODING_KEY = `http://api.openweathermap.org/geo/1.0/direct?q=${locationName},&limit=1&appid=${API_KEY}`;
  sendLocationToBackend(locationName);

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
        document.body.classList.remove("night");
      }
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
      alert("City not valid");
    });
}

console.log(getCityCoords);

function dropDown() {
  dataDaily.classList.add("show");
  dataHourly.classList.add("show");
  dataDetails.classList.add("height");
  nightMode.style.display = "block";
}

searchBtn.addEventListener("click", getCityCoords);

themeBtn.addEventListener("click", toggleButton);
searchBtn.addEventListener("click", dropDown);

function red() {
  let locationInput = document.querySelector(".location-input").value;
  let index = 1;

  console.log(locationInput);

  fetch("/.netlify/functions/redis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ locationInput, index }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

themeBtn.addEventListener("click", red);
searchBtn.addEventListener("click", red);

function handleKeyDown(event) {
  if (event.key === "Enter") {
    getCityCoords();
    dropDown();
    red();
  }
}
