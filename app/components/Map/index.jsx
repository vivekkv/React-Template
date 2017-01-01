import React from 'react';
import { loadGMapScript, loadGMap } from './utils.js'; 

export default class MapView extends React.Component {

    constructor() {
        super();
        this.map = null;
    }

    render() {
        return <div style={{ height: "100%", width: "100%" }} id="gmapWrapper"></div>
    }

    componentDidMount() {
       loadGMapScript().then(() => {
            var latLng = new google.maps.LatLng(9.9312328, 76.26730409999999)
            this.map = new google.maps.Map(document.getElementById("gmapWrapper"), {
                center: latLng,
                zoom: 8,
                draggableCursor:'crosshair'
            });
            this.addLocationMarker();
       })
    }

    componentDidUpdate() {

        console.log(this.props)
    }

    addLocationMarker() {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(9.9312328, 76.26730409999999),
            title: "asd",
            visible: true,
            draggable: true
        });
        marker.setMap(this.map);
    }

    applyProps() {
        return {
            options: {
                styles: this.props.styles,
                center: this.props.center ? this.props.center : { center: { lat: 0, lng: 0 } }
            },
            markers: [{
                lat: this.props.center ? this.props.center.lat : 0,
                lng: this.props.center ? this.props.center.lng : 0,
                draggable: true,
                icon: '<div class="marker"><img src="https://mts.googleapis.com/maps/vt/icon/name=icons/spotlight/spotlight-waypoint-a.png&text=A&psize=16&font=fonts/Roboto-Regular.ttf&color=ff333333&ax=44&ay=48&scale=1"/></div>'
            }]
        }
    }
}

MapView.props = {
    options: React.PropTypes.array,
    center: React.PropTypes.object
}

MapView.defaultProps = {
    styles: [{ "featureType": "all", "elementType": "all", "stylers": [{ "invert_lightness": true }, { "saturation": 10 }, { "lightness": 30 }, { "gamma": 0.5 }, { "hue": "#435158" }] }],
}