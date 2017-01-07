var db = require('../db')
var bcrypt = require('bcrypt-node')

exports.register = function(user, cb) {
    if(user.role == "driver" || user.role ==  "rider") {
        db("users")
        .insert({
            "username": user.userName,
            "passsword": bcrypt.hashSync(user.password)
        })
        .returning('id')
        .then((userId) => {
            user.id = userId
            if(user.role == "driver") {
                addNewDriver(user)
            } else if(role=="rider") {
                addNewRider(rider)
            }
            cb(null, user);
        })
        .catch((er) => {
            cb(er, null)
        })
    }
}

function addNewDriver(driver) {
     db("drivers")
    .insert({
        "email": driver.userName,
        "mobile": driver.mobile,
        "userId": driver.id
    })
}

function addNewRider(rider) {
     db("drivers")
    .insert({
        "email": rider.userName,
        "mobile": rider.mobile,
        "userId": rider.id
    })
}