export function loadGMapScript() {
    return new Promise((resolve, reject) => {
        let s = document.createElement('script');
        s.src = 'https://maps.google.com/maps/api/js?sensor=false';
        s.onload = resolve;
        s.onerror = reject;
        let x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    });
}

export function loadGMap(mapDom, props) {
    return new google.maps.Map(mapDom, props);
}