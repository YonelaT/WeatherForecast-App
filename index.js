
function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let windElement = document.querySelector("#speed");
    let humidElement = document.querySelector("#humid");
    let time = document.querySelector("#time");
    let icon = document.querySelector("#icon");


    const unixTimestamp = response.data.time;
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`

    console.log(
        "City:" + response.data.city +
        "\nTemp:" + response.data.temperature.current +
        "\nDescription:" + response.data.condition.description +
        "\nHumidity:" + response.data.temperature.humidity +
        "\nWind:" + response.data.wind.speed +
        "\nTime:" + formattedTime
    );

    console.log("Weather response", response)



    descriptionElement.innerHTML = response.data.condition.description;
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    time.innerHTML = formattedTime;
    icon.src = response.data.condition.icon_url;
    windElement.innerHTML = `${response.data.wind.speed} km/h`;
    humidElement.innerHTML = `${response.data.temperature.humidity}%`;
}
function weatherForecast(response) {
    let forecast = document.querySelector("#forecast");
    forecast.innerHTML = " ";
    // response.data.daily.forEach(element => {
    //     const unixTimestamp = element.time;
    //     const date = new Date(unixTimestamp * 1000);
    //     let day = days(date.getDay());
    //     forecast.innerHTML = `<div> 
    //     <p>${day}</p><span></span></div>`;
    // });

    for (let index = 0; index < response.data.daily.length; index++) {
        const element = response.data.daily[index];
        const unixTimestamp = element.time;
        const date = new Date(unixTimestamp * 1000);
        let day = days(date.getDay());
        forecast.innerHTML += `<div class="weather_forecast"> 
            <p>${day}</p><img class="icon_forecast" id="icon_forecast" src="${element.condition.icon_url}"/><span><span class="maximum-forecast">${Math.round(element.temperature.maximum)}&deg;</span> <span class="minimum-forecast">${Math.round(element.temperature.minimum)}&deg;</span></span></div>`;

    }

}
function days(day) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days[day];
}

function getWeatherForecast(city, apiKey) {
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(weatherForecast);
}

function searchCity(city) {
    let apiKey = "ae3df4fe6d37bc70o28te4b4ca16cf4e";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    getWeatherForecast(city, apiKey);
    axios.get(apiUrl).then(updateWeather);

}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Cape Town");

// function searchCity(city) {
//     let apiKey = "ae3df4fe6d37bc70o28te4b4ca16cf4e";
//     let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
//     // getWeatherForecast(city, apiKey);
//     axios.get(apiUrl).then(updateWeather);
// }

// function handleSearchSubmit(event) {
//     event.preventDefault();
//     let searchInput = document.querySelector("#search-form-input");
//     searchCity(searchInput.value);
// }

// let searchFormElement = document.querySelector("#search-form");
// searchFormElement.addEventListener("submit", handleSearchSubmit);
// searchCity("Cape Town");