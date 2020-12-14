// ***** Global Variablies *****
const apiKey = "cfab7f3712be5d9f10bb02b720dcb30c"
const api = "http://api.openweathermap.org/data/2.5/forecast?id=4887398&units=imperial&appid="
const fiveDayApi = "http://api.openweathermap.org/data/2.5/forecast?q={city name}"



//****** AJAX Call *****
$.ajax({
    url: api + apiKey,
    method: "GET"
}).then(function(response) {
    console.log(response)
    console.log(response.list[0].main)
    console.log(response.city.name)
    console.log(response)
    console.log(response)
})