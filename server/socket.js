exports.init = function(io) {
    io.sockets.on("connection", function() {
        console.log("CONNECTED OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    });
}