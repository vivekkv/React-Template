import React from 'react'
import { loadGMapScript, loadGMap, setMapCenter, addDriverMarkerLocations, addMarkerOnUserLocation } from './utils.js'
import MarkerRegistry from './Registries/Marker'
import EventBinder from './Events/eventBinder.js'
import { connect } from 'react-redux'
import { getAvilableDrivers } from '../../actions/map'
import { avilableDrivers } from '../../selectors/map'
import styles from './styles.css'

class MapView extends React.Component {

    constructor() {
        super()
        this.map = null
        this.MarkerRegistry = new MarkerRegistry()
    }

    componentDidMount() {

       loadGMapScript().then(() => {

            this.map = loadGMap(document.getElementById("gmapWrapper"), {
                center: new google.maps.LatLng(0, 0),
                zoom: this.props.zoom,
                draggableCursor: this.props.draggableCursor,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: this.props.styles,
                minZoom: 16, 
                maxZoom: this.props.zoom
            })

            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    let center = { lat: pos.coords.latitude, lng: pos.coords.longitude }
                    setMapCenter(this.map, center)
                    addMarkerOnUserLocation(this.map, center, this.MarkerRegistry, true)
                    new EventBinder(this.map, this.props).init()
                })
            }
       })
    }

    componentWillReceiveProps(nexProps) {
       addDriverMarkerLocations(nexProps.avilableDrivers, this.MarkerRegistry, this.map)
    }

    render() {
        return <div className={styles.mapWrapper} id="gmapWrapper"></div>
    }
}

MapView.props = {
    options: React.PropTypes.array,
    zoom  : React.PropTypes.number,
    draggableCursor: React.PropTypes.string,
    driverLocations: React.PropTypes.array,
    styles: React.PropTypes.array,
    avilableDrivers: React.PropTypes.array
}

MapView.defaultProps = {
    styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]}],
    zoom : 18,
    draggableCursor: "crosshair",
    avilableDrivers: []
}

function mapStateToProps(state) {
    return {
        "avilableDrivers" : avilableDrivers(state) 
    }
}

function mapDispatchToProps(dispatch) {
    return {
        "getAvilableDrivers" : function (viewPort) {
            dispatch(getAvilableDrivers(viewPort, dispatch))
        }
    }
}   

export default connect(mapStateToProps, mapDispatchToProps)(MapView)