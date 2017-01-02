exports.init = function(io) {
    io.sockets.on("connection", function(socket) {

        // console.log("ONE USER CONNECTED >>>>>>>>>>>>>>>");
        // socket.on("hi server", function(data) {
        //     socket.broadcast.emit('testclient', data);
        // });

        socket.on("sayHello", function() {
            console.log("Hello fro client");
        })

        socket.emit('hi baby', {'date': new Date()});
    });
}