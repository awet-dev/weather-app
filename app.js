const cityInput = document.getElementById("city-input").value;

document.getElementById("search-input").addEventListener("click", ()=> {
    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+cityInput+'&appid=0b024bc8d08e24a1ce5a32e89c08c9ce')
        .then(respond => respond.json()).then(weatherData => {
            console.log(weatherData);
        let fiveDay = weatherData.list.slice(0, 5);
        console.log(fiveDay);
        let temp_C, temp_C_min ,temp_C_max, temp_C_ave;
        fiveDay.forEach(day => {
            temp_C = (day.main.temp - 273.15).toFixed(1);
            temp_C_max = (day.main.temp_max - 273.15).toFixed(1);
            temp_C_min = (day.main.temp_min - 273.15).toFixed(1);
            console.log(temp_C, temp_C_min, temp_C_max)
        })
    })
});


