// Weather API Key: [WEATHER_API]
//Globals:


var user_info = (function() {
  var user_info = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "json_files/userinformation.json",
    'dataType': "json",
    'success': function(data) {
      user_info = data;
    }
  });
  return user_info;
})();
var weatherInterval, timeInterval, backdropInterval;
function weather() {
  var settings = {
    async: true,
    crossDomain: true,
    url:
    // [WEATHER_API] : Replace this with the API Key emailed to you
    // [CITY_NAME] : Replace this with the nearest major city of residence ex. Victoria
    // [COUNTY_CODE] : Replace with you country code ex. `ca` for Canada
      "https://api.openweathermap.org/data/2.5/weather?q=" + user_info['city'] + "," + user_info['country_code'] + "&appid=" + user_info['weather_api_key'],
    method: "GET"
  };

  $.ajax(settings).done(function(response) {
    console.log("Updating Weather");
    var temp = Math.round(response.main.temp - 273.15);
    $("#temp").text(temp + " °C");
    var status = response.weather[0].description;
    $("#status").text(titleCase(status));
    var weatherID = response.weather[0].id;
    var imageURL =
      "weather_icons/" + getImageUrl(weatherID) + getDayNight() + ".png";
    $("#weather-icon").attr("src", imageURL);
    $("#weather-icon").css("right", $("#weather").width() + 5 + "px");
  });
}

function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

function getDayNight() {
  var d = new Date();
  var h = parseInt(d.getHours());
  // TODO: Replace with Sunset / Sunrise Calculations
  if (h >= 20) {
    return "-night";
  }
  if (h <= 7) {
    return "-night";
  }
  return "-day";
}

function time() {
  var d = new Date();
  var m = parseInt(d.getMinutes());
  var h = parseInt(d.getHours());
  var tfh = h;
  if (h >= 12) {
    h -= 12;
  }
  if (m <= 9) {
    m = "0" + m;
  }
  if(h == 0){
      h = 12;
  }
  $("#hour").text(h);
  $("#minute").text(m);
  var ampm = "AM";
  if (tfh >= 12) {
    ampm = "PM";
  }
  $("#ampm").text(ampm);
}

function getImageUrl(weatherID) {
  switch (weatherID) {
    case 200: // thunderstorm with light rain
      return "storm-showers";
    case 201: // thunderstorm with rain
      return "storm-showers";
    case 202: // thunderstorm with heavy rain
      return "storm-showers";
    case 210: // Light Thunderstorm
      return "storm-showers";
    case 211: // thunderstorm
      return "thunderstorm";
    case 212: // Heavy THunderstorm
      return "thunderstorm";
    case 221: // Ragged THunderstorm
      return "thunderstorm";
    case 230: // thunderstorm wuth light drizzle
      return "storm-showers";
    case 231: // thunderstorm with drizzle
      return "storm-showers";
    case 232: // Thunderstorm with heavy drizzle
      return "storm-showers";
    case 300: // light intensity sprinkle
      return "sprinkle";
    case 301: // drizzle
      return "sprinkle";
    case 302: // heavy intensity drizzle
      return "sprinkle";
    case 310: // Light intensity drizzle rain
      return "sprinkle";
    case 311: // drizzle rain
      return "sprinkle";
    case 312: // heavy intensity srizzle rain
      return "sprinkle";
    case 313: // shower rain and drizzle
      return "sprinkle";
    case 314: // heavy shoer rain and drizzle
      return "sprinkle";
    case 321: // Shower Drizzle
      return "sprinkle";
    case 500: // Light Rain
      return "rain";
    case 501: // moderate rain
      return "rain";
    case 502: // heavy intensity rain
      return "heavy-rain";
    case 503: // very heavy rain
      return "heavy-rain";
    case 504: // EXTREME rain
      return "heavy-rain";
    case 511: // freezing rain
      return "rain-mix";
    case 520: // light intensity shower rain
      return "showers";
    case 521: // shower rain
      return "showers";
    case 522: // Heavy intensity shower rain
      return "heavy-rain";
    case 531: // ragged shower rain
      return "showers";
    case 600: // light snow
      return "light-snow";
    case 601: // snow
      return "snow";
    case 602: // heavy snow
      return "snow";
    case 611: // Sleet (Note: I have no idea what this is. Nor can I find an icon for it. So it's now snow)
      return "snow";
    case 612: // shower sleet
      return "snow";
    case 615: // light rain and snow
      return "rain-mix";
    case 616: // rain and snow
      return "rain-mix";
    case 620: // light shower snow
      return "rain-mix";
    case 621: // shower snow
      return "rain-mix";
    case 622: // heavy shower snow
      return "rain-mix";
    case 701: // mist
      return "sprinkle";
    case 711: // smoke
      return "smoke";
    case 721: // haze
      return "smoke";
    case 731: // sand, dust whirls
      return "cloudy";
    case 741: // fog
      return "smoke";
    case 751: // sand
      return "smoke"; // I'm not even going to try and fond an icon for SAND
    case 761: // dust
      return "smoke"; // ^^^
    case 762: // volcanic ash
      return "smoke";
    case 771: // squalls
      return "cloudy";
    case 781: // tornado
      return "none";
    case 800: // clear sky
      return "sunny";
    case 801: // few clouds
      return "few-clouds";
    case 802: // scattered clouds
      return "partly-cloudy";
    case 803: // broken clouds
      return "mostly-cloudy";
    case 804: // overcast clouds
      return "cloudy";
    case 900: // tornado
      return "none";
    case 901: // tropical-storm
      return "thunderstorm";
    case 902: // hurricane
      return "thunderstorm";
    case 903: // cold
      return "snow";
    case 904: // hot
      return "sunny";
    case 905: // windy
      return "cloudy";
    case 906: // hail
      return "snow";
    case 951: // calm
      return "sunny";
    case 952: // light-breeze
      return "cloudy";
    case 954: // moderate breeze
      return "cloudy";
    case 955: // fresh breeze
      return "cloudy";
    case 956: //strong breeze
      return "cloudy";
    case 957: // high wind near gale
      return "cloudy";
    case 958: // gale
      return "cloudy";
    case 959: // severe gale
      return "cloudy";
    case 960: // storm
      return "thunderstorm";
    case 961: // violent storn
      return "thunderstorm";
    case 962: //hurricane
      return "cloudy";
    default:
      //default
      return "none";
  }
}

function applyBackdrop() {
  var randomInt = getRandomInt(0, 26);
  var prefix = "";
  if (randomInt < 1000) {
    prefix = "0";
  }
  if (randomInt < 100) {
    prefix = "00";
  }
  if (randomInt < 10) {
    prefix = "000";
  }

  console.log("Applying New Backdrop");
  var image = $("#background-image");
  image.fadeOut(1000, function() {
    image.css("background-image", 'url("backdrops/' + prefix + randomInt + '.jpg")');
    image.fadeIn(1000);
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$("#background-image").ready(function() {
  time();
  weather();
  applyBackdrop();
  weatherInterval = setInterval(weather, 180000);
  timeInterval = setInterval(time, 1000);
  backdropInterval = setInterval(applyBackdrop, 60000);
  console.log("Ran Init Functions.");
});

function haltHome(){
  clearInterval(weatherInterval);
  clearInterval(timeInterval);
  clearInterval(backdropInterval);
}

// // Home Code Logic:
// document.addEventListener("keydown", homeKeyListener);

// function homeKeyListener(e){
//   if (e.keyCode == '40') {
//     // down arrow
//     setMenuScreen();
//   }
// }

// function setMenuScreen(){
//   //Stop Attempting to set Home Screen Information
//   haltHome()
//   document.removeEventListener("keydown", homeKeyListener);
//   //fade out the home screen
//   $("#background-image").fadeOut(500);
//   $("#body").fadeOut(500, function(){
//   $("#body").html("");
//     console.log("SettingMenu")
//     document.getElementById("body").innerHTML = ('<div id="background-image"></div>'+
//     '<div id="menu-container">' +
//     '<div id="searchbox-container">' +
//     '   <input class="searchbox-input" id="searchbox-input" type="text" placeholder="">' +
//     '    <button class="searchbox-button" id="searchbox-button" value="Search">🔎</button>' +
//     '</div>' +
//     '<div id="icons-container">' +
//     '    <div class="app-container">' +
//     '        <div class="app-icon focused" id="settings-ico">' +
//     '        </div>' +
//     '        <div class="app-name" id="settings-name">' +
//     '            <b>Settings</b>' +
//     '        </div>' +
//     '    </div>' +
//     '    <div class="app-container">'+
//     '        <div class="app-icon" id="appstore-ico">' +
//     '        </div>' +
//     '        <div class="app-name">' +
//     '            <b>App Store</b>' +
//     '        </div>' +
//     '    </div>' +

//     '</div>' +
//     '</div>');
//     backdropInterval = setInterval(applyBackdrop, 60000);
//     applyBackdrop();
//     document.addEventListener("keydown", menuGridNavigate);
//     $("#body").fadeIn(500);
//     Keyboard.init();
//     $("#searchbox-input").click(function(){
//       console.log("ISCLICK")
//       document.removeEventListener("keydown", menuGridNavigate);
//       Keyboard.open("searchbox-input","searchbox-button");
//     });
//     $("#searchbox-button").click(function(){
//       console.log("ISCLICK")
//       doSearch();
//       document.addEventListener("keydown", menuGridNavigate);
//     });
    
//   }).fadeIn(500);
//   //Clear the home screen and add menu stuf
// }

// function doSearch(){
//   if(document.getElementById("searchbox-input").value == "home"){
//     window.location = "http://localhost:8000";
//   }
// }

