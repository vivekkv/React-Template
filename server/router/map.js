var express = require("express")
var router = express.Router()
var mapData = require("./mapData")
var db = require('../db')

router.get("/", function(req, res) {
    // var Donor = db.get().collection("Donor");
    // Donor.find().toArray(function(err, docs) {
    //     res.json({comments: docs})
    // })
    res.json(mapData)
});

module.exports = router;