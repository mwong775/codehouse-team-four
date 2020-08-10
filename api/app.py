from flask import Flask, json, request
from flask_cors import CORS
from flask_socketio import SocketIO, send

import requests

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'secret!'
socketIo = SocketIO(app, cors_allowed_origins="*")

app.debug = True
app.host = 'localhost' # localhost?

data = []

@socketIo.on("message")
def handleMessage(msg):
  print(msg)
  send(msg, broadcast=True)
  return None

@app.route('/')
def index():
    return json.dumps({'message': 'hello world'}), 200
  
@app.route('/jobs', methods=['GET', 'POST'])
def handle_jobs():
    # json should be None for GET request, not None for POST
    print(request.json)
    if request.method == 'GET':
      # respond with list of all jobs
      return json.dumps({'message': 'Retrieved successfully', 'jobs': data, 'count': len(data) }), 200
    elif request.method == 'POST':
      # add job to list of jobs
      data.append(request.json)
      return json.dumps({'message': 'Added successfully'}), 200

@app.route('/mapsearch', methods=['GET'])
def handle_mapsearch():
  baseUrl = 'https://api.tomtom.com/search/2/categorySearch'
  key = ''
  # dummy inputs (not used)
  lat = 37.763659
  long = -122.485595
  query = 'pizza'
  limit = 5
  radius = 10000

  queryString = 'limit=5&lat=37.763659&lon=-122.485595&radius=10000&key=9L0w6Db1cMEBaDmsAi69ky2wIIkvAHPV'; #`limit=${limit}&lat=${lat}&lon=${long}&radius=${radius}&key=${this.state.apiKey}`
  forward_url = baseUrl + '/pizza.json?' + queryString #`${baseUrl}/${query}.json?${queryString}`
  response = requests.get(forward_url)
  return response.content, response.status_code


if __name__ == '__main__':
  socketIo.run(app, host='0.0.0.0')
  # app.run(host='0.0.0.0', debug=True)