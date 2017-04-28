import RPi.GPIO as GPIO #gpio library
import time  # for sleep function
import Adafruit_BME280 #weather sensor class
import LED_Dimming #LED class contol module
import Door_Switch #doorsensor control module
import test_BME280 #function to read BME280
import threading
import pygame
#import Camera

GPIO.setmode(GPIO.BCM)  # BCM = nclumbers in green box next to GPIO bins

#-------------LED pins-----------------------#
GPIO.setup(23, GPIO.OUT)  # set GPIO 25 as output for blue led
GPIO.setup(24, GPIO.OUT)  # set GPIO 25 as output for green led
GPIO.setup(25, GPIO.OUT)  # set GPIO 24 as output for red led

#-------------door switch pin--------------------#
GPIO.setup(17, GPIO.IN, GPIO.PUD_UP) #set GPIO 17 as input for door sensor


#Initialize each led
led1 = LED_Dimming.LED(23)    #blue led
led2 = LED_Dimming.LED(24)    #green led
led3 = LED_Dimming.LED(25)    #red led

#initialize BME280 weather sensor
sensor = "weather sensor"
test_BME280.readWeather(sensor)

#initialize the door sensor to read gpio 17
doorSensor = Door_Switch.doorSensor()

#t = threading.Thread(target=Camera.mainCamera)
#t.start()

while True:

	doorSensor.writeAlarm()
	doorSensor.readDoorSensor(17)
	doorSensor.readAlarm()

	test_BME280.readWeather(sensor)

	LED_Dimming.writeLed(led1,led2,led3)
	LED_Dimming.readLed(led1,led2,led3)

#    if doorSensor.readDoorSensor(17):
#        print("switch is open")
#    else:
#        print("switch is closed")
	

time.sleep(5)
GPIO.cleanup()
