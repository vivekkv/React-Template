export function getUserLocationInfo(onLocationFindSuccess) {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onLocationFindSuccess, () => {
            return null;
        })
    } else {
        return null;
    }
}
