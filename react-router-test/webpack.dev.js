const webpackMerge = require('webpack-merge')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const common = require('./webpack.common.js')

const devServer = {
  contentBase: '/',
  inline: true,
  host: '0.0.0.0',
  port: 8081,
  historyApiFallback: {
    index: '/index.html'
  },
  stats: {
    children: false
  },
  disableHostCheck: true,
  overlay: true,
  quiet: true
}

const webpackConfig = webpackMerge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: devServer
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devServer.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // add port to devServer config
      webpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      webpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devServer.host}:${port}`]
        }
      }))

      resolve(webpackConfig)
    }
  })
})
