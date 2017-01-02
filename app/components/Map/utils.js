export function loadGMapScript() {
    return new Promise((resolve, reject) => {
        let s = document.createElement('script');
        s.src = 'https://maps.googleapis.com/maps/api/js?v=3&sensor=false&libraries=geometry';
        s.onload = resolve;
        s.onerror = reject;
        let x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    });
}

export function loadGMap(mapDom, props) {
    return new google.maps.Map(mapDom, props);
}

export function buildMarker(options) {
    return new google.maps.Marker({
        position: new google.maps.LatLng(options.coords.lat, options.coords.lng),
        title: options.title ? options.title: "",
        visible: options.visible == false ? false : true,
        draggable: options.draggable == true ? true : false,
    })
}

export function buildCircle(map) {
    return new google.maps.Circle({
        map: map,
        radius: 300,    
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
    })
}