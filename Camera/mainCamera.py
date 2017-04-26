import json
import threading


# calls a new thread to start streaming and recording functions streamtoWeb.py
def start_stream():
    import Camera.streamToWeb


testInput = "Hi"
filename = 'testJSON.json'
with open(filename, 'w') as f_obj:
    json.dump(testInput, f_obj)

# simple way to start new thread for streamToWeb.py
t = threading.Thread(target=start_stream)
t.start()

while testInput != "exit":
    testInput = input("Enter 'rec' to record, or 'exit' to exit\n")
    filename = 'testJSON.json'
    with open(filename, 'w') as f_obj:
        json.dump(testInput, f_obj)
        f_obj.close()