import React from 'react'
import { loadGMapScript, loadGMap, setMapCenter, addMarkerOnUserLocation } from './utils.js'
import MarkerRegistry from './Registries/Marker'
import EventBinder from './Events/eventBinder.js'
import styles from './styles.css'

export default class MapView extends React.Component {

    constructor() {
        super()
        this.map = null
        this.MarkerRegistry = new MarkerRegistry()
    }

    componentWillReceiveProps(nextProps) {

        setMapCenter(this.map, nextProps.center)
        addMarkerOnUserLocation(this.map, nextProps.center, this.MarkerRegistry, true)
    }

    componentDidMount() {

       loadGMapScript().then(() => {
            this.map = loadGMap(document.getElementById("gmapWrapper"), {
                center: new google.maps.LatLng(0, 0),
                zoom: this.props.zoom,
                draggableCursor: this.props.draggableCursor,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [
                        { visibility: "off" }
                    ]
                }] 
            })
       })
    }

    render() {
        return <div className={styles.mapWrapper} id="gmapWrapper"></div>
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
    zoom : 18,
    draggableCursor: "crosshair"
}