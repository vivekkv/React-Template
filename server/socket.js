var MapService = require('./bll/services/mapService')

exports.init = (io) => {

    var objMapService = new MapService();
    io.sockets.on("connection", function(socket) {

        socket.on("getConnctedDrivers", function(data) {
            objMapService.getConnectedDrivers(data.viewPort).then((connectedDrivers) => {
                 socket.emit('connectedDrivers', connectedDrivers)
            }) 
        })
    })
}