var mapData = require('./mapData')
var Promise = require("bluebird")
var _ = require("lodash")

module.exports = class MapService {

    getConnectedDrivers(viewPort) {
        return new Promise((resolve, reject) => {
            var drivers = _.filter(mapData, (co) => { return viewPort.lat0 > co.coords.lat && viewPort.lat1 < co.coords.lat && 
                  viewPort.lng0 > co.coords.lng && viewPort.lng1 < co.coords.lng })
            resolve(drivers)
        })
    }
}