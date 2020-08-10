import React from 'react';
import axios from 'axios';
import './Jobmap.css';
import ReactSearchBox from 'react-search-box';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const data = [
    { "name": "Tazaki Sushi", "coordinates": [37.761103, -122.498838], "position": "Server" },
    { "name": "Starbucks", "coordinates": [37.762933, -122.488315], "position": "Barista" },
    { "name": "Sheng Kee Bakery", "coordinates": [37.763410, -122.478988], "position": "Baker" },
    { "name": "iTea", "coordinates": [37.763561, -122.481215], "position": "Bobarista" },
]

export class Jobmap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            geoLocation: {
                latitude: 37.763659, 
                longitude: -122.485595,
            },
            geoError: null,
            searchResults: [],
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
        // let baseUrl = 'https://api.tomtom.com/search/2/categorySearch';
        // let queryString = `limit=${limit}&lat=${lat}&lon=${long}&radius=${radius}&key=${this.state.apiKey}`;
        // let response = await axios.get(`${baseUrl}/${query}.json?${queryString}`);
        let response = await axios.get('http://localhost:5000/mapsearch');
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
                    {data.map((places) => {
                        return (
                            <Marker position={places.coordinates}>
                            <Popup>
                                <h3>{places.name}</h3> {places.position}
                         </Popup>
                        </Marker>
                        )
                    })}
                </Map>
            </div>
        );
        
    }
}