var express = require("express")
var router = express.Router()
var mapData = require("./mapData")

router.get("/", function(req, res) {
    res.json(mapData)
})

module.exports = router;