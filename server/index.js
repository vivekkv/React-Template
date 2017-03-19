var path = require('path')
var express = require("express")
var app = express()
var bodyParser = require('body-parser')
var passport = require('passport')
var config   = require("./common/config")

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

if(process.env.NODE_ENV == "dev") {
    const middleWare = require("./devMiddleWare")
    middleWare.init(app)
} else {
  app.get('/', function(req,res) {
    res.sendfile(path.join(__dirname, "./assets/bin/index.html"))
  })
}

app.use(require("./middlewares/customResponses"))
passport.use('local-login', require('./passport/local-login'))
passport.use('local-signup', require('./passport/local-signup'))

app.use('/api', require('./middlewares/auth-check'))
app.use('/assets', express.static(path.join(__dirname, "./assets")))
app.use("/map", require("./routes/map"))
app.use("/auth", require('./routes/auth'))


var server = app.listen(config.port, config.host, (err) => {
  if (err) {
    return onError(err)
  }
  console.log("SERVER STARTED !")
})

var socket = require("socket.io")
var io = socket(server)
require('./socket').init(io)