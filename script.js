var queryURL = "api.openweathermap.org/data/2.5/forecast?id=524901&appid=225a815d34855ab38313165a24d26606"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response)
})