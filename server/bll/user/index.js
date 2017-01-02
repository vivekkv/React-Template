var Db = require("../../db")

module.exports = class User {

    constructor() {
        this.DB = Db.get();
    }

    register(user, cb) {
        this.DB.collection('Users').insertOne({
           "name": user.name,
           "email": user.email,
           "mobile": user.mobile,
           "username": user.userName,
           "password": user.password,
           "role": user.role // Rider | Vehicle
        }, function(err, result) {
            if(err) {
                cb(err, null)
            } else {
                cb(null, result, true)
            }
        });
    }
}