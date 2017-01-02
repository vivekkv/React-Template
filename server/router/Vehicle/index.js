var express = require("express")
var router = express.Router()
var Vehicle = require('../../bll/vehicle');

router.post("/", function (req, res) {
    var objVehicle = new Vehicle();
    objVehicle.register({
        "owner": {
            "name": "vivek",
            "mobile": "9947252579"
        },
        "vehicle": {
            numberPlate: "KL-45-H-6946"
        }
    }, function (err, payLoad, success) {
        if (err) {
            res.sendError(err)
        } else {
            res.sendSuccess(null, payLoad)
        }
    })
});

router.get("/", function(req, res) {
    res.send("hello");
})

module.exports = router;