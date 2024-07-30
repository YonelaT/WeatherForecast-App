function updateWeather(response){
    let temperatureElement=response.data.temperature.current;
    
    cityElement.innerHTML=response.data.city;
    temperatureElement.innerHTML=Math.round(temperature);
    
}


function searchCity(city) {
    let apikey=" ae3df4fe6d37bc70o28te4b4ca16cf4e";
let apiUrl= 'https://api.shecodes.io/weather/v1/current?query={$city}&key=${apiKey}';
axios.get(apiUrl).then(updateWeather);
}
function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    let descriptionElement=document.querySelector("description");
    description

    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);

}

let searchFormElement = document.querySelector("#search-form"); 
searchFormElement.addEventListener("submit", handleSearchSubmit); 
searchCity("Cape Town");

