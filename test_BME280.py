import Adafruit_BME280
import os
import json

PiWeather = os.path.abspath("PiWeather.txt")

def readWeather(sensor):
    degrees = sensor.read_temperature()
    pascals = sensor.read_pressure()
    hectopascals = pascals / 100
    humidity = sensor.read_humidity()

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

    print("Temp      = {0:0.3f} deg C".format(degrees))
    print("Pressure  = {0:0.2f} hPa".format(hectopascals))
    print("Humidity  = {0:0.2f} %".format(humidity))


readWeather("me")
