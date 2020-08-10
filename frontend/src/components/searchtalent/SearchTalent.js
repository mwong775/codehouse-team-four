import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export class SearchTalent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "FirstName", field: "firstName", sortable: true, filter: true
                }, {
                headerName: "LastName", field: "lastName", sortable: true, filter: true
                }, {
                headerName: "Email", field: "email", sortable: true, filter: true
                }, {
                headerName: "Location", field: "location", sortable: true, filter: true
                }, {
                headerName: "JobType", field: "jobtype", sortable: true, filter: true
                },{
                headerName: "ContactDetails", field: "contactdetails", sortable: true, filter: true
            }],
            rowData: []
        }
    }

    componentDidMount() {
        this.getJobs();
    }

    getJobs() {
        const url = 'http://localhost:5000/talent';
        axios.get(url)
            .then(response => {
                // console.log('response', response.data.jobs);
                this.setState({ 
                    rowData: response.data.talent,
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


    render() {
        return (
            <div className="ag-theme-alpine" style={ {height: '8000px', width: '1500px'} }>
                <h1>List of Job Seekers</h1>
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        );
      }
}