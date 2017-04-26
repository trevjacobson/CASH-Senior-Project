import io
import picamera
import logging
import socketserver
from threading import Condition
from http import server
import json
import time
import threading

PAGE = """\
<html>
<head>
<title>picamera MJPEG streaming demo</title>
</head>
<body>
<h1>PiCamera MJPEG Streaming Demo</h1>
<img src="stream.mjpg" width="640" height="480" />
</body>
</html>
"""


class StreamingOutput(object):
    def __init__(self):
        self.frame = None
        self.buffer = io.BytesIO()
        self.condition = Condition()

    def write(self, buf):
        if buf.startswith(b'\xff\xd8'):
            # New frame, copy the existing buffer's content and notify all
            # clients it's available
            self.buffer.truncate()
            with self.condition:
                self.frame = self.buffer.getvalue()
                self.condition.notify_all()
            self.buffer.seek(0)
        return self.buffer.write(buf)


class StreamingHandler(server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(301)
            self.send_header('Location', '/index.html')
            self.end_headers()
        elif self.path == '/index.html':
            content = PAGE.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
        elif self.path == '/stream.mjpg':
            self.send_response(200)
            self.send_header('Age', 0)
            self.send_header('Cache-Control', 'no-cache, private')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Content-Type', 'multipart/x-mixed-replace; boundary=FRAME')
            self.end_headers()
            try:
                while True:
                    with output.condition:
                        output.condition.wait()
                        frame = output.frame
                    self.wfile.write(b'--FRAME\r\n')
                    self.send_header('Content-Type', 'image/jpeg')
                    self.send_header('Content-Length', len(frame))
                    self.end_headers()
                    self.wfile.write(frame)
                    self.wfile.write(b'\r\n')
            except Exception as e:
                logging.warning(
                    'Removed streaming client %s: %s',
                    self.client_address, str(e))
        else:
            self.send_error(404)
            self.end_headers()


class StreamingServer(socketserver.ThreadingMixIn, server.HTTPServer):
    allow_reuse_address = True
    daemon_threads = True


# cannot do circular buffer to concatinate to recording,
# circular buffer (picamera spitter) in use for streaming
# record on motion function
def recordMotion():
    testInput = "null"
    filename = 'testJSON.json'
    # quick check if system is exiting before initializing loop
    with open(filename) as f_obj:
        testInput = json.load(f_obj)
        f_obj.close()

    while testInput != "exit":
        # get json string for testInput
        with open(filename) as f_obj:
            testInput = json.load(f_obj)
            f_obj.close()

        if testInput == "rec":
            timeFileName = time.strftime("%d,%b,%y-%H:%M:%S", time.localtime())
            camera.start_recording(timeFileName + '.h264', format='h264', splitter_port=2)
            time.sleep(10)
            camera.stop_recording(splitter_port=2)

            print("done recording")

            # set jason file to null for next motion event
            testInput = "null"
            filename = 'testJSON.json'
            with open(filename, 'w') as f_obj:
                json.dump(testInput, f_obj)
                f_obj.close()
        # wait for low risk of collision, will collide without wait
        time.sleep(1)


# streaming function
with picamera.PiCamera() as camera:
    camera.resolution = (320, 240)
    camera.framerate = 24
    output = StreamingOutput()
    camera.start_recording(output, format='mjpeg')

    # Start a new thread to implement motion recording
    t = threading.Thread(target=recordMotion)
    t.start()

    try:
        address = ('', 8000)
        server = StreamingServer(address, StreamingHandler)
        # Will hang here forever, or until cancelled,
        # streamToWeb.py needs to be implemented outside the main loop
        server.serve_forever()
    finally:
        camera.stop_recording()