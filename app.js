const cityInput = document.getElementById("city-input").value;
let tf, td;
tc = (tf - 32)*5/9;
document.getElementById("search-input").addEventListener("click", ()=> {
    fetch('http://api.openweathermap.org/data/2.5/forecast?q='+cityInput+'&appid=0b024bc8d08e24a1ce5a32e89c08c9ce')
        .then(respond => respond.json()).then(weatherData => {
            console.log(weatherData);
        let fiveDay = weatherData.list.slice(0, 5);
        console.log(fiveDay);
        let tf_min, tf_max, tf_ava, tc_ava;
        fiveDay.forEach(day => {
            tf_min = day.main.temp_min;
            tf_max = day.main.temp_max;
            tf_ava = (tf_max + tf_min)/2
            tc_ava = (tf_ava-32)*5/9
            console.log(tf_min, tf_max, tf_ava, tc_ava/5);
        })
    })
});


