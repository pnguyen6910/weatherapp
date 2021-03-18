// ***** Global Variablies *****
const searchCity = $("#search-city");
const searchButton = $("#search-button");
const clearButton = $("#clear-button");
const presentCity = $("#present-city");
const presentTemperature = $("#temperature");
const humidty = $("#humidity");
const windSpeed = $("#wind-speed");
const uvIndexList = $("#uv-index");
const apiKey = "cfab7f3712be5d9f10bb02b720dcb30c"
const api = "http://api.openweathermap.org/data/2.5/forecast?id=4887398&units=imperial&appid="
const list = $(".list-group")

var cityArray = JSON.parse(localStorage.getItem("cityname")) || []
var city = "";
var d = new Date();
var year = d.getFullYear()
var month = d.getMonth() + 1;
var day = d.getDate();
var date = day + "." + month + "." + year

function removeDupe() {
    cityArraydupe = cityArray.filter(
        function (a) {
            if (!this[a]) {
                this[a] = 1
                return a
            }
        }, {}
    )
    cityArray = cityArraydupe
    localStorage.setItem('cityname', JSON.stringify(cityArray))
    list.empty()
}