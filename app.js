const cityInput = document.getElementById("city-input").value; // get city name from user input
// the api key
const myKey = config.MY_KEY;

let myData = {}
let days = [];
let temp = [];
let icons = [];

// change the time to the formal and readable one
const changeDate = (date)=> {
    let dateObj = new Date(date * 1000);
    return dateObj.toUTCString();
}


// listen to the click event
document.getElementById("search-input").addEventListener("click", ()=> {
    // fetch data from the server
    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+cityInput+'&appid='+myKey)
        .then(respond => respond.json()).then(weatherData => {
        myData.name = weatherData.city.name
        return weatherData.city.coord;
    }).then(coord => {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+coord.lat+'&lon='+coord.lon+'&units=metric&exclude=minutely,hourly&&appid='+myKey)
            .then(respond => respond.json())
            .then(oneCallData => {
                myData.currentTime = changeDate(oneCallData.current.dt)
                myData.currentTemp = oneCallData.current.temp;
                myData.feels_like = oneCallData.current.feels_like;
                myData.description = oneCallData.current.weather[0].description;

                oneCallData.daily.forEach(day => {
                    days.push(changeDate(day.dt));
                    icons.push(day.weather[0].icon)
                    // calculate average temperature
                    let dailyAveTem = (day.temp.max + day.temp.max)/2
                    temp.push(dailyAveTem);
                })
                myData.dailyAveTem = temp;
                myData.icon = icons;
                myData.days = days

            })
    })
});






