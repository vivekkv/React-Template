var driverEvents = require("./driver")

exports.register = function(socket) {
    
    driverEvents.register(socket)
}