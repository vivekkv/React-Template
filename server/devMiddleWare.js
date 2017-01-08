exports.init = function(app) {

    const path  = require("path")
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
    app.use(middleware)
    app.use(webpackHotMiddleware(compiler))
    app.get('/', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, "./assets/bin/index.html")))
        res.end()
    })
}