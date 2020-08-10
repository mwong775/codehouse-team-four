import React from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export class SearchJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [{
                headerName: "Make", field: "make", sortable: true, filter: true
                }, {
                headerName: "Model", field: "model", sortable: true, filter: true
                },{
                headerName: "Price", field: "price", sortable: true, filter: true
            }],
            rowData: [],
            style: {
                width: '100%',
                height: '100%'
            },
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/getjobsdata')
        .then(result => result.json())
        .then(rowData => this.setState({rowData}))
    }

    render() {
        return (
            <div className="ag-theme-alpine" style={this.state.style}>
                <h1>List of Available Jobs</h1>
                <div style={this.state.style}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}>
                    </AgGridReact>
                </div>
            </div>
        );
      }
}