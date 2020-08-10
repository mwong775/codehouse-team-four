from flask import Flask, json, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

jobs_data = [
{
  "company": "StarBucks",
  "location": "Palo Alto",
  "jobdesc": "Store Supervisor",
  "skills": "Cordial, multitasking",
  "tags": "Urgent req",
  "jobtype": [
    "fulltime",
  ]
},
{
  "company": "iTea",
  "location": "New york",
  "jobdesc": "Shift worker",
  "skills": "",
  "tags": "",
  "jobtype": [
    "parttime",
  ]
},
{
  "company": "Information Technology Services",
  "location": "Los Angeles",
  "jobdesc": "Student worker",
  "skills": "customer facing experience",
  "tags": "F1 visa status",
  "jobtype": [
    "fulltime",
  ]
},
{
  "company": "Sheng kee Bakery",
  "location": "China",
  "jobdesc": "Baker",
  "skills": "Baking skills",
  "tags": "Urgent req",
  "jobtype": [
    "fulltime",
    "shortterm"
  ]
},
{
  "company": "Data Analyst",
  "location": "Bangalore",
  "jobdesc": "HR",
  "skills": "Python,R",
  "tags": "Masters",
  "jobtype": [
    "fulltime",
    "remote"
  ]
}
,
{
  "company": "First choice housing",
  "location": "Florida",
  "jobdesc": "Housing management assistant",
  "skills": "Prompt",
  "tags": "",
  "jobtype": [
    "fulltime",
    "shortterm",
  ]
},
{
  "company": "Domino's Pizza",
  "location": "United Kingdom",
  "jobdesc": "Store assistant",
  "skills": "Good communication",
  "tags": "friendly",
  "jobtype": [
    "fulltime",
    "parttime"
  ]
},
{
  "company": "Office of Internation Services",
  "location": "United Kingdom",
  "jobdesc": "Backend administrator",
  "skills": "Good communication",
  "tags": "",
  "jobtype": [
    "fulltime",
    "parttime"
  ]
},
{
  "company": "Wag!",
  "location": "San Francisco",
  "jobdesc": "Dog walker",
  "skills": "Loves Pets",
  "tags": "",
  "jobtype": [
    "parttime"
  ]
},
{
  "company": "Doordash",
  "location": "San Jose",
  "jobdesc": "Food delivery assistant",
  "skills": "Driving, friendly",
  "tags": "",
  "jobtype": [
    "parttime"
  ]
},
{
  "company": "Ralphs",
  "location": "Michigan",
  "jobdesc": "Supermarket delivery staff",
  "skills": "Driving, friendly",
  "tags": "",
  "jobtype": [
    "parttime",
    "shortterm"
  ]
},
{
  "company": "FastLearner Inc",
  "location": "Remote",
  "jobdesc": "English Language Trainer",
  "skills": "Knows English",
  "tags": "",
  "jobtype": [
    "parttime",
    "shortterm"
  ]
},
{
  "company": "Stony Brook",
  "location": "New York",
  "jobdesc": "Teaching Assistant",
  "skills": "Master's in Computer Science",
  "tags": "",
  "jobtype": [
    "parttime",
  ]
},
{
  "company": "StayFit",
  "location": "Remote",
  "jobdesc": "Yoga instructor",
  "skills": "certified instructor",
  "tags": "",
  "jobtype": [
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