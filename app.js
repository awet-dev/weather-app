const cityInput = document.getElementById("city-input").value; // get city name from user input
// the api key
const myKey = config.MY_KEY;

let myData = {

}
let day = [];
// change the time to the formal and readable one
const changeDate = (date)=> {
    let dateObj = new Date(date * 1000);
    return dateObj.toUTCString();
}

// listen to the click event
document.getElementById("search-input").addEventListener("click", ()=> {
    // fetch data from the server
    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+cityInput+'&appid='+myKey+'&units=metric')
        .then(respond => respond.json()).then(weatherData => {
            console.log(weatherData.list);
            myData.city = weatherData.city.name;
            myData.country = weatherData.city.country;
            myData.sunrise = changeDate(weatherData.city.sunrise);
            myData.sunset = changeDate(weatherData.city.sunset);

        console.log(myData)
    })
});


/*
let dayOne = weatherData.list.slice(0, 8);
        let dayTwo = weatherData.list.slice(8, 16);
        let dayThree = weatherData.list.slice(16, 24);
        let dayFour = weatherData.list.slice(24, 32);
        let dayFive = weatherData.list.slice(32, 40);

        let days = [dayOne, dayTwo, dayThree, dayFour, dayFive];

        const changeDate = (date)=> {
            let dateObj = new Date(date * 1000);
            return dateObj.toUTCString();
        }

        firstDay.city = weatherData.city.name;
        firstDay.sunrise = changeDate(weatherData.city.sunrise);
        firstDay.sunset = changeDate(weatherData.city.sunset);

        days.forEach(day => {
            let temp_C_ave, totalTempMax = 0, totalTempMin = 0, totalTempAve;
            day.forEach(each_three_hr => {
                totalTempMax += each_three_hr.main.temp_max;
                totalTempMin += each_three_hr.main.temp_min;
            })
            totalTempAve = (totalTempMax + totalTempMin)/16
            temp_C_ave = Math.round(totalTempAve - 273.15);
            firstDay.tempAve += temp_C_ave;
            allDaysWeather.push(firstDay);

        })
        console.log(allDaysWeather);
 */




