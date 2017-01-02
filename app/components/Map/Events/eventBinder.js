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

           var viewportLatLngBounds = self.map.getBounds();
           var topCenterLatLng = new google.maps.LatLng(viewportLatLngBounds.getNorthEast().lat(), viewportLatLngBounds.getCenter().lng());
           var metersRadius = google.maps.geometry.spherical.computeDistanceBetween(viewportLatLngBounds.getCenter(), topCenterLatLng);
           var radius = metersRadius / 1000;
           console.log(radius)
        }); 
    }
}