from flask import Flask, json, request
from flask_cors import CORS
from flask_socketio import SocketIO, send

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'secret!'
socketIo = SocketIO(app, cors_allowed_origins="*")

app.debug = True
app.host = 'localhost' # localhost?

@socketIo.on("message")
def handleMessage(msg):
  print(msg)
  send(msg, broadcast=True)
  return None

@app.route('/')
def index():
    return json.dumps({'message': 'hello world'}), 200

if __name__ == '__main__':
  socketIo.run(app, host='0.0.0.0')
  # app.run(host='0.0.0.0', debug=True)