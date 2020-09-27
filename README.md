# weather-app
Create weather app
## This app is for
* to display the current weather of the selected city
* to display the avarage temperature of the coming five days.
* to display the weather descrpition of the the coming five days
## How does it work
- we get from the first fetch the lat and lon of the city by entering the name of the city
- we make another fetch to the one call open weather api and some detailed data.
## Data manipulation
1. get the current temperature from the current object of the second fetch data.
2. and also retrieve the day morning midday and evening temperature and culculate avarage from it.
3. get the weather descrpition from the array of the daily array.
4. use the icons that represent the weather descrpition from their respective array of the daily array.
## What resources used
1. [open weather api](https://openweathermap.org/api)
