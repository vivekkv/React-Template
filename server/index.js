var path = require('path')
var express = require("express")
var app = express()
var { host, port } = require('./common/config')
var custResponses = require('./middlewares/customResponses')

/** DEV MODE */
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config.js')
const compiler = webpack(config)
const middleware = webpackMiddleware(compiler, {
publicPath: config.output.publicPath,
contentBase: 'src',
stats: {
colors: true,
hash: false,
timings: true,
chunks: false,
chunkModules: false,
modules: false
}
})
/* END */

app.use(middleware)
app.use(webpackHotMiddleware(compiler))
app.get('/', function response(req, res) {
res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
res.end()
})
app.use(custResponses);
app.use('/assets', express.static(path.join(__dirname, '../app/static/assets')))
app.use(express.static("dist"))

const server = app.listen(port, host, (err) => {
  if (err) {
    return onError(err)
  }
  console.log("SERVER STARTED !")
})
const socket = require("socket.io")
const io = socket(server)
require('./socket').init(io)