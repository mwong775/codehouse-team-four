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
                headerName: "First Name", field: "firstName", sortable: true, filter: true
                }, {
                headerName: "Last Name", field: "lastName", sortable: true, filter: true
                }, {
                headerName: "Email", field: "email", sortable: true, filter: true
                }, {
                headerName: "Location", field: "location", sortable: true, filter: true
                }, {
                headerName: "Job Type", field: "jobtype", sortable: true, filter: true
                },{
                headerName: "Contact Details", field: "contactdetails", sortable: true, filter: true
            }],
            rowData: []
        }
    }

    componentDidMount() {
        this.getTalent();
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    componentDidUpdate() {
        this.gridApi.sizeColumnsToFit();
    }


    getTalent() {
        const url = 'http://localhost:5003/talent'; // `${process.env.REACT_APP_HOST_IP_ADDRESS}/talent`
        console.log('searchTalent endpoint', url);
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
            <div className="ag-theme-alpine" style={{height: '400px', width: '80%', margin: 'auto'}}>
                <h1>List of Job Seekers</h1>
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    onGridReady={this.onGridReady}>
                </AgGridReact>
            </div>
        );
      }
}