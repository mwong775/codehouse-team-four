from flask import Flask, json, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

@app.route('/')
def index():
    return json.dumps({'message': 'hello world'}), 200
  
@app.route('/jobs', methods=['GET', 'POST'])
def handle_jobs():
    # json should be None for GET request, not None for POST
    # print(request.json)
    
    if request.method == 'GET':
      # respond with list of all jobs
      return json.dumps({'message': 'Retrieved successfully', 'jobs': jobs_data, 'count': len(jobs_data) }), 200
    elif request.method == 'POST':
      # add job to list of jobs
      jobs_data.append(request.json)
      return json.dumps({'message': 'Added successfully'}), 200

if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True, port=5001)