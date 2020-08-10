import React from 'react';

export class Banner extends React.Component {
    render() {
        if (this.props.geoError) {
            return <p className="banner warn">{this.props.geoError.message}</p>;
        } else if (this.props.geoLocation.latitude) {
        return <p className="banner success">
            Lat: <strong>{this.props.geoLocation.latitude.toFixed(4)}</strong>, 
            Long: <strong>{this.props.geoLocation.longitude.toFixed(4)}</strong>
        </p>;
        } else {
            return null
        }
    }
}