from flask import Flask, json, request
from flask_cors import CORS

import requests

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return json.dumps({'message': 'hello world'}), 200

@app.route('/mapsearch', methods=['GET'])
def handle_mapsearch():
  baseUrl = 'https://api.tomtom.com/search/2/categorySearch'

  queryString = 'limit=5&lat=37.763659&lon=-122.485595&radius=10000&key=9L0w6Db1cMEBaDmsAi69ky2wIIkvAHPV'
  forward_url = baseUrl + '/pizza.json?' + queryString # `${baseUrl}/${query}.json?${queryString}`
  response = requests.get(forward_url)
  return response.content, response.status_code


if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True, port=5002)