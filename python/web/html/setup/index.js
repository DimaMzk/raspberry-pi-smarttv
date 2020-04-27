var currentSelectedCountry = 1;
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
  image.fadeOut(1000, function () {
    image.css(
      "background-image",
      'url("backdrops/' + prefix + randomInt + '.jpg")'
    );
    image.fadeIn(1000);
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$("#background-image").ready(function () {
  applyBackdrop();
  backdropInterval = setInterval(applyBackdrop, 60000);
  console.log("Ran Init Functions.");
  document.addEventListener("keydown", pageOneListener);
});


function pageOneListener(e){
  if (e.keyCode == '13'){
  // Enter
    document.getElementById("page-one-continue").click();
    document.removeEventListener("keydown", pageOneListener);
  }
}

function pageTwo(){
  document.addEventListener("keydown", pageTwoListener);
  $("#left-side").html("<div><h1>Location & Time Zone</h1><h2>Select Your Country</h2><h4 class='faded'>Enter Your City</h4><h1 class='faded'>Open Weather API</h1></div>");
  $("#right-side").html("<div><div id='top-half-countries'></div><div id='selected-country' onclick='pageThree();'></div><div id='bottom-half-countries'></div></div>");
  initRightSideCountriesList();
}

function initRightSideCountriesList(){
  document.getElementById("top-half-countries").innerHTML = "";
  document.getElementById("bottom-half-countries").innerHTML = "";

  for (var i = currentSelectedCountry - 9; i < currentSelectedCountry; i++){
    var elementVisible = "visible";

    if(i < 1){
      elementVisible = "invisible";
    }
    document.getElementById("top-half-countries").innerHTML += ("<div class='button button-other-country " + elementVisible + "'>" + countries[i] + "</div>");
  }

  document.getElementById("selected-country").innerHTML = ("<div class='button button-selected button-selected-country'>" + countries[currentSelectedCountry] + "</div>")

  for(var i = currentSelectedCountry + 1; i < currentSelectedCountry + 10; i++){
    var elementVisible = "visible";
    if(i > 245){
      elementVisible = "invisible";
    }

    document.getElementById("bottom-half-countries").innerHTML += ("<div class='button button-other-country " + elementVisible + "'>" + countries[i] + "</div>");
  }
}

function pageTwoListener(e){
  e = e || window.event;
  if (e.keyCode == '38') {
    if(currentSelectedCountry == 1){
      return;
    }
    currentSelectedCountry--;
    initRightSideCountriesList();
    
  }
  else if (e.keyCode == '40') {
    if(currentSelectedCountry == 245){
      return;
    }
    currentSelectedCountry++;
    initRightSideCountriesList();
    
  }
  else if (e.keyCode == '13'){
    // Enter
    $.ajax({url: "setcountry/" + currentSelectedCountry, success: function(result){
      console.log(result);
      if(result == 'true'){
        document.getElementById("selected-country").click();
        document.removeEventListener("keydown", pageTwoListener);
      }
    }});
  }
}

var countries = (function() {
  var countries = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "countries.json",
    'dataType': "json",
    'success': function(data) {
      countries = data;
    }
  });
  return countries;
})();


function pageThree(){
  //document.addEventListener("keydown", pageThreeListener);
  $("#left-side").html("<div><h1>Location & Time Zone</h1><h2>Enter Your City</h2><h1 class='faded'>Open Weather API</h1></div>");
  $("#right-side").html("<div><div class='autocomplete'><input type='text' name='city-input-box' class='city-input-box button-selected-country button-selected' id='city-input-box'></div><div id='bottom-half-countries'></div><div id='triggerPageFour' onclick='pageFour();'></div></div>");
  //autocomplete(cities[currentSelectedCountry]);
  Keyboard.open("city-input-box","triggerPageFour", doChange);
}

function pageThreeListener(e){
  e = e || window.event;
  if (e.keyCode == '38') {
    //up
  }
  else if (e.keyCode == '40') {
    //down
    
  }
  else if (e.keyCode == '13'){
    // Enter

  }
}


var cities = (function() {
  var cities = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "all-cities.json",
    'dataType': "json",
    'success': function(data) {
      cities = data;
    }
  });
  return cities;
})();

var deviceInformation = (function() {
  var deviceInformation = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "device_information.json",
    'dataType': "json",
    'success': function(data) {
      deviceInformation = data;
    }
  });
  return deviceInformation;
})();

function doChange(){
  console.log("change");
  var inputBoxValue = document.getElementById("city-input-box").value;
  var results = 0;
  document.getElementById("bottom-half-countries").innerHTML = "";
  for (var i = 0; i < cities[currentSelectedCountry].length; i++){
    //console.log(inputBoxValue + " vs. " + cities[currentSelectedCountry][i].substring(0,inputBoxValue.length).toLowerCase());
    //console.log("inputbox vs substrings arr")
    if(results < 5 && inputBoxValue == cities[currentSelectedCountry][i].substring(0,inputBoxValue.length).toLowerCase()){
      results++;
      console.log(cities[currentSelectedCountry][i]);
      document.getElementById("bottom-half-countries").innerHTML += ("<div class='button button-other-country'>" + cities[currentSelectedCountry][i] + "</div>");
    }
  }
}

function pageFour(){
  $.ajax({url: "setcity/" + document.getElementById("city-input-box").value, success: function(result){
    console.log(result);
    if(result == 'true'){
      console.log(result)
      document.addEventListener("keydown", pageFourListener);
      mobileCompleated = setInterval(checkMobileWeatherStatus, 1000);
      $("#left-side").html("<div><h1>Open Weather API</h1><h2>Enter your Open Weather API Key</h2><p>Please goto <code>openweathermap.org/price</code>,<br /> and sign up for a free account to have an API key emailed to you.</p><p>Want to copy/paste the key?<br> On a phone connected to that same network as your Raspberry Pi,<br> navigate to <code>" + deviceInformation['ipaddress'] + ":8081/setup/mobile/index.html</code></p></div>");
      $("#right-side").html("<div><div class='autocomplete'><input type='text' name='weather-api-input-box' class='weather-api-input-box button-selected-country button-selected' id='weather-api-input-box'></div><div id='triggerPageFive' onclick='pageFive();'></div></div>");
      
    }
  }});
   //autocomplete(cities[currentSelectedCountry]);
  // Keyboard.open("weather-api-input-box","triggerPageFive", null);
}

function checkMobileWeatherStatus(){
  $.ajax({url: "setmobilestatus/", success: function(result){
    console.log("set mobstatus: " + result);
    if(result == 'true'){
      clearInterval(mobileCompleated);
      document.removeEventListener("keydown", pageFourListener);
      $("#left-side").html("<div><h1>All Set!</h1></div>");
      $("#right-side").html("<div><div class=\"button button-full-width button-selected\">Let's Start</div></div>");
      clearInterval(backdropInterval);
      document.addEventListener("keydown", pageFiveListener);
    }
  }});
}

function pageFourListener(e){
  e = e || window.event;
  if (e.keyCode == '13'){
    // Enter
    document.removeEventListener("keydown", pageFourListener);
    Keyboard.open("weather-api-input-box","triggerPageFive", null);
  }
}

function pageFive(){
  
  $.ajax({url: "setweatherapikey/" + document.getElementById("weather-api-input-box").value, success: function(result){
    console.log(result);
    if(result == 'true'){
      $("#left-side").html("<div><h1>All Set!</h1></div>");
      $("#right-side").html("<div><div class=\"button button-full-width button-selected\">Let's Start</div></div>");
      clearInterval(backdropInterval);
      document.addEventListener("keydown", pageFiveListener);
    }
  }});
  
  
}

function pageFiveListener(e){
  e = e || window.event;
  if (e.keyCode == '13'){
    // Enter
    window.location = "http://127.0.0.1:8081/main/index.html"
  }
}