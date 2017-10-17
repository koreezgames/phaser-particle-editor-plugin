import Config from 'webpack-config'
import webpack from 'webpack'
import { libraryName } from './webpack.base.config'

export default new Config().extend('webpack.development.config.babel.js').merge({
  output: {
    pathinfo: false,
    filename: `${libraryName}.min.js`,
    umdNamedDefine: true
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
