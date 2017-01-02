var Db = require("../../db");

module.exports = class Vehicle {

    constructor() {
        this.DB = Db.get();
    }

    register(vehicle, cb) {
        this.DB.collection('Vehicles').insertOne({
            "owner": "vivek"
        }, function(err, result) {
                if(err) {
                    cb(err, null)
                } else {
                    cb(null, result, true)
                }
        });
    }
}