from flask import Flask, json, request
from flask_cors import CORS
from flask_socketio import SocketIO, send

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'secret!'
socketIo = SocketIO(app, cors_allowed_origins="*")

app.debug = True
app.host = 'localhost' # localhost?

jobs_data = [
{
  "company": "VMWare",
  "location": "Palo Alto",
  "jobdesc": "HR",
  "skills": "Communication",
  "tags": "Urgent req",
  "jobtype": [
    "fulltime",
    "parttime",
    "shortterm"
  ]
},
{
  "company": "VMWare",
  "location": "Palo Alto",
  "jobdesc": "HR",
  "skills": "Communication",
  "tags": "Urgent req",
  "jobtype": [
    "fulltime",
    "parttime",
    "shortterm"
  ]
},
{
  "company": "VMWare",
  "location": "Palo Alto",
  "jobdesc": "HR",
  "skills": "Communication",
  "tags": "Urgent req",
  "jobtype": [
    "fulltime",
    "parttime",
    "shortterm"
  ]
},
{
  "company": "VMWare",
  "location": "Palo Alto",
  "jobdesc": "HR",
  "skills": "Communication",
  "tags": "Urgent req",
  "jobtype": [
    "fulltime",
    "parttime",
    "shortterm"
  ]
},
{
  "company": "VMWare",
  "location": "Palo Alto",
  "jobdesc": "HR",
  "skills": "Communication",
  "tags": "Urgent req",
  "jobtype": [
    "fulltime",
    "parttime",
    "shortterm"
  ]
}
]

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
      return json.dumps({'message': 'Retrieved successfully', 'jobs': jobs_data, 'count': len(jobs_data) }), 200
    elif request.method == 'POST':
      # add job to list of jobs
      jobs_data.append(request.json)
      return json.dumps({'message': 'Added successfully'}), 200

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
  socketIo.run(app, host='0.0.0.0')
  # app.run(host='0.0.0.0', debug=True)