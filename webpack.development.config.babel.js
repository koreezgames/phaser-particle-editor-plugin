/**
 * Created by sargis on 6/9/17.
 */
import Config from 'webpack-config'
import { libraryName } from './webpack.base.config'

export default new Config().extend('webpack.base.config.js').merge({
  devtool: '#source-map',
  output: {
    filename: `${libraryName}.js`,
    library: `${libraryName}`,
    libraryTarget: 'umd',
    pathinfo: true
  }
})
