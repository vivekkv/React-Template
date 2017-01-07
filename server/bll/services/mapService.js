var mapData = require('./mapData')
var Promise = require("bluebird")
var _ = require("lodash")
var Db = require("../../db")

module.exports = class MapService {

    constructor() {
    }

    getConnectedDrivers(viewPort) {
        return new Promise((resolve, reject) => {
            var drivers = _.filter(mapData, (co) => { return viewPort.lat0 > co.coords.lat && viewPort.lat1 < co.coords.lat && 
                  viewPort.lng0 > co.coords.lng && viewPort.lng1 < co.coords.lng })
            resolve(drivers)
        })
        // this.DB.collection('OnlineDrivers').find({
        //     status : "avilable",
        //     lat : {
        //         lat: { $lt: viewPort.lat0 },
        //         lat: { $gt: viewPort.lat1 },
        //     } 
        // })
    }

    connectDriver(driver, cb) {
        this.DB.collection('OnlineDrivers').insertOne({
            coords: driver.coords,
            driverId: driver.driverId,
            status: "avilable"
        }, function(err, result) {
            if(err) {
                cb(err, null)
            } else {
                cb(null, result, true)
            }
        });
    }

    updateDriverLocation(location, cb) {
        this.DB.collection('OnlineDrivers').findOneAndUpdate({
            id: location.driver.id
        }, function(err, result) {
            if(err) {
                cb(err, null)
            } else {
                cb(null, result, true)
            }
        });
    }
}