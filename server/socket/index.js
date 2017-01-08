var events = require("./events")
exports.init = (io) => {
    io.sockets.on("connection", function(socket) {
        
        events.register(socket)
    })
}