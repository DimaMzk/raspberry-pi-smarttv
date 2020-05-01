import os, json, socket
from bottle import route, run, template, static_file, HTTPResponse

# Internal Flags
setup_status = {
    'mob_weather_api_done': False
}

# Get Path To This File
path = os.path.abspath(__file__)
dir_path = os.path.dirname(path)

# Put Device Information to a JSON File
hostname = socket.getfqdn()
IPAddr = [l for l in ([ip for ip in socket.gethostbyname_ex(socket.gethostname())[2] if not ip.startswith("127.")][:1], [[(s.connect(('8.8.8.8', 53)), s.getsockname()[0], s.close()) for s in [socket.socket(socket.AF_INET, socket.SOCK_DGRAM)]][0][1]]) if l][0][0]
print("IP Address: - " + IPAddr)  # Get LOCAL device address
device_information = {"ipaddress": IPAddr}
with open(dir_path + '/web/html/setup/device_information.json', "w+",
          encoding="utf8") as f:
    json.dump(device_information, f, ensure_ascii=False)



# @route('/setup')
# def index(name):
#     return template('<b>Hello {{name}}</b>!', name=name)


@route('/setup/setcountry/<country>')
def setup_set_country(country):
    print("I will set the country to " + country)
    try:
        prev_existing_json_file = open(dir_path + '/web/html/main/json_files/userinformation.json', encoding="utf8")
        prev_existing_json_data = prev_existing_json_file.read()
        prev_existing_json_data_parsed = json.loads(json.dumps(json.JSONDecoder().decode(prev_existing_json_data)))
        prev_existing_json_file.close()
        user_information = prev_existing_json_data_parsed
        country_codes_json_file = open(dir_path + '/web/html/setup/country-codes.json', encoding="utf8")
        country_codes_json_data = country_codes_json_file.read()
        country_codes_json_data_parsed = json.loads(json.dumps(json.JSONDecoder().decode(country_codes_json_data)))
        country_codes_json_file.close()
        print("That converts to country code: " + country_codes_json_data_parsed[country])
        user_information["country_code"] = country_codes_json_data_parsed[country]
        with open(dir_path + '/web/html/main/json_files/userinformation.json', "w+", encoding="utf8") as f:
            json.dump(user_information, f, ensure_ascii=False)
            return HTTPResponse(status=200, body="true")
    except:
        return HTTPResponse(status=500, body="false")


@route('/setup/setcity/<city>')
def setup_set_city(city):
    print("I will set the city to " + city)
    try:

        prev_existing_json_file = open(dir_path + '/web/html/main/json_files/userinformation.json', encoding="utf8")
        prev_existing_json_data = prev_existing_json_file.read()
        prev_existing_json_data_parsed = json.loads(json.dumps(json.JSONDecoder().decode(prev_existing_json_data)))
        prev_existing_json_file.close()
        user_information = prev_existing_json_data_parsed
        user_information["city"] = city
        with open(dir_path + '/web/html/main/json_files/userinformation.json', "w+", encoding="utf8") as f:
            json.dump(user_information, f, ensure_ascii=False)
            return HTTPResponse(status=200, body="true")
    except:
        return HTTPResponse(status=500, body="false")


@route('/setup/setweatherapikey/<apikey>')
def setup_set_weather_api_key(apikey):
    print("I will set the API Key to " + apikey)
    if(apikey.strip().lower().replace(" ", "") == ""):
        return HTTPResponse(status=200, body="false")
    try:
        print("Opening Prev Existing JSON Files")
        prev_existing_json_file = open(dir_path + '/web/html/main/json_files/userinformation.json', encoding="utf8")
        prev_existing_json_data = prev_existing_json_file.read()
        prev_existing_json_data_parsed = json.loads(json.dumps(json.JSONDecoder().decode(prev_existing_json_data)))
        prev_existing_json_file.close()
        print("Closed Existong JSON File")
        user_information = prev_existing_json_data_parsed
        print("Setting Useing Info")        
        user_information["weather_api_key"] = apikey
        print("Setting setup_status flag")
        setup_status['mob_weather_api_done'] = True
        print("Opening and Setting JSON File")
        with open(dir_path + '/web/html/main/json_files/userinformation.json', "w+", encoding="utf8") as f:
            json.dump(user_information, f, ensure_ascii=False)
        print("Done. Returning status")
    except:
        return HTTPResponse(status=500, body="false")
    return HTTPResponse(status=200, body="true")


@route('/setup/setmobilestatus/')
def setup_get_mobile_wather_status():
    print("Mobile Status Was Queried")
    try:
        if(setup_status.get('mob_weather_api_done') is False):
            return HTTPResponse(status=200, body="false")
        else:
            return HTTPResponse(status=200, body="true")
    except:
        return HTTPResponse(status=500, body="unable to access internal flag :/")


@route('/setup/backdrops/<filepath:path>')
def setup_static_backdrops(filepath):
    return static_file(filepath, root=dir_path + '/web/images/backdrops')


@route('/setup/<filepath:path>')
def setup_static(filepath):
    return static_file(filepath, root=dir_path + '/web/html/setup')


@route('/main/backdrops/<filepath:path>')
def main_static_backdrops(filepath):
    return static_file(filepath, root=dir_path + '/web/images/backdrops')


@route('/main/weather_icons/<filepath:path>')
def main_static_weather(filepath):
    return static_file(filepath, root=dir_path + '/web/images/weather_icons')


@route('/main/<filepath:path>')
def main_static(filepath):
    return static_file(filepath, root=dir_path + '/web/html/main')


run(host='0.0.0.0', port=8081, debug=True)
