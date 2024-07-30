function updateWeather(response) {
    function updateWeather(response) {
        let temperatureElement = document.querySelector("#temperature");
        let cityElement = document.querySelector("#city");
        let descriptionElement = document.querySelector("#description");
        let windElement = document.querySelector("#speed");
        let humidElement = document.querySelector("#humid");
        let time = document.querySelector("#time");
        let icon = document.querySelector("#icon")
            
        console.log("==================Yonela========================");
        console.log(response);
        console.log(
            "City:" + response.data.city +
            "\nTemp:" + response.data.temperature.current +
            "\nDescription:" + response.data.condition.description +
            "\nHumidity:" + response.data.temperature.humidity +
            "\nWind:" + response.data.wind.speed +
            "\nTime:" + response.data.time
        );

        const unixTimestamp = response.data.time;
        const date = new Date(unixTimestamp * 1000);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        descriptionElement.innerHTML = response.data.condition.description;
        temperatureElement.innerHTML = Math.round(response.data.temperature.current);
        cityElement.innerHTML = response.data.city;
        time.innerHTML= formattedTime;
        icon.src = response.data.condition.icon_url; 
        windElement.innerHTML = `${response.data.wind.speed} km/h`;
        humidElement.innerHTML = `${response.data.temperature.humidity}%`;

    }

    function searchCity(city) {
        let apiKey = "ae3df4fe6d37bc70o28te4b4ca16cf4e";
        let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
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
}

function searchCity(city) {
    let apiKey = "ae3df4fe6d37bc70o28te4b4ca16cf4e";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
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