// Weather API Key: [APIKEY]
function weather(){
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
}

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



function time() {
    var d = new Date();
    var m = parseInt(d.getMinutes());
    var h = parseInt(d.getHours());
    var tfh = h;
    if(h >= 12){
        h -= 12;
    }
    if(m <= 9){
        m = "0" + m;
    }
    $("#hour").text(h);
    $("#minute").text(m);
    var ampm = "AM";
    if (tfh >= 12){
        ampm = "PM";
    }
    $("#ampm").text(ampm);
}
time();
weather();
setInterval(weather, 180000);
setInterval(time, 1000);