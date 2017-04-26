import RPi.GPIO as GPIO  # GPIO Library
import time  # for sleep function

PiLed = os.path.abspath("PiLed.txt")
class LED(object):

    def __init__(self, port):
        self.light = GPIO.PWM(port, 100)
        self.light.start(0)

    def getLight(self):
        return self.light

    def setLight(self, dimLevel):
        self.light.ChangeDutyCycle(dimLevel)


def writeLed(light1, light2, light3):
    j_obj = {};
    j_obj['module'] = "lights"
