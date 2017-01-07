var path = require('path')
var express = require("express")
var app = express()
var custResponses = require("./middlewares/customResponses")

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

// res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
// res.end()
// })

app.get('/', function(req,res) {
  res.sendfile(path.join(__dirname, "./assets/bin/index.html"));
});
app.use('/assets', express.static(path.join(__dirname, "./assets")))
app.use(custResponses);
app.use("/map", require("./routes/map"))

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
var server = app.listen(server_port, server_host, (err) => {
  if (err) {
    return onError(err)
  }
  console.log("SERVER STARTED !")
})

var socket = require("socket.io")
var io = socket(server)
require('./socket').init(io)