#import Adafruit_BME280
import os
import json
import random

PiWeather = "/var/www/html/cash_json/PiWeather.json"

def readWeather(sensor):
    degrees = "%.1f" % random.uniform(71.2, 73.4)
    hectopascals = "%.2f" % (random.randint(930, 937) * 0.02953)
    humidity = random.randint(12, 15)

    j_obj = {};
    j_obj['module'] = "weather"
    j_obj['temp'] = degrees
    j_obj['pressure'] = hectopascals
    j_obj['humidity'] = humidity

    output = json.dumps(j_obj)

    file_obj = open(PiWeather, "w")
    file_obj.truncate()
    file_obj.write(output)
    file_obj.close()
