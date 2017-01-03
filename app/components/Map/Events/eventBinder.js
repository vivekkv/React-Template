import { getMapViewPort, buildMarker } from '../utils.js'

export default class EventBinder {

    constructor(map, props) {
        this.map = map
        this.props = props
    }   

    init() {
        this.getDriversAroundMe()
    }

    getDriversAroundMe() {
        var self = this;
        this.map.addListener('tilesloaded', function (e) {
            self.props.getAvilableDrivers(getMapViewPort(self.map))
        });     
    }

    // bindOnUserTilesChange() {
    //     var self = this;
    //     this.map.addListener('bounds_changed', function (e) {
    //        self.addAllMarkers();
    //     }); 
    // }

    // addAllMarkers() {
    //     var userViewPort = getMapViewPort(this.map);
    //     if(userViewPort) {
    //         var viewPortCoords = _.filter(coords, (co) => { return userViewPort.lat0 > co.lat && userViewPort.lat1 < co.lat && 
    //              userViewPort.lng0 > co.lng && userViewPort.lng1 < co.lng })
    //         viewPortCoords.forEach((co) => {
    //             var marker = buildMarker({
    //                 coords: { lat: co.lat, lng: co.lng },
    //             })
    //             marker.setMap(this.map)
    //         })
    //     }
    // }
}