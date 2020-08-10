import React from 'react';

export class SearchTalent extends React.Component {
    render() {
        return (
            <div className="ag-theme-alpine" style={ {width: "100%", height: "100%" } }>
                <h1>List of Job Seekers</h1>
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}>
                </AgGridReact>
            </div>
        );
    }
}