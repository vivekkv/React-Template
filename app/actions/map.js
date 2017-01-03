import { GET_AVILABLE_DRIVERS, SET_AVILABLE_DRIVERS } from '../constants/map'

export function getAvilableDrivers(viewPort, dispatch) { 
    return {
        type: GET_AVILABLE_DRIVERS,
        viewPort,
        dispatch
    }
}

export function updateConnectedDrivers(connectedDrivers) {
    return {
        type: SET_AVILABLE_DRIVERS,
        connectedDrivers
    }
}