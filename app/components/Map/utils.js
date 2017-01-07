import uuid from 'node-uuid';
import _ from 'lodash'

export function loadGMapScript() {
    return new Promise((resolve, reject) => {
        let s = document.createElement('script')
        s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAgOrOsvT4C2ZDwoajE14JFNwRAdpS4LlEv=3&libraries=geometry'
        s.onload = resolve
        s.onerror = reject
        let x = document.getElementsByTagName('script')[0]
        x.parentNode.insertBefore(s, x)
    });
}

export function loadGMap(mapDom, props) {
    return new google.maps.Map(mapDom, props)
}

export function buildMarker(options) {
    return new google.maps.Marker({
        position: new google.maps.LatLng(options.coords.lat, options.coords.lng),
        title: options.title ? options.title: "",
        visible: options.visible == false ? false : true,
        draggable: options.draggable == true ? true : false,
        icon: options.icon ? options.icon : null
    })
}

export function buildCircle(map) {
    return new google.maps.Circle({
        map: map,
        radius: 10,    
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        
    })
}

export function getMapViewPort(map) {
    if(map.getBounds()) {
        return {
            lat0: map.getBounds().getNorthEast().lat(),
            lat1: map.getBounds().getSouthWest().lat(),
            lng0: map.getBounds().getNorthEast().lng(),
            lng1: map.getBounds().getSouthWest().lng()
        }
    }
}

export function setMapCenter(map, center) {
    if(center)
        map.setCenter(center)
}

export function addMarkerOnUserLocation(map, center, markerRegistry, showCircle) {
    var marker = buildMarker({
        coords: center,
        draggable: true
    })
    marker.setMap(map)
    markerRegistry.add("this_user", marker)
    addCircleOnUserLocation(marker, map)
    return marker
}

export function addDriverMarkerLocations(drivers, markerRegistry, map) {
    drivers.forEach((driver) => {
        var driverMarker = markerRegistry.find(driver.id);     
        if(driverMarker) {
             
        } else {
            var marker = buildMarker({
                coords: { lat: driver.coords.lat, lng: driver.coords.lng }
            })
            marker.setMap(map)
        }
    });
}

function addCircleOnUserLocation(marker, map) {
    var circle = buildCircle(map);
    circle.bindTo('center', marker, 'position');
}