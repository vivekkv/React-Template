var express = require("express")
var router = express.Router()
var User = require('../../bll/user')
var Vehicle = require('../../bll/vehicle')

router.post("/", function (req, res) {
    var objUser = new User()
    var user = req.body.user
    if (user && validateUserInfo(user)) {
        objUser.register({
            "name": user.name,
            "email": user.email,
            "mobile": user.mobile,
            "username": user.userName,
            "password": user.password,
            "role": user.role // Rider | Driver
        }, function (err, payLoad, success) {
            if (err) {
                res.sendError(err)
            } else {
                if (success && user.role == "Driver") {
                    var objVehicle = new Vehicle()
                    objVehicle.register({
                        "userId": 0,
                        "numberPlate": user.vehicle.numberPlate
                    }, function (err, payLoad, success) {
                        if (err) {
                            res.sendError(err)
                        } else {
                            res.sendSuccess(null, null)
                        }
                    })
                }
            }
        })
    } else {
        res.sendError("Action not permitted");
    }
});

function validateUserInfo(user) {
    if (user.role == "Driver") {
        if (!user.vehicle || !user.vehicle.numberPlate) {
            if (user.vehicle.numberPlate.test("/^[A-Z]{2}[-][0-9]{1,2}(?:-[A-Z])?(?:-[A-Z]*)?-[0-9]{4}$/")) {
                return true;
            }
            return false;
        } else {
            return true;
        }
    }
    return true;
}

module.exports = router;