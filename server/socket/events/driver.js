var driver = require("../../services/driver")

exports.register = function(socket) {
    socket.on("enableDriver", function(driver) {
        driver.enable(driver, (err, msg) => {
            if(err) {
                socket.emit("Error" + socket.id, { err })
            } else {
                socket.emit("Success" + socket.id, { "enabled": true })
            }
        })
    })
}