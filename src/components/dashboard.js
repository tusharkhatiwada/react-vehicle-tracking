import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import L from "leaflet";

import axios from "axios";

import iconUrl from "../css/images/marker-icon.png";

import "leaflet/dist/leaflet.css";

const token = sessionStorage.getItem("token");

export default class Dashboard extends Component {
    state = {
        lat: 27.7229222,
        lng: 85.3100364,
        zoom: 14,
        lastLocation: []
    };
    componentDidMount() {
        axios({
            method: "GET",
            url: "http://139.162.2.53:7077/last_position",
            headers: {
                "x-access-token": token
            }
        })
            .then(response => {
                const res = response.data;
                this.setState({
                    lastLocation: res
                });
            })
            .catch(err => {
                console.log("Error getting last position: ", err);
            });
    }
    renderMarker = () => {
        const { lastLocation } = this.state;

        return lastLocation.map(loc => {
            const icon = L.icon({
                iconUrl: iconUrl,
                iconSize: [30, 40],
                iconAnchor: [22, 94],
                popupAnchor: [-3, -76]
            });
            const position = [loc.position.x, loc.position.y];
            return (
                <Marker key={loc.vehicle} position={position} icon={icon}>
                    <Popup>
                        <span>{loc.vehicle_no}</span>
                    </Popup>
                </Marker>
            );
        });
    };
    render() {
        const { lat, lng, zoom } = this.state;
        return (
            <Map center={[lat, lng]} zoom={zoom} style={{ width: "100%", height: "100%" }}>
                <LayersControl position="topright">
                    <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                        <TileLayer
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer checked={true} name="OpenStreetMap.Mapnik">
                        <TileLayer
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    {this.renderMarker()}
                </LayersControl>
            </Map>
        );
    }
}
