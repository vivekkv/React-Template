var _ = require("lodash")
var availableDrivers = [];

exports.enable = function(driver, cb) {

    if(validate(driver)) {
        var driverOnQueue = find(driver, (qDriver) => {
            if(qDriver) {
                update(driver, cb)
            } else {
                availableDrivers.push({
                    "id": driver.id,
                    "lat": driver.coords.lat,
                    "lng": driver.coords.lng,
                    "status": driver.status
                })
                cb(null, " DRIVER ADDED TO THE QUEUE ")
            }
        })
    } else {
        cb(" NOT VALID DRIVER ")
    }
}

exports.find = function(driver, cb) {

    var driver = _.find(availableDrivers, (d) => { return d.id == driver.id })
    cb(driver)
}

exports.update = function(driver, cb) {

    if(validate(driver)) {
        find(driver, (qdriver) => {
            if(qDriver) {
                qDriver.coords.lat = driver.coords.lat
                qDriver.coords.lng = driver.coords.lng           
                qDriver.status     = driver.status
                cb(null, " DRIVER INFO UPDATED ")
            } else {
                cb(" DRIVER INFO NOT FOUND ")
            }
        })
    } else {
        cb(" NOT VALID DRIVER")
    }
}

exports.disable = function(driver, cb) {

    if(validate(driver)) {
        find(driver, (qdriver) => {
            if(qDriver) {
                qDriver.status = "offline"
                cb(null, " DRIVER DISABLED ")
            } else {
                cb(" DRIVER INFO NOT FOUND ")
            }
        })
    } else {
        cb(" NOT VALID DRIVER")
    }
}

function validate(driver) {

    if(!driver.id) {
        return false;
    }
    if(!driver.coords || !driver.coords.lng || !driver.coords.lat) {
        return false
    }
    return true;
}