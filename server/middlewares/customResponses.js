function responseExtensions(req, res, next) {

    res.sendError = function(errorMsg) {
        res.json({ msg: errorMsg, success: false })
    }

    res.sendSuccess = function(successMsg, payLoad) {
        res.json({ msg: successMsg, success: true, payLoad: payLoad })
    }
    
    next();
}

module.exports = responseExtensions;