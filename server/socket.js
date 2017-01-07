var driver = require("./services/driver")

exports.init = (io) => {
    
    io.sockets.on("connection", function(socket) {
        
        socket.on("enableDriver", function(driver) {
            
            driver.enable(driver, (err, msg) => {

                if(err) {

                } else {
                    socket.emit("")
                }
            })
        })
    })
}