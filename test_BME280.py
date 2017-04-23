import Adafruit_BME280


def readWeather(sensor):
    degrees = sensor.read_temperature()
    pascals = sensor.read_pressure()
    hectopascals = pascals / 100
    humidity = sensor.read_humidity()
    altitude = (1-(hectopascals/1013.25)**0.190284)*145366.45
    print "Temp      = {0:0.3f} deg C".format(degrees)
    print "Pressure  = {0:0.2f} hPa".format(hectopascals)
    print "Humidity  = {0:0.2f} %".format(humidity)
    print "Altitude  = {0:0.0f} ft".format(altitude)
