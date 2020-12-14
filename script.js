const apiKey = "cfab7f3712be5d9f10bb02b720dcb30c"
const api = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid="

$.ajax({
    url: api + apiKey,
    method: "GET"
}).then(function(response) {
    console.log(response)
})