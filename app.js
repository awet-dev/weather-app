// get the input value
const cityInput = document.getElementById("city-input").value; // get city name from user input

// select the elements of html to display the daily weather data to
const images = document.querySelectorAll(".img");
const time = document.querySelectorAll(".time");
const averageTemp = document.querySelectorAll(".averageTemp");
const weatherDesElement = document.querySelectorAll(".weather-des");

// select the html elements to display the current weather data, city name and the image of the city
const imgBg = document.querySelector(".city-bg")
const cityName = document.querySelector(".city-name");
const curTemp = document.querySelector(".currentTemp");
const curWeatherDes = document.querySelector(".cur-weather-des");
const curIcon = document.querySelector(".img-current");

// the api key and security key for the unsplash api
const myKey = config.MY_KEY;
const myKey_2 = config.KEY_2

// function to change the time data to the formal and readable one
const changeDate = (date)=> {
    let dateObj = new Date(date * 1000);
    let utcString = dateObj.toUTCString();
    let time = utcString.slice(0, -12);
    return time;
}

// data variables to the save the data that I get from the api
let myData = {}
let days = [];
let temp = [];
let icons = [];
let weatherDes = [];

// listen to the click event to fetch different api
document.getElementById("search-input").addEventListener("click", ()=> {
    if (cityInput) { // check if there is input when clicked

        // fetch data from the weather server to get the latitude and longitude of the city
        fetch('http://api.openweathermap.org/data/2.5/forecast?q='+cityInput+'&appid='+myKey)
            .then(respond => respond.json())
            .then(weatherData => {
                // save the name of the city
                myData.name = weatherData.city.name
                return weatherData.city.coord;
        }).then(coord => {
            // second fetch on the one call api to get all the required weather data
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+coord.lat+'&lon='+coord.lon+'&units=metric&exclude=minutely,hourly&&appid='+myKey)
                .then(respond => respond.json())
                .then(oneCallData => {
                    console.log(oneCallData) // for testing
                    // weather data of the at the moment
                    myData.currentTime = changeDate(oneCallData.current.dt)
                    myData.currentTemp = oneCallData.current.temp;
                    myData.feels_like = oneCallData.current.feels_like;
                    myData.description = oneCallData.current.weather[0].description;
                    myData.curIcon = oneCallData.current.weather[0].icon;

                    // data to be displayed in the page for the current weather data
                    cityName.innerHTML = myData.name+" "+ myData.currentTime
                    curTemp.innerHTML = Math.round(myData.currentTemp)+" °C";
                    curWeatherDes.innerHTML = myData.description
                    curIcon.setAttribute("src", 'http://openweathermap.org/img/wn/'+myData.curIcon+'@2x.png')

                    // data from daily weather forecast
                    oneCallData.daily.forEach(day => {
                        days.push(changeDate(day.dt));
                        icons.push(day.weather[0].icon)
                        weatherDes.push(day.weather[0].description) // description for each day
                        let dailyAveTem = (day.temp.day + day.temp.eve + day.temp.morn + day.temp.night)/4; // calculate average temperature
                        temp.push(Math.round(dailyAveTem)+" °C");
                    })
                    // save data in one weather variable of object
                    myData.dailyAveTem = temp;
                    myData.icon = icons;
                    myData.weatherDes = weatherDes;
                    myData.days = days

                    // used to index each data to the corresponding day, I skipped the data for the current day because
                    // I display the current weather instead in it
                    let dayCounter = 0;
                    images.forEach(img => {
                        img.setAttribute('src', 'http://openweathermap.org/img/wn/'+icons[dayCounter+1]+'@2x.png');
                        averageTemp[dayCounter].innerHTML = temp[dayCounter+1];
                        time[dayCounter].innerHTML = days[dayCounter+1]
                        weatherDesElement[dayCounter].innerHTML = weatherDes[dayCounter+1]
                        dayCounter++;
                    })
                    dayCounter = 0;

                    // another fetch for the image of the city from unsplash api
                    fetch('https://api.unsplash.com/search/photos?query='+cityInput+'&client_id='+myKey_2)
                        .then(respond => respond.json())
                        .then(imageData => {
                            imgBg.style.backgroundImage = 'url('+imageData.results[0].urls.small+')';
                            imgBg.style.backgroundRepeat = "no-repeat"
                            imgBg.style.backgroundPosition = "center"
                        })
                }).catch(error => {
                    alert("Enter correct city name")
            })
        }).catch(error => {
            alert("Enter correct city name")
        })
    }
});
