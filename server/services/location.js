var db = require("../db")

exports.updateCurrentLocation = function(location) {
     db("userLocation")
    .first([
        'id'
    ])
    .where({
        "userId": location.userId
    })
    .then((userLocation) => {
        if(userLocation) {
            updateUserLocation(location)
        } else {
            addUserToLocation(location)
        }
    })
}

exports.updateUserStatus = function(userStatus) {
     db("userLocation")
    .where("id", "=", userStatus.id)
    .update({
        "status": userStatus.status
    })
}

function updateUserLocation(location) {
     db("userLocation")
    .where("id", "=", location.id)
    .update({
        "latitude": location.latitude,
        "longitude": location.longitude        
    })
}

function addUserToLocation(location) {
     db("userLocation")
    .insert({
        "latitude": location.latitude,
        "longitude": location.longitude,
        "status"  : location.status,
        "userId"  : location.userId
    })
}