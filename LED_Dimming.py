import RPi.GPIO as GPIO  # GPIO Library
import os
import json

PiLed1 = os.path.abspath("PiLed1.txt")
PiLed2 = os.path.abspath("PiLed2.txt")
PiLed3 = os.path.abspath("PiLed3.txt")

WebLed1 = os.path.abspath("WebLed1.txt")
WebLed2 = os.path.abspath("WebLed2.txt")
WebLed3 = os.path.abspath("WebLed3.txt")

class LED(object):

    def __init__(self, port):
        self.light = GPIO.PWM(port, 100)
        self.light.start(0)
        self.dim = 0;

    def getLight(self):
        return self.light

    def setLight(self, dimLevel):
        self.dim = dimLevel
        self.light.ChangeDutyCycle(dimLevel)

#-----write led levels from the hardware------#
def writeLed(light1, light2, light3):
    j_obj1 = {};
    j_obj1['module'] = "lights"
    j_obj1['id'] = 1
    j_obj1['power'] = light1.dim

    j_obj2 = {};
    j_obj2['module'] = "lights"
    j_obj2['id'] = 2
    j_obj2['power'] = light2.dim

    j_obj3 = {};
    j_obj3['module'] = "lights"
    j_obj3['id'] = 3
    j_obj3['power'] = light3.dim

    output1 = json.dumps(j_obj1)
    output2 = json.dumps(j_obj2)
    output3 = json.dumps(j_obj3)

    file_obj1 = open(PiLed1, "w")
    file_obj1.truncate()
    file_obj1.write(output1)
    file_obj1.close()

    file_obj2 = open(PiLed2, "w")
    file_obj2.truncate()
    file_obj2.write(output2)
    file_obj2.close()

    file_obj3 = open(PiLed3, "w")
    file_obj3.truncate()
    file_obj3.write(output3)
    file_obj3.close()
    
#------read led levels from the web----------#
def readLed(light1, light2, light3):
    file_obj1 = open(WebLed1)
    input = file_obj1.read()
    if input != "":
        light1.setLight(input['power'])
    file_obj1.close()

    file_obj2 = open(WebLed2)
    input = file_obj2.read()
    if input != "":
        light2.setLight(input['power'])
    file_obj2.close()

    file_obj3 = open(WebLed3)
    input = file_obj3.read()
    if input != "":
        light3.setLight(input['power'])
    file_obj3.close()


