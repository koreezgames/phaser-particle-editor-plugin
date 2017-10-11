import Config from 'webpack-config'
import webpack from 'webpack'

export default new Config().extend('webpack.development.config.babel.js').merge({
  output: {
    pathinfo: false
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ]
})
