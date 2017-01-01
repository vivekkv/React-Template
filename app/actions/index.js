import * as constants from '../constants';

export function updateUserLocation(position) {
    return {
        type   : constants.UPDATE_USER_LOCATION,
        center : {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
    }
}