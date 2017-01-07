exports.init = (io) => {
    io.sockets.on("connection", function(socket) {

        socket.on("getConnctedDrivers", function(data) {
            
        })

        socket.on("connectDriver", function(data) {

        })
    })
}