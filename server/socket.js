var driver = require("./services/driver")

exports.init = (io) => {
    
    io.sockets.on("connection", function(socket) {
        
        console.log("connected")
        socket.on("enableDriver", function(driver) {
            
            driver.enable(driver, (err, msg) => {

                if(err) {
                    socket.emit("Error" + socket.id)
                } else {
                    socket.emit("Success" + socket.id)
                }
            })
        })
        console.log("error" + socket.id)
        socket.emit("error" + socket.id, {})
    })
}