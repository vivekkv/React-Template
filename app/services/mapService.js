import OcheNetwork from '../oCheNet'
import { put } from 'redux-saga/effects'

var socket = new OcheNetwork().getSocket()

export function emitGetConnectedUsers(viewPort) {

    socket.emit("getConnctedDrivers", viewPort)

    socket.on("connectedDrivers", function(data) {
         put({
            type: "DONE"
        })
    })
}