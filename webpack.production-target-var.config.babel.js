import Config from 'webpack-config'
import { libraryName } from './webpack.base.config'

export default new Config().extend({
  'webpack.production-target-umd.config.babel.js': config => {
    config.output.filename = libraryName + '.min.js'
    return config
  }
}).merge({
  output: {
    library: 'ParticleEditorPlugin',
    libraryTarget: 'var',
    umdNamedDefine: false
  }
})
