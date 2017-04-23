import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.IN, GPIO.PUD_UP)
#read only class to detect the state of the door switch
class doorSensor(object):

    def readDoorSensor(self, doorGPIO):
        if GPIO.input(doorGPIO):
            return 1;
        else:
            return 0;

