import json, os
path = os.path.abspath(__file__)
dir_path = os.path.dirname(path)

# search_string = input("Search Query: ")
results = 0
itteration = 1
final_prod = {}
cities_json_file = open(dir_path + '/city.list.json', encoding="utf8")
cities_json_data = cities_json_file.read()
cities_json_data_parsed = json.loads(json.dumps(json.JSONDecoder().decode(cities_json_data)))

country_codes_json_file = open(dir_path + '/country-codes.json', encoding="utf8")
country_codes_json_data = country_codes_json_file.read()
country_codes_json_data_parsed = json.loads(json.dumps(json.JSONDecoder().decode(country_codes_json_data)))

for x in range(1,246):
    print("Processing: " + str(country_codes_json_data_parsed[str(x)]))
    temp_arr = []
    for y in cities_json_data_parsed:
        if(y["country"] == country_codes_json_data_parsed[str(x)].upper()):
            #print(y["name"])
            temp_arr.append(y["name"])
            results = results+1
    final_prod[str(x)] = temp_arr
with open(dir_path + '/all-cities.json', "w+", encoding="utf8") as f:
    json.dump(final_prod, f, ensure_ascii=False)


# O(X * Y)
# O(n^2)
# for x in country_codes_json_data_parsed:
#     print(x)

# 
print("Processed " + str(results) + " Cities")