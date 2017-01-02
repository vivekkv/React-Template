var Db = require("../../db");

module.exports = class Vehicle {

    constructor() {
        this.DB = Db.get();
    }

    register(vehicle, cb) {
        this.DB.collection('Vehicles').insertOne({
            "userId": vehicle.ownerId, 
            "numberPlate": vehicle.numberPlate
        }, function(err, result) {
                if(err) {
                    cb(err, null)
                } else {
                    cb(null, result, true)
                }
        });
    }
}