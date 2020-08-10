from flask import Flask, json, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

talent_data = [
{
  "firstName": "Tanvi",
  "lastName": "Raj",
  "email": "tanvi@gmail.com",
  "location": "LA",
  "skills": "Driver",
  "tags": "jobs",
  "jobtype": [
    "part-time",
    "short-term"
  ],
  "contactdetails": [
    "tanvi@gmail.com" ]
},
{
  "firstName": "Sayli",
  "lastName": "Karnik",
  "email": "sayli@gmail.com",
  "location": "NYC",
  "skills": "Driver",
  "tags": "jobs",
  "jobtype": [
    "full-time",
  ],
  "contactdetails": [
    "sayli@gmail.com",
  ]
},
{
  "firstName": "Devika",
  "lastName": "Shanbhag",
  "email": "devika@gmail.com",
  "location": "SEA",
  "skills": "Driver",
  "tags": "jobs",
  "jobtype": [
    "part-time",
    "short-term"
  ],
  "contactdetails": [
    "devika@gmail.com",
  ]
},
{
  "firstName": "Melanie",
  "lastName": "Wong",
  "email": "melanie@gmail.com",
  "location": "SF",
  "skills": "Driver",
  "tags": "jobs",
  "jobtype": [
    "full-time",
    "short-term"
  ],
  "contactdetails": [
    "melanie@gmail.com",
  ]
},
{
  "firstName": "Virali",
  "lastName": "Thakkar",
  "email": "virali@gmail.com",
  "location": "CA",
  "skills": "Driver",
  "tags": "jobs",
  "jobtype": [
    "full-time",
  ],
  "contactdetails": [
    "virali@gmail.com",
  ]
},
{
  "firstName": "Jonas",
  "lastName": "Rosland",
  "email": "jonas@gmail.com",
  "location": "CA",
  "skills": "Driver",
  "tags": "jobs",
  "jobtype": [
    "full-time",
    "short-term"
  ],
  "contactdetails": [
    "jonas@gmail.com",
  ]
},
{
  "firstName": "Katherine",
  "lastName": "Nguyen",
  "email": "katherine@gmail.com",
  "location": "CA",
  "skills": "Driver",
  "tags": "jobs",
  "jobtype": [
    "full-time",
  ],
  "contactdetails": [
    "katherine@gmail.com",
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