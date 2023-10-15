const inputCity = document.querySelector(".location-input");
const searchBtn = document.querySelector(".search-button");
const MainWeather = document.querySelector(".current-data");
const temperature = document.querySelector(".temperature span");
const temp = document.querySelector(".temp");
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
const dailyTemp = document.querySelectorAll(".plswork ");
const dailyImg = document.querySelectorAll(".img-daily");
const dayElements = document.querySelectorAll(".day.one");
const hourl = document.querySelectorAll(".idkss.one");
const tempIcon = document.querySelector(".temp__icon");
const tempElements = document.querySelectorAll(".temp__hourly");
const tempDailyElements = document.querySelectorAll(".temp__dailies");

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
    iconToggle.src = "svg/sun-regular.svg";
    document.body.classList.remove("morning");
    document.body.classList.remove("afternoon");
    document.body.classList.remove("night");
  } else {
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
const tempButton = document.querySelector(".temp__button");

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
      temp.textContent = `${data.currentConditions.temp}`;
      tempIcon.textContent = ` °C`;
      humidity.textContent = `${data.currentConditions.humidity}%`;
      wind.textContent = `${data.currentConditions.windspeed} Km/s`;

      //databaase post
      fetch("/.netlify/functions/redis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locationName }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));

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
      const imageElements = document.querySelectorAll(".img_element");

      imageElements.forEach((imageElement, index) => {
        // Set the src attribute for the current image element
        imageElement.src = `images/weather/${dateIcon[index]}.svg`;
      });

      tempElements.forEach((tempElement, index) => {
        const tempSpan = tempElement.querySelector("span");
        const iconSpan = tempElement.querySelector(".hourly_temp__icon");
        tempSpan.textContent = `${dateTemp[index]}` || "";
        iconSpan.textContent = `°C`;
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
        dailyTemp[index].textContent = `${temp}`;
        console.log(element);
        tempDailyElements.forEach((tempElement, index) => {
          const iconSpan = tempElement.querySelector(".daily_temp__icon");
          iconSpan.textContent = `°C`;
        });
      });
    })
    .catch(() => {
      alert("an error has occurd");
      myImage.src = ``;
    });

  tempButton.setAttribute("data-temp", "celcius");
};

function getCityCoords() {
  const locationName = inputCity.value.trim();
  console.log(locationName);
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

tempButton.addEventListener("click", () => {
  const tempConvert = parseFloat(temp.textContent);
  const dataTemp = tempButton.getAttribute("data-temp");

  switch (dataTemp) {
    case "fahrenheit":
      tempElements.forEach((tempElement) => {
        const tempSpan = tempElement.querySelector("span");
        const iconSpan = tempElement.querySelector(".hourly_temp__icon");
        const tempConvert = parseFloat(tempSpan.textContent);
        const toFahrenheit = (((tempConvert - 32) * 5) / 9).toFixed(1);
        tempSpan.textContent = removeTrailingZero(toFahrenheit);
        iconSpan.textContent = "°C";
      });

      tempDailyElements.forEach((tempElement) => {
        const tempSpan = tempElement.querySelector("span");
        const iconSpan = tempElement.querySelector(".daily_temp__icon");
        const tempConvert = parseFloat(tempSpan.textContent);
        const toFahrenheit = (((tempConvert - 32) * 5) / 9).toFixed(1);
        tempSpan.textContent = removeTrailingZero(toFahrenheit);
        iconSpan.textContent = "°C";
      });
      break;

    case "celcius":
      tempElements.forEach((tempElement) => {
        const tempSpan = tempElement.querySelector("span");
        const iconSpan = tempElement.querySelector(".hourly_temp__icon");
        const tempConvert = parseFloat(tempSpan.textContent);
        const toCelcius = (tempConvert * 1.8 + 32).toFixed(1);
        tempSpan.textContent = removeTrailingZero(toCelcius);
        iconSpan.textContent = "°F";
      });

      tempDailyElements.forEach((tempElement) => {
        const tempSpan = tempElement.querySelector("span");
        const iconSpan = tempElement.querySelector(".daily_temp__icon");
        const tempConvert = parseFloat(tempSpan.textContent);
        const toCelcius = (tempConvert * 1.8 + 32).toFixed(1);
        tempSpan.textContent = removeTrailingZero(toCelcius);
        iconSpan.textContent = "°F";
      });
      break;
  }

  if (dataTemp === "fahrenheit") {
    const toFahrenheit = (((tempConvert - 32) * 5) / 9).toFixed(1);
    tempButton.setAttribute("data-temp", "celcius");
    tempButton.textContent = " | °F";
    tempIcon.textContent = `°C`;
    temp.textContent = removeTrailingZero(toFahrenheit);
  } else {
    const toCelcius = ((tempConvert * 9) / 5 + 32).toFixed(1);
    tempButton.setAttribute("data-temp", "fahrenheit");
    tempButton.textContent = " | °C";
    tempIcon.textContent = `°F`;
    temp.textContent = removeTrailingZero(toCelcius);
  }
});

function removeTrailingZero(value) {
  return parseFloat(value).toString(); // Converts to string to remove trailing zeros
}

searchBtn.addEventListener("click", getCityCoords);
themeBtn.addEventListener("click", toggleButton);
searchBtn.addEventListener("click", dropDown);

// function red() {
//   const locationInput = document.querySelector(".location-input").value;
// }

// themeBtn.addEventListener("click", red);
// searchBtn.addEventListener("click", red);

function handleKeyDown(event) {
  if (event.key === "Enter") {
    getCityCoords();
    dropDown();
  }
}
