const cityInput = document.getElementById("city-input").value; // get city name from user input

const images = document.querySelectorAll(".img");
const time = document.querySelectorAll(".time");
const averageTemp = document.querySelectorAll(".averageTemp");
const weatherDesElement = document.querySelectorAll(".weather-des");

const cityName = document.querySelector(".city-name");
const curTemp = document.querySelector(".currentTemp");
const currentTime = document.querySelector(".currentTime");
const curWeatherDes = document.querySelector(".cur-weather-des");

let dayCounter = 0;
// the api key
const myKey = config.MY_KEY;

// change the time to the formal and readable one
const changeDate = (date)=> {
    let dateObj = new Date(date * 1000);
    return dateObj.toUTCString();
}
// data variables
let myData = {}
let days = [];
let temp = [];
let icons = [];
let weatherDes = [];

// listen to the click event
document.getElementById("search-input").addEventListener("click", ()=> {
    // fetch data from the server
    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+cityInput+'&appid='+myKey)
        .then(respond => respond.json()).then(weatherData => {
        myData.name = weatherData.city.name
        return weatherData.city.coord;
    }).then(coord => {
        // second fetch on the one call api
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+coord.lat+'&lon='+coord.lon+'&units=metric&exclude=minutely,hourly&&appid='+myKey)
            .then(respond => respond.json())
            .then(oneCallData => {
                console.log(oneCallData)
                // current weather description
                myData.currentTime = changeDate(oneCallData.current.dt)
                myData.currentTemp = oneCallData.current.temp;
                myData.feels_like = oneCallData.current.feels_like;
                myData.description = oneCallData.current.weather[0].description;

                cityName.innerHTML = myData.name
                currentTime.innerHTML = "today's weather";
                curTemp.innerHTML = myData.currentTemp;
                curWeatherDes.innerHTML = myData.description

                // data from each day forecast
                oneCallData.daily.forEach(day => {
                    days.push(changeDate(day.dt)); // the time of each day
                    icons.push(day.weather[0].icon) // icon for each day
                    weatherDes.push(day.weather[0].description) // description for each day
                    let dailyAveTem = (day.temp.min + day.temp.max)/2; // calculate average temperature
                    temp.push(dailyAveTem);
                })
                // data in one weather variable of object
                myData.dailyAveTem = temp;
                myData.icon = icons;
                myData.weatherDes = weatherDes;
                myData.days = days

                images.forEach(img => {
                    img.setAttribute('src', 'http://openweathermap.org/img/wn/'+icons[dayCounter]+'@2x.png');
                    averageTemp[dayCounter].innerHTML = temp[dayCounter];
                    time[dayCounter].innerHTML = days[dayCounter]
                    weatherDesElement[dayCounter].innerHTML = weatherDes[dayCounter]
                    dayCounter++;
                })
                document.querySelector(".city-name").innerHTML  = myData.name
                dayCounter = 0;
            })
    })
});



