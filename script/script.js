const inputCity = document.querySelector(".location-input");
const searchBtn = document.querySelector(".search-button");
const MainWeather = document.querySelector(".current-data");
const temperature = document.querySelector('.temperature span');
const humidity = document.querySelector('.humidity span');
const wind = document.querySelector('.wind span');
const name1 = document.querySelector(".location-name");
const myImage = document.getElementById("myImage");
const iconToggle = document.getElementById("toggle-night");
const themeBtn = document.getElementById("theme-button");
const weatherTxt = document.querySelector(".weather__Txt");
const dataDetails = document.querySelector(".container-box");

const dataHourly = document.querySelector(".hourly__box");
const dataDaily= document.querySelector(".daily__box");
const nightMode = document.querySelector(".imgSVG");

const API_KEY = "f41b98f79b5a6b404c03cf906efea727";
const DAILY_API = "7dd36adea4ef165d3e84d666f7c93083";

let firstImage = true;

function toggleButton(){
    if(firstImage){
        document.body.classList.toggle('night');
        document.body.classList.toggle('.search-button');
        iconToggle.src = "svg/sun-regular.svg";
        document.body.classList.toggle('body');
        
    } else {
        document.body.classList.toggle('body');
        document.body.classList.toggle('.search-button');
        iconToggle.src = "svg/moon-regular.svg";
        document.body.classList.toggle('night');
    }
    firstImage = !firstImage;
}


const getWeatherDetails = (locationName, lat, lon) => {
    const WEATHER_APP_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const locationName1 = inputCity.value
    fetch(WEATHER_APP_URL).then(res => res.json()).then(data=> { 
     // Update the weather details on the webpage
        console.log(data)
        name1.textContent = `${locationName}`;
        myImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        weatherDescription =  data.weather[0].description;
        weatherTxt.textContent = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
        temperature.textContent = `${(data.main.temp - 273.15).toFixed(2)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} m/s`;
        
    }).catch(() =>  {
        alert("an error has occurd");
        myImage.src = ``;

    })
}

const getHourlyDetails = (locationName, lat, lon) => {
    const DAILY_WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const locationName2 = inputCity.value
    fetch(DAILY_WEATHER_URL).then(res => res.json()).then(data => {
        console.log(data)
    })
}





function getCityCoords() {
    const locationName = inputCity.value.trim();
    if(!inputCity) return;
    const API_GEOCODING_KEY = `http://api.openweathermap.org/geo/1.0/direct?q=${locationName},&limit=1&appid=${API_KEY}`;

    fetch(API_GEOCODING_KEY).then(res => res.json()).then(data => {
        if(!data.length) {
        name1.textContent = `_________`;
        myImage.src = ``;
        weatherTxt.textContent = '';
        temperature.textContent = ``
        humidity.textContent = ``;
        wind.textContent = ``;
        dataDetails.classList.remove('height');
        nightMode.style.display = "none";
        dataDaily.classList.remove('show');
        dataHourly.classList.remove('show');
        }
        const { name, lat, lon } = data[0]
        getWeatherDetails(name, lat, lon)
    }).catch(() =>  {
        alert("an error has occurd");
    })
}



function dropDown(){
    dataDaily.classList.add('show');
    dataHourly.classList.add('show');
    dataDetails.classList.add('height');
    nightMode.style.display = "block";
    
}


searchBtn.addEventListener("click", getCityCoords);
searchBtn.addEventListener("click", getHourlyDetails);
themeBtn.addEventListener("click",toggleButton)
searchBtn.addEventListener("click", dropDown);

function handleKeyDown(event) {
    if(event.key === 'Enter') {
    getCityCoords();
    dropDown();
}
}


