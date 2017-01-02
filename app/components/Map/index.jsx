import React from 'react';
import { loadGMapScript, loadGMap, buildMarker } from './utils.js';
import MarkerRegistry from './Registries/Marker';
import EventBinder from './Events/eventBinder.js';
import Socket from '../../oCheNet/socket'
import uuid from 'node-uuid';

export default class MapView extends React.Component {

    constructor() {
        super();
        this.map = null;
        this.MarkerRegistry = new MarkerRegistry();
        this.Socket = new Socket().connect();
    }

    render() {
        return <div style={{ height: "100%", width: "100%" }} id="gmapWrapper"></div>
    }

    componentDidMount() {
       loadGMapScript().then(() => {
            var latLng = new google.maps.LatLng(9.9312328, 76.26730409999999)
            this.map = loadGMap(document.getElementById("gmapWrapper"), {
                center: latLng,
                zoom: 18,
                draggableCursor: 'crosshair'
            });
            this.addMarker({
                coords: { lat: 9.9312328, lng: 76.26730409999999 },
                draggable: true
            });
            new EventBinder(this.map).bind();
       })
    }

    addMarker(options) {
        var marker = buildMarker(options)
        marker.setMap(this.map);
        this.MarkerRegistry.add(uuid.v1(), marker, options);
    }
}

MapView.props = {
    options: React.PropTypes.array,
    center: React.PropTypes.object
}

MapView.defaultProps = {
    styles: [{ "featureType": "all", "elementType": "all", "stylers": [{ "invert_lightness": true }, { "saturation": 10 }, { "lightness": 30 }, { "gamma": 0.5 }, { "hue": "#435158" }] }],
}