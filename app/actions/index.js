import * as constants from '../constants';

export function updateUserLocation(position) {
    return {
        type: constants.UPDATE_USER_LOCATION,
        coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
    }
}