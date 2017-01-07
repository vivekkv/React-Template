var path = require('path')
var express = require("express")
var mapRoutes = require('../server/router/map')
var app = express()
var db = require('./db')
var {
  host,
  port
} = require('./common/config')

// /** DEV MODE */

// const webpack = require('webpack')
// const webpackMiddleware = require('webpack-dev-middleware')
// const webpackHotMiddleware = require('webpack-hot-middleware')
// const config = require('../webpack.config.js')

// const compiler = webpack(config)
// const middleware = webpackMiddleware(compiler, {
//   publicPath: config.output.publicPath,
//   contentBase: 'src',
//   stats: {
//     colors: true,
//     hash: false,
//     timings: true,
//     chunks: false,
//     chunkModules: false,
//     modules: false
//   }
// })

// app.use(middleware)
// app.use(webpackHotMiddleware(compiler))
// app.get('/', function response(req, res) {
//   res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
//   res.end()
// })

// /* END */

app.use('/assets', express.static(path.join(__dirname, '../app/static/assets')))
app.use(express.static("dist"))
app.use("/map", mapRoutes)

// db.connect('mongodb://localhost:27017/FromMeToU', function (err) {
//   if (err) {
//     console.log('Unable to connect to Mongo.')
//   } else {

    
//   }
// })

var server = app.listen(process.env.PORT || 5000, host, (err) => {
  if (err) {
    return onError(err)
  }
  console.log("SERVER STARTED !")
})

var socket = require("socket.io")
var io = socket(server)
require('./socket').init(io)