import React from 'react';
import axios from 'axios';

export class PostJobs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            job: {
                company: "",
                jobtype: "",
            },
            count: 0,
        }
    }

    componentDidMount() {
        this.getJobs();
    }

    getJobs() {
        const url = 'http://localhost:5000/jobs';
        axios.get(url)
            .then(response => {
                // console.log('response', response.data.jobs);
                this.setState({ 
                    jobs: response.data.jobs,
                    count: response.data.count });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    jobsList() {
        return this.state.jobs.map(function (currentJob, i) {
            return (
                <p>{currentJob.company}, {currentJob.jobtype}</p>
            );
        })
    }

    handleAddJob = (e) => {
        e.preventDefault();
        const job = {
            company: "Duolingo",
            jobtype: "Internship",
        };

        axios.post('http://localhost:5000/jobs', job)
            .then(res => {
                this.state.jobs.push(job);
                this.state.count++;
                this.setState({
                    jobs: this.state.jobs,
                    count: this.state.count,
                })
            })
            .catch(err => console.log(err))
            .finally(function () {
            });
        // this.setState({
        //     count: this.state.count + 1
        // });
        // this.getJobs();

    }

    render() {
        return (
            <div>
                <h1>PostJobs Component Works!</h1>
                <button onClick={this.handleAddJob}>yolo</button>
                {this.jobsList()}
                <p>Job count: {this.state.count}</p>
            </div>
        );
    }
}