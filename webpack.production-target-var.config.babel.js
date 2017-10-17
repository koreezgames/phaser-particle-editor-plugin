import Config from 'webpack-config'
import path from 'path'

export default new Config().extend('webpack.production-target-umd.config.babel.js').merge({
  entry: path.join(__dirname, '/src/com/koreez/particleeditorplugin/ParticleEditorPlugin.js'),
  output: {
    filename: 'plugin.min.js',
    library: 'ParticleEditorPlugin',
    libraryTarget: 'var',
    umdNamedDefine: false
  },
  externals: {
    'phaser': 'Phaser'
  }
})
