import React from 'react'
import { loadGMapScript, loadGMap, buildMarker, buildCircle } from './utils.js'
import MarkerRegistry from './Registries/Marker'
import EventBinder from './Events/eventBinder.js'
import OcheNetwork from '../../oCheNet'
import uuid from 'node-uuid'
import styles from './styles.css'

export default class MapView extends React.Component {

    constructor() {
        super()
        this.map = null
        this.MarkerRegistry = new MarkerRegistry()
        new OcheNetwork().init();
    }

    render() {
        return <div className={styles.mapWrapper} id="gmapWrapper"></div>
    }

    componentDidMount() {
       loadGMapScript().then(() => {

            var latLng = new google.maps.LatLng(9.9312328, 76.26730409999999)
            this.map = loadGMap(document.getElementById("gmapWrapper"), {
                center: latLng,
                zoom: this.props.zoom,
                draggableCursor: this.props.draggableCursor
            })

            var marker = this.addMarker({
                coords: { lat: 9.9312328, lng: 76.26730409999999 },
                draggable: true
            })
            
            this.addCircleOnUserLocation(marker)
            new EventBinder(this.map).bind()
       })
    }

    addMarker(options) {

        var marker = buildMarker(options)
        marker.setMap(this.map)
        this.MarkerRegistry.add(uuid.v1(), marker, options)
        return marker
    }

    addCircleOnUserLocation(marker) {
        var circle = buildCircle(this.map);
        circle.bindTo('center', marker, 'position');
    }
}

MapView.props = {
    options: React.PropTypes.array,
    center: React.PropTypes.object,
    zoom  : React.PropTypes.number,
    draggableCursor: React.PropTypes.string
}

MapView.defaultProps = {
    styles: [{ "featureType": "all", "elementType": "all", "stylers": [{ "invert_lightness": true }, { "saturation": 10 }, { "lightness": 30 }, { "gamma": 0.5 }, { "hue": "#435158" }] }],
    zoom : 16,
    draggableCursor: "crosshair"
}