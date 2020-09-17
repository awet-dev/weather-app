// get the input
let cityInput = document.getElementById("city-input").value;

// config variable
const myKey = config.MY_KEY;
// const secretKey = config.SECRET_KEY;

// listen to the click event of the search btn
document.getElementById("btn-search").addEventListener("click", getWeatherData(cityInput));

// get data from the server
const getWeatherData = (cityName => {
    //get data using fetch method to the api url
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid='+myKey)
})


