/**
 * Created by sargis on 6/9/17.
 */
import Config from 'webpack-config'
import { libraryName } from './webpack.base.config'

export default new Config().extend({
  'webpack.base.config.js': config => {
    config.output.filename = libraryName + '.js'
    console.log(config)
    return config
  }
}).merge({
  devtool: '#source-map',

  output: {
    pathinfo: true
  }
})
