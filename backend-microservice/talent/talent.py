from flask import Flask, json, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

talent_data = [
{
  "firstName": "Tanvi",
  "lastName": "raj",
  "email": "tanvi@gmail.com",
  "location": "LA",
  "skills": "Driver",
  "tags": "jobs",
  "jobtype": [
    "parttime",
    "shortterm"
  ],
  "contactdetails": [
    "tanvi@gmail.com",
    "12"
  ]
},
{
  "firstName": "Tanvi",
  "lastName": "raj",
  "email": "tanvi@gmail.com",
  "location": "LA",
  "skills": "Driver",
  "tags": "jobs",
  "jobtype": [
    "parttime",
    "shortterm"
  ],
  "contactdetails": [
    "tanvi@gmail.com",
    "12"
  ]
},
{
  "firstName": "Tanvi",
  "lastName": "raj",
  "email": "tanvi@gmail.com",
  "location": "LA",
  "skills": "Driver",
  "tags": "jobs",
  "jobtype": [
    "parttime",
    "shortterm"
  ],
  "contactdetails": [
    "tanvi@gmail.com",
    "12"
  ]
},
{
  "firstName": "Tanvi",
  "lastName": "raj",
  "email": "tanvi@gmail.com",
  "location": "LA",
  "skills": "Driver",
  "tags": "jobs",
  "jobtype": [
    "parttime",
    "shortterm"
  ],
  "contactdetails": [
    "tanvi@gmail.com",
    "12"
  ]
},
{
  "firstName": "Tanvi",
  "lastName": "raj",
  "email": "tanvi@gmail.com",
  "location": "LA",
  "skills": "Driver",
  "tags": "jobs",
  "jobtype": [
    "parttime",
    "shortterm"
  ],
  "contactdetails": [
    "tanvi@gmail.com",
    "12"
  ]
}
]

@app.route('/')
def index():
    return json.dumps({'message': 'hello world'}), 200
  
@app.route('/talent', methods=['GET', 'POST'])
def handle_talent():
    # json should be None for GET request, not None for POST
    print(request.json)
    if request.method == 'GET':
      # respond with list of all talent
      return json.dumps({'message': 'Retrieved successfully', 'talent': talent_data, 'count': len(talent_data) }), 200
    elif request.method == 'POST':
      # add job to list of talent
      talent_data.append(request.json)
      return json.dumps({'message': 'Added successfully'}), 200

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True, port=5003)