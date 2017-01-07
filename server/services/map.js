var db = require("../db")

exports.getAllDriversAround = function(viewPort, cb) {
    db("userLocation")
    .where('latitude', '<', viewPort.lat0)
    .andWhere('latitude', '>', viewPort.lat0)
    .andWhere('longitude', '<', viewPort.lng0)
    .andWhere('longitude', '>', viewPort.lng1)
    .andWhere('role', '=', "driver")
    .then((drivers) => {
        cb(null, drivers)
    })
    .catch((ex) => {
        cb(ex, null);
    })
}