const cityInput = document.getElementById("city-input").value;

document.getElementById("search-input").addEventListener("click", ()=> {
    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+cityInput+'&appid=0b024bc8d08e24a1ce5a32e89c08c9ce')
        .then(respond => respond.json()).then(weatherData => {
        let fiveDay = weatherData.list.slice(0, 4);
        console.log(fiveDay);
        fiveDay.forEach(day => {
            console.log(day);
        })
    })
});


