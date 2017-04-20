import RPi.GPIO as GPIO

#read only class to detect the state of the door switch
class doorSensor(object):

    def __init__(self):
        self.door = 1

    def readDoorSensor(self):
        if GPIO.input(22):
            self.door = 0;
            return 0;
        else:
            self.door = 1;
            return 1;

GPIO.setmode(GPIO.BOARD)  # the pin numbers refer to the board connector not the chip
GPIO.setup(22, GPIO.INPUT, GPIO.PUD_UP) # set up pin ?? (one of the above listed pins) as an input with a pull-up resistor
if GPIO.input(22):
    print("switch is open")
else:
    print("switch is closed")