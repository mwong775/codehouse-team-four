import React from 'react';
import axios from 'axios';
import './Jobmap.css';
import ReactSearchBox from 'react-search-box';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

export class Jobmap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            map: {},
            geoLocation: {
                latitude: 37.763659, 
                longitude: -122.485595,
            },
            zoom: 15,
            geoError: null,
            apiKey: '9L0w6Db1cMEBaDmsAi69ky2wIIkvAHPV',
            searchResults: [],
            selectedPlace: {
                poi: {
                    name: '',
                    classifications: [],
                },
            },
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((e) => {
            this.setState({
                geoLocation: e.coords
            });
        }, async (err) => {
            this.setState({
                geoError: err
            });
        });
    }

    async onSearchChange(query) {
        if (query.length > 0) {
            let results = (await this.getNearbyPlaces(query, this.state.geoLocation.latitude, this.state.geoLocation.longitude));
            this.setState({
                searchResults: results
            });
        }
    }

    async getNearbyPlaces(query, lat, long, limit = 5, radius = 10000) {
        let baseUrl = 'https://api.tomtom.com/search/2/categorySearch';
        let queryString = `limit=${limit}&lat=${lat}&lon=${long}&radius=${radius}&key=${this.state.apiKey}`;
        let response = await axios.get(`${baseUrl}/${query}.json?${queryString}`);
        console.log('response', response);
        return response.data.results;
    }

    render() {
        return (
            <div>
                {/* <Banner
                    geoLocation={this.state.geoLocation}
                    geoError={this.state.geoError}
                /> */}
                <ReactSearchBox
                    placeholder="Search for nearby places"
                    matchedRecords={this.state.searchResults
                        .map(result => ({
                            key: result.id,
                            name: result.poi.name,
                            dist: result.dist,
                            value: `${result.poi.name} | ${(result.dist / 1000).toFixed(2)}km `
                        }))
                        .sort((a, b) => a.dist - b.dist)
                    }
                    data={this.state.searchResults
                        .map(result => ({
                            key: result.id,
                            name: result.poi.name,
                            dist: result.dist,
                            value: result.poi.name
                        }))
                        .sort((a, b) => a.dist - b.dist)
                    }
                    onSelect={(place) => this.setPlace(place.key)}
                    autoFocus={true}
                    onChange={(query) => this.onSearchChange(query)}
                    fuseConfigs={{
                        minMatchCharLength: 0,
                        threshold: 1,
                        distance: 100000,
                        sort: false
                    }}
                    keys={['name']}
                />
                <Map center={[this.state.geoLocation.latitude, this.state.geoLocation.longitude]} zoom={15}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[this.state.geoLocation.latitude, this.state.geoLocation.longitude]}>
                        <Popup>
                            <h3>Current Location</h3>
                     </Popup>
                    </Marker>
                    <Marker position={[37.761103, -122.498838]}>
                        <Popup>
                            <h3>Tazaki Sushi</h3> Server
                     </Popup>
                    </Marker>
                    <Marker position={[37.762933, -122.488315]}>
                        <Popup>
                            <h3>Starbucks</h3> Barista
                     </Popup>
                    </Marker>
                    <Marker position={[37.763410, -122.478988]}>
                        <Popup>
                            <h3>Sheng Kee Bakery</h3> Baker
                     </Popup>
                    </Marker>
                    <Marker position={[37.763561, -122.481215]}>
                        <Popup>
                            <h3>iTea</h3> Bobarista
                     </Popup>
                    </Marker>
                    <Marker position={[37.763561, -122.481215]}>
                        <Popup>
                            <h3>iTea</h3> Bobarista
                     </Popup>
                    </Marker>
                </Map>
            </div>
        );
        
    }
}