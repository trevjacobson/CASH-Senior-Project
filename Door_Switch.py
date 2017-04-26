import RPi.GPIO as GPIO
import os

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.IN, GPIO.PUD_UP)

PiAlarm = os.path.abspath("PiAlarm.txt")
webAlarm = os.path.abspath("WebAlarm.txt")
#read only class to detect the state of the door switch
class doorSensor(object):

    def __init__(self):
        self.alarm = "off"
        self.door = 0

    def setAlarm(self, alarm):
        self.alarm = alarm

    def getAlarm(self):
        return self.alarm;

    def readDoorSensor(self, doorGPIO):
        if self.alarm == "on" & self.door == 1:
            self.alarm == "triggered"

        if GPIO.input(doorGPIO):
            self.door = 1;
            return 1;
        else:
            self.door = 0;
            return 0;

    def writeAlarm(self):
        j_obj = {};
        j_obj['module'] = "alarm"
        j_obj['state'] = self.alarm
        file_obj = open(PiAlarm, "w")
        os.ftruncate(file_obj, 0)
        os.lseek(fd, 0, os.SEEK_SET)
        file_obj.write(j_obj)
        file_obj.close()

    def readAlarm(self):
        file_obj = open(webAlarm, "r")
        file_content = file_obj.read()
        j_obj = json.loads(file_content)
        state = j_obj['state']
        self.alarm = state









