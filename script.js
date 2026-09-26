let cityInput = document.body.querySelector("#cityInput")
let searchBtn = document.body.querySelector("#searchBtn")
const errorMessage = document.body.querySelector("#errorMessage")

let cityName = document.body.querySelector("#cityName")
let countryName = document.body.querySelector("#countryName")
let weatherIcon = document.querySelector("#weatherIcon")
let temperature = document.getElementById("temperature")
let weatherCondition = document.getElementById("weatherCondition")
let feelsLike = document.getElementById("feelsLike")

let humidity = document.body.querySelector("#humidity")
let wind = document.getElementById("wind")
let visibility = document.getElementById("visibility")

let sunrise = document.getElementById("#sunrise")
let sunset = document.getElementById("#sunset")

async function WeatherApi() {
    try {

        const text = cityInput.value
        let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&APPID=975dad23652f9a3a0433704148f66078`);
        let data = await api.json()

        console.log(data)



        const sunriseTime = new Date(data.sys.sunrise * 1000);

        const sunrise = sunriseTime.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });

        document.getElementById("sunrise").textContent = sunrise;


        const sunsetTime = new Date(data.sys.sunset * 1000);

        const sunset = sunsetTime.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });

        document.getElementById("sunset").textContent = sunset;



        document.body.querySelector(".current-weather").style.display = "block"
        document.body.querySelector(".weather-details").style.display = "block"
        document.body.querySelector(".sun-section").style.display = "block"

        cityName.innerHTML = `<b>${data.name}</b>`
        countryName.innerHTML = `<b>${data.sys.country}</b>`
        temperature.innerHTML = (`${(data.main.temp - 273.15).toFixed(1)}°C`)
        weatherCondition.innerHTML = `${data.weather[0].main + " <b>→<b>  " + data.weather[0].description}`
        if (data.weather[0].main === "Clear") {
            weatherIcon.innerHTML = "☀️";
        }
        else if (data.weather[0].main === "Clouds") {
            weatherIcon.innerHTML = "☁️";
        }
        else if (data.weather[0].main === "Rain") {
            weatherIcon.innerHTML = "🌧️";
        }
        else if (data.weather[0].main === "Drizzle") {
            weatherIcon.innerHTML = "🌦️";
        }
        else if (data.weather[0].main === "Thunderstorm") {
            weatherIcon.innerHTML = "⛈️";
        }
        else if (data.weather[0].main === "Snow") {
            weatherIcon.innerHTML = "❄️";
        }
        else if (data.weather[0].main === "Mist") {
            weatherIcon.innerHTML = "🌫️";
        }
        else if (data.weather[0].main === "Smoke") {
            weatherIcon.innerHTML = "💨";
        }
        else if (data.weather[0].main === "Haze") {
            weatherIcon.innerHTML = "🌫️";
        }
        else if (data.weather[0].main === "Dust") {
            weatherIcon.innerHTML = "🌪️";
        }
        else if (data.weather[0].main === "Fog") {
            weatherIcon.innerHTML = "🌫️";
        }
        else if (data.weather[0].main === "Sand") {
            weatherIcon.innerHTML = "🌪️";
        }
        else if (data.weather[0].main === "Ash") {
            weatherIcon.innerHTML = "🌋";
        }
        else if (data.weather[0].main === "Squall") {
            weatherIcon.innerHTML = "💨";
        }
        else if (data.weather[0].main === "Tornado") {
            weatherIcon.innerHTML = "🌪️";
        }

        feelsLike.innerHTML = `Feels like ${(data.main.feels_like - 273.15).toFixed(1)} °C`;

        humidity.innerHTML = `${data.main.humidity}%`
        wind.innerHTML = `${(data.wind.speed * 3.6).toFixed(2)} <i>km/h</i>`
        visibility.innerHTML = `${(data.visibility / 1000).toFixed(1)} km`

    }
    catch (err) {
        cityInput.value = ""
        errorMessage.innerHTML = "City not found. Please enter a valid city name."
        document.body.querySelector(".current-weather").style.display = "none"
        document.body.querySelector(".weather-details").style.display = "none"
        document.body.querySelector(".sun-section").style.display = "none"
    }
}

searchBtn.addEventListener("click", () => {
    WeatherApi()
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click()
    } else {
        errorMessage.innerHTML = ""
    }
})



let date = document.body.querySelector("#date")
let time = document.body.querySelector("#time")

