import { take, actionChannel } from 'redux-saga/effects'
import { GET_AVILABLE_DRIVERS } from '../constants/map'
import { emitGetConnectedUsers } from '../services/mapService'
import { updateConnectedDrivers } from '../actions/map' 
import OcheNetwork from '../oCheNet'

var socket = new OcheNetwork().getSocket()

export function* fetchAvilableDirvers() {
    while(true) {
        let { viewPort, dispatch } = yield take(GET_AVILABLE_DRIVERS)
        socket.emit("getConnctedDrivers", { viewPort })
        socket.on("connectedDrivers", function(connectedDrivers) {
            dispatch(updateConnectedDrivers(connectedDrivers))
        })
    }
}