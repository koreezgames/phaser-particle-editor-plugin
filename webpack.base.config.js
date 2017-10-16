import path from 'path'
import Config from 'webpack-config'
import packagejson from './package.json'

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-arcade-physics.js')

let main = packagejson.main
main = main.replace(/^.*[\\/]/, '')

export const libraryName = main.substring(0, main.lastIndexOf('.'))

export default new Config().merge({
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    path: path.join(__dirname, '/dist'),
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      'phaser': phaser
    },
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: [],
  externals: {
    phaser: {
      commonjs: 'phaser',
      commonjs2: 'phaser',
      amd: 'phaser',
      root: 'Phaser'
    }
  }
})
