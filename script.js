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

function displayWeather(e) {
    e.preventDefault()
    if (searchCity.val() !== "") {
        city = searchCity.val()
        getWeather()
    }
}

function getWeather() {
    $.ajax({
        url: api + apiKey,
        method: "GET"
    }).then(response => {
        var weathericon = response.weather[0].icon;
        var iconurl = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
        $(presentCity).html(response.name + "(" + date + ")" + "<img src=" + iconurl + ">");
        var tempC = (response.main.temp - 273.15);
        $(presentTemperature).html(" " + tempC.toFixed(2) + " Celsius");
        $(humidty).html(" " + response.main.humidity + "%");

        var responsWindSpeed = response.wind.speed;
        var winds = responsWindSpeed;
        $(windSpeed).html(" " + winds + "m/s");

        uvIndex(response.coord.lon, response.coord.lat);
        forecast(response.id);
        cityArray.push(city.toUpperCase());
        localStorage.setItem("cityname", JSON.stringify(cityArray));
        addToList();
    })
}

function uvIndex(ln, lt) {
    var uvqURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lt + "&lon=" + ln;
    $.ajax({
        url: uvqURL,
        method: "GET"
    }).then(function (response) {
        if (response.value < 2) {
            $(uvIndexList).html(" " + response.value);
            $(uvIndexList).css("background-color", "lightgreen")
        } else if (response.value < 5) {
            $(uvIndexList).html(" " + response.value);
            $(uvIndexList).css("background-color", "lightyellow")
        } else if (response.value < 7) {
            $(uvIndexList).html(" " + response.value);
            $(uvIndexList).css("background-color", "orange")
        } else {
            $(uvIndexList).html(" " + response.value);
            $(uvIndexList).css("background-color", "red")
        }
    });
}

function forecast(cityid) {
    var queryforcastURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityid + "&appid=" + apiKey;
    $.ajax({
        url: queryforcastURL,
        method: "GET"
    }).then(function (response) {
        for (i = 0; i < 6; i++) {
            var iconcode = response.list[i].weather[0].icon;
            var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
            var tempK = response.list[i].main.temp;
            var tempC = (tempK - 273.5);
            var humidity = response.list[i].main.humidity;
            var fDays = parseInt(day + i)
            $("#fDate" + i).html(" " + fDays + "." + month);
            $("#fImg" + i).html("<img src=" + iconurl + ">");
            $("#fTemp" + i).html(tempC.toFixed(2));
            $("#fHumidity" + i).html(humidity + "%");
        }
    });
}

function getPastSearch(event) {
    var target = event.target;
    if (event.target.matches("li")) {
        city = target.textContent.trim();
        presentWeather(city);
    }
}

function clearHistory(event) {
    event.preventDefault();
    city = ""
    cityArray = [];
    localStorage.clear();
    $(hList).empty()
}

function addToList() {
    removeDupe()
    JSON.parse(localStorage.getItem("cityname"))
    for (var i = 0; i < cityArray.length; i++) {
        var citylist = $('<li>' + cityArray[i] + "</li>")
        hList.prepend(citylist)
    }
}

addToList()
$("#search-button").on("click", displayWeather);
$(document).on("click", getPastSearch);
$("#clear-button").on("click", clearHistory);