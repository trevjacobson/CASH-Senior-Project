import RPi.GPIO as GPIO  # GPIO Library
import time  # for sleep function

class LED(object):

    def __init__(self, port):
        self.light = GPIO.PWM(port, 100)
        self.light.start(0)

    def getLight(self):
        return self.light

    def setLight(self, dimLevel):
        self.light.ChangeDutyCycle(dimLevel)


# GPIO.setmode(GPIO.BCM)  # BCM = numbers in green box next to GPIO bins
#
# GPIO.setup(25, GPIO.OUT)  # set GPIO 25 as output for green led
# GPIO.setup(24, GPIO.OUT)  # set GPIO 24 as output for red led
#
# green = GPIO.PWM(25, 100)  # create object green for PWM on port 25 at 100 Hertz
# red = GPIO.PWM(24, 100)  # create object red for PWM on port 24 at 100 Hertz
#
# green.start(0)  # start green led on 0 percent duty cycle (off)
# red.start(100)  # red fully on (100%)
#
# pause_time = 0.02  # speed to dim up/down
#
# try:
#     while True:
#         for i in range(0, 101):  # 101 because it stops when it finishes 100
#             green.ChangeDutyCycle(i)
#             red.ChangeDutyCycle(100 - i)
#             time.sleep(pause_time)
#         for i in range(100, -1, -1):  # from 100 to zero in steps of -1
#             green.ChangeDutyCycle(i)
#             red.ChangeDutyCycle(100 - i)
#             time.sleep(pause_time)
#
# except KeyboardInterrupt:
#     green.stop()  # stop the green PWM output
#     red.stop()  # stop the red PWM output
#     GPIO.cleanup()  # clean up GPIO on CTRL+C exit