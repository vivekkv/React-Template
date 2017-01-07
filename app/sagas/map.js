import { take, actionChannel } from 'redux-saga/effects'
import { GET_AVILABLE_DRIVERS } from '../constants/map'
import { emitGetConnectedUsers } from '../services/mapService'
import { updateConnectedDrivers } from '../actions/map' 
import OcheNetwork from '../oCheNet'

var socket = new OcheNetwork().getSocket()
socket.on("error" + socket.id, function(connectedDrivers) {
    alert()
})
export function* fetchAvilableDirvers() {
    while(true) {
        let { viewPort, dispatch } = yield take(GET_AVILABLE_DRIVERS)
        socket.on("error" + socket.id, function(connectedDrivers) {
            alert()
        })
    }
}