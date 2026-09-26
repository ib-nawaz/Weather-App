let cityInput = document.querySelector("#cityInput");
let searchBtn = document.querySelector("#searchBtn");
let errorMessage = document.querySelector("#errorMessage");

let cityName = document.querySelector("#cityName");
let countryName = document.querySelector("#countryName");
let weatherIcon = document.querySelector("#weatherIcon");
let temperature = document.querySelector("#temperature");
let weatherCondition = document.querySelector("#weatherCondition");
let feelsLike = document.querySelector("#feelsLike");

let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let visibility = document.querySelector("#visibility");

let sunrisetext = document.querySelector("#sunrise");
let sunsettext = document.querySelector("#sunset");

let dateElement = document.querySelector("#date");
let timeElement = document.querySelector("#time");

let timeInterval;
let currentTimezone = null;

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

function updateDateTime() {

    let now = new Date();
    let cityTime;

    if (currentTimezone === null) {
        cityTime = now;
    } else {
        cityTime = new Date(
            now.getTime() +
            now.getTimezoneOffset() * 60000 +
            currentTimezone * 1000
        );
    }

    let day;
    let date;
    let month;

    if (currentTimezone === null) {
        day = days[cityTime.getDay()];
        date = cityTime.getDate();
        month = months[cityTime.getMonth()];
        
    } else {
        day = days[cityTime.getUTCDay()];
        date = cityTime.getUTCDate();
        month = months[cityTime.getUTCMonth()];
    }

    dateElement.textContent = `${day}, ${date} ${month}`;

    timeElement.textContent = cityTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

function showSunTime(timestamp, element) {

    let sunTime = new Date(
        (timestamp + currentTimezone) * 1000
    );

    let hour = sunTime.getUTCHours();
    let minute = sunTime.getUTCMinutes();

    let ampm = "AM";

    if (hour >= 12) {
        ampm = "PM";
    }

    if (hour > 12) {
        hour = hour - 12;
    }

    if (hour === 0) {
        hour = 12;
    }

    if (minute < 10) {
        minute = "0" + minute;
    }

    element.textContent = `${hour}:${minute} ${ampm}`;
}

async function WeatherApi() {

    try {

        let text = cityInput.value.trim();

        if (!text) {
            return;
        }

        let api = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${text}&APPID=975dad23652f9a3a0433704148f66078`
        );

        let data = await api.json();

        if (data.cod !== 200) {
            throw new Error("City not found");
        }

        errorMessage.textContent = "";

        currentTimezone = data.timezone;

        clearInterval(timeInterval);

        updateDateTime();

        timeInterval = setInterval(updateDateTime, 1000);

        cityName.textContent = data.name;

        countryName.textContent = data.sys.country;

        temperature.textContent = `${(data.main.temp - 273.15).toFixed(1)}°C`;

        weatherCondition.innerHTML = `${data.weather[0].main} → <b>${data.weather[0].description}</b>`;

        feelsLike.textContent = `Feels like ${(data.main.feels_like - 273.15).toFixed(1)} °C`;

        humidity.textContent = `${data.main.humidity}%`;

        wind.innerHTML = `${(data.wind.speed * 3.6).toFixed(2)} <i>km/h</i>`;

        visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;

        showSunTime(
            data.sys.sunrise,
            sunrisetext
        );

        showSunTime(
            data.sys.sunset,
            sunsettext
        );

        if (data.weather[0].main === "Clear") {
            weatherIcon.textContent = "☀️";
        }

        else if (data.weather[0].main === "Clouds") {
            weatherIcon.textContent = "☁️";
        }

        else if (data.weather[0].main === "Rain") {
            weatherIcon.textContent = "🌧️";
        }

        else if (data.weather[0].main === "Drizzle") {
            weatherIcon.textContent = "🌦️";
        }

        else if (data.weather[0].main === "Thunderstorm") {
            weatherIcon.textContent = "⛈️";
        }

        else if (data.weather[0].main === "Snow") {
            weatherIcon.textContent = "❄️";
        }

        else if (data.weather[0].main === "Mist") {
            weatherIcon.textContent = "🌫️";
        }

        else if (data.weather[0].main === "Smoke") {
            weatherIcon.textContent = "💨";
        }

        else if (data.weather[0].main === "Haze") {
            weatherIcon.textContent = "🌫️";
        }

        else if (data.weather[0].main === "Dust") {
            weatherIcon.textContent = "🌪️";
        }

        else if (data.weather[0].main === "Fog") {
            weatherIcon.textContent = "🌫️";
        }

        else if (data.weather[0].main === "Sand") {
            weatherIcon.textContent = "🌪️";
        }

        else if (data.weather[0].main === "Ash") {
            weatherIcon.textContent = "🌋";
        }

        else if (data.weather[0].main === "Squall") {
            weatherIcon.textContent = "💨";
        }

        else if (data.weather[0].main === "Tornado") {
            weatherIcon.textContent = "🌪️";
        }

        document.querySelector(".current-weather").style.display = "block";

        document.querySelector(".weather-details").style.display = "grid";

        document.querySelector(".sun-section").style.display = "grid";

    }

    catch (err) {
        cityInput.value = "";
        errorMessage.textContent = "City not found. Please enter a valid city name.";
        document.querySelector(".current-weather").style.display = "none";
        document.querySelector(".weather-details").style.display = "none";
        document.querySelector(".sun-section").style.display = "none";
    }
}

searchBtn.addEventListener("click", WeatherApi);

cityInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        WeatherApi();
    }
    else {
        errorMessage.textContent = "";
    }
});

updateDateTime();

timeInterval = setInterval(updateDateTime, 1000);