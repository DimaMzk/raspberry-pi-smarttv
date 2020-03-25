// Weather API Key: [APIKEY]

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.openweathermap.org/data/2.5/weather?q=Victoria,ca&appid=[APIKEY]",
    "method": "GET",
    // "headers": {
    //   "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    //   "x-rapidapi-key": "SIGN-UP-FOR-KEY"
    // }
  }
  $.ajax(settings).done(function (response) {
    console.log(response);
    var temp = Math.round((response.main.temp) - 273.15);
    $("#temp").text(temp + " °C");
    var status = response.weather[0].description;
    $("#status").text(titleCase(status));
  });


function titleCase(str) {
var splitStr = str.toLowerCase().split(' ');
for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
}
// Directly return the joined string
return splitStr.join(' '); 
}