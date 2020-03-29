# Raspberry Pi Smart Tv
A project to elevate older tvs' to a newer standard.

## Current Features
- Home Screen with slideshow of nice images
- Live Weather, current time

#### Short Term Plans:
- Apps Menu
- Settings App

#### Long Term Plans:
- Google Tasks Integration
- Automated Setup
- YouTube App
- Some Form of Casting Support

## Setup:
1. Download Latest Release
2. Extract file to location of your choosing
3. In a terminal, navigate to the `html` folder within the project files.
4. Enter the command `py -m http.server 8000`
   - You may need to install python, with the following command: `sudo apt-get insall python3`
5. Open Chromium, and navigate to `http://localhost:8000`
6. Set to fullscreen

## Getting Live Weather
This project uses Open Weather to get live weather. This requires your own API key.
1. Navigate to [https://openweathermap.org/price](https://openweathermap.org/price) and register for a free account
2. You will have an API key emailed to you.
3. Copy the emailed API key to your clipboard
4. Open `index.js` within the HTML folder, with the editor of your choice
5. Replace `[WEATHER_API]` with the key you received
6. Replace `[CITY_NAME]` with the city you live in. Ex. Victoria
7. Replace `[COUNTRY_CODE]` with your country code. Ex `ca` for Canada
8. Save, then All Done!

### Snapshot-2 Changes:
- Added on screen keyboard that uses arrow keys and enter to navigate.
  - Common USB remotes use this for navigation
![On Screen Keyboard](https://raw.githubusercontent.com/DimaMzk/raspberry-pi-smarttv/master/readme-images/keyboard.png)

### Snapshot-1:
- Displays Slidehow
- Displays Live Weather
- Shows Current Time
![Home Screen with live weather](https://raw.githubusercontent.com/DimaMzk/raspberry-pi-smarttv/master/readme-images/home.png)
