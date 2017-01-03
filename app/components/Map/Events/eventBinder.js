import coords from '../coords.js'
import { getMapViewPort, buildMarker } from '../utils.js'

export default class EventBinder {

    constructor(map) {
        this.map = map;
    }   

    bind() {
        this.bindOnUserTilesChange();
    }

    bindOnUserTilesChange() {
        var self = this;
        this.map.addListener('bounds_changed', function (e) {
           self.addAllMarkers();
        }); 
    }

    addAllMarkers() {
        var currentCoords = { lat: 9.9312328, lng: 76.26730409999999 };
        var userViewPort = getMapViewPort(this.map);
        if(userViewPort) {
            var viewPortCoords = _.filter(coords, (co) => { return userViewPort.lat0 > co.lat && userViewPort.lat1 < co.lat && 
                 userViewPort.lng0 > co.lng && userViewPort.lng1 < co.lng })
            viewPortCoords.forEach((co) => {
                var marker = buildMarker({
                    coords: { lat: co.lat, lng: co.lng },
                })
                marker.setMap(this.map)
            })
        }
    }
}