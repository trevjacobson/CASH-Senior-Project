import RPi.GPIO as GPIO
import os
import pygame
import json
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.IN, GPIO.PUD_UP)

soundObject = ""

def startSound():
	pygame.mixer.init()
	soundObject = pygame.mixer.Sound("houseAlarm.wav")
	soundObject.play()

def stopSound():
	pygame.mixer.stop()
	
PiAlarm = "/var/www/html/cash_json/PiAlarm.json"
webAlarm = "/var/www/html/cash_json/WebAlarm.json"
camera_file = "/var/www/html/cash_json/CameraState.json"
#read only class to detect the state of the door switch
class doorSensor(object):

    def __init__(self):
        self.alarm = "on"
        self.door = 0

    def setAlarm(self, alarm):
        self.alarm = alarm


    def readDoorSensor(self, doorGPIO):
        if self.alarm == "on" and self.door == 1 and not pygame.mixer.get_busy() :
            self.alarm = "triggered"
            startSound()

            j_obj = {};
            j_obj['module'] = "camera"
            j_obj['state'] = "rec"

            output = json.dumps(j_obj)
            file_obj = open(camera_file, "w")
            file_obj.truncate()
            file_obj.write(output)
            file_obj.close()

        if GPIO.input(doorGPIO):
            self.door = 1
        else:
            if self.alarm == "on" and self.door == 1 :
                self.door = 1
            else:
                self.door = 0

    def writeAlarm(self):
        j_obj = {};
        j_obj['module'] = "alarm"
        j_obj['state'] = self.alarm

        output = json.dumps(j_obj)
        file_obj = open(PiAlarm, "w")
        file_obj.truncate()
        file_obj.write(output)
        file_obj.close()

    def readAlarm(self):
        file_obj = open(webAlarm, "r")
        file_content = file_obj.read()
        j_obj = json.loads(file_content)
        state = j_obj['state']
        if state == "off" and pygame.mixer.get_busy():
            stopSound()

            j_obj = {};
            j_obj['module'] = "camera"
            j_obj['state'] = "off"

            output = json.dumps(j_obj)
            file_obj = open(camera_file, "w")
            file_obj.truncate()
            file_obj.write(output)
            file_obj.close()

        if self.alarm == "triggered" and state == "off":
            self.alarm = state
        elif state == "on" and self.alarm != "triggered":
            self.alarm = state
			
