const cityInput = document.getElementById("city-input").value;

const myKey = config.MY_KEY;
const secretKey = config.SECRET_KEY;

// object for each day
let firstDay = {

};

document.getElementById("search-input").addEventListener("click", ()=> {
    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+cityInput+'&appid='+myKey)
        .then(respond => respond.json()).then(fiveDayData => {
        console.log(fiveDayData);
        let dayOne = fiveDayData.list.slice(0, 8);
        let dayTwo = fiveDayData.list.slice(8, 16);
        let dayThree = fiveDayData.list.slice(16, 24);
        let dayFour = fiveDayData.list.slice(24, 32);
        let dayFive = fiveDayData.list.slice(32, 40);

        let days = [dayOne, dayTwo, dayThree, dayFour, dayFive];

        const changeDate = (date)=> {
            let dateObj = new Date(date * 1000);
            return dateObj.toUTCString();
        }

        firstDay.city = fiveDayData.city.name;
        firstDay.sunrise = changeDate(fiveDayData.city.sunrise);
        firstDay.sunset = changeDate(fiveDayData.city.sunset);

        days.forEach(day => {
            let temp_C_ave, totalTempMax = 0, totalTempMin = 0, totalTempAve;
            day.forEach(each_three_hr => {
                totalTempMax += each_three_hr.main.temp_max;
                totalTempMin += each_three_hr.main.temp_min;
            })
            totalTempAve = (totalTempMax + totalTempMin)/16
            temp_C_ave = Math.round(totalTempAve - 273.15);
            firstDay.tempAve = temp_C_ave;
        })
        console.log(firstDay);
    })
});




