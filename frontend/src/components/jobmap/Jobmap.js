import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker, Listing } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%',
};


export class Jobmap extends React.Component {
    state = {
        showingInfowWindow: false, // Hides or shows the infoWindow
        activeMarker: {}, // Shows the active marker upon click
        selectedPlace: {}, // SHows the infoWindow to the selected place upon a marker
        // places: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    fetchPlaces(mapProps, map) {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        console.log('service', service);
        // ...
      }

    render() {
        return (
            <Map
                google={this.props.google}
                style={mapStyles}
                // initialCenter={{ lat: 37.5013849408347, lng: -121.97021484375001 }}
                zoom={18}
                // onReady={this.fetchPlaces}
                onClick={this.onMapClicked}>
                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />
                {/* <Listing places={this.state.places} /> */}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ''
})(Jobmap);
