const cityInput = document.getElementById("city-input").value; // get city name from user input

const images = document.querySelectorAll(".img");
const time = document.querySelectorAll(".time");
const averageTemp = document.querySelectorAll(".averageTemp");
const weatherDesElement = document.querySelectorAll(".weather-des");
const imgBg = document.querySelector(".city-bg")

const cityName = document.querySelector(".city-name");
const curTemp = document.querySelector(".currentTemp");
const curWeatherDes = document.querySelector(".cur-weather-des");
const curIcon = document.querySelector(".img-current");

let dayCounter = 0;
// the api key
const myKey = config.MY_KEY;
const myKey_2 = config.KEY_2

// change the time to the formal and readable one
const changeDate = (date)=> {
    let dateObj = new Date(date * 1000);
    let utcString = dateObj.toUTCString();
    let time = utcString.slice(0, -12);
    return time;

}

// data variables
let myData = {}
let days = [];
let temp = [];
let icons = [];
let weatherDes = [];

// listen to the click event
document.getElementById("search-input").addEventListener("click", ()=> {
    if (cityInput) {
        // fetch data from the server
        fetch('http://api.openweathermap.org/data/2.5/forecast?q='+cityInput+'&appid='+myKey)
            .then(respond => respond.json()).then(weatherData => {
            myData.name = "Today's weather of "+weatherData.city.name
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
                    myData.curIcon = oneCallData.current.weather[0].icon;

                    cityName.innerHTML = myData.name
                    curTemp.innerHTML = Math.round(myData.currentTemp)+" °C";
                    curWeatherDes.innerHTML = myData.description
                    curIcon.setAttribute("src", 'http://openweathermap.org/img/wn/'+myData.curIcon+'@2x.png')

                    // data from each day forecast
                    oneCallData.daily.forEach(day => {
                        days.push(changeDate(day.dt)); // the time of each day
                        icons.push(day.weather[0].icon) // icon for each day
                        weatherDes.push(day.weather[0].description) // description for each day
                        let dailyAveTem = (day.temp.min + day.temp.max)/2; // calculate average temperature
                        temp.push(Math.round(dailyAveTem)+" °C");
                    })
                    // data in one weather variable of object
                    myData.dailyAveTem = temp;
                    myData.icon = icons;
                    myData.weatherDes = weatherDes;
                    myData.days = days

                    images.forEach(img => {
                        img.setAttribute('src', 'http://openweathermap.org/img/wn/'+icons[dayCounter+1]+'@2x.png');
                        averageTemp[dayCounter].innerHTML = temp[dayCounter+1];
                        time[dayCounter].innerHTML = days[dayCounter+1]
                        weatherDesElement[dayCounter].innerHTML = weatherDes[dayCounter+1]
                        dayCounter++;
                    })
                    document.querySelector(".city-name").innerHTML  = myData.name
                    dayCounter = 0;
                }).catch(error => {
                    alert("Enter correct city name")
            })
        }).catch(error => {
            alert("Enter correct city name")
        })
        fetch('https://api.unsplash.com/search/photos?query='+cityInput+'&client_id='+myKey_2)
            .then(respond => respond.json())
            .then(imageData => {
                console.log(imageData);
                imgBg.style.backgroundImage = 'url('+imageData.results[2].urls.small+')';
                imgBg.style.backgroundRepeat = "no-repeat"
                imgBg.style.backgroundPosition = "center"
            })
    }
});
