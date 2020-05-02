# Raspberry Pi Smart Tv

A project to elevate older tvs' to a newer standard.

## Current Features

- Home Screen with slideshow of nice images
- Live Weather, current time

## Currently In Development

- Snapshot-3 Fixes
- App Menu
- Settings App

## Setup

1. Download Latest Release
2. Extract file to location of your choosing
3. In a terminal, navigate to the `python` folder within the project files.
4. Enter the command `pip3 install bottle`
   - You may need to install python, with the following command: `sudo apt-get install python3`
5. Enter the command `python3 main.py`
6. Open Chromium, and navigate to `http://127.0.0.1:8081/setup/index.html`
7. Set to fullscreen

### Snapshot-3 Changes

- First Time Setup Screen
  - Allows users to set their Country and City for weather
  - Guides users into getting their weather api key, and allows copy - pasting into mobile device.
![Setup Home Screen](https://raw.githubusercontent.com/DimaMzk/raspberry-pi-smarttv/master/readme-images/sn-3-setup-home.png)
![Country Select Screen](https://raw.githubusercontent.com/DimaMzk/raspberry-pi-smarttv/master/readme-images/sn-3-setup-c-select.png)
![All Set](https://raw.githubusercontent.com/DimaMzk/raspberry-pi-smarttv/master/readme-images/sn-3-setup-allset.png)

#### Known Issues with Snapshot-3.1

- Due to the on screen keyboard being english only characters, it iss not possible to enter some cities.
  - If this is the case, enter an invalid city or leave it blank, and continue with the setup as normal, then:
    - Before clicking `Let's Go!`; from the python folder goto: `web/main/json_files`
    - open `userinformation.json` with a text-editor of your choice. In the city field, replace the value with your city of choice.
    - You may now click `Let's Go!`
