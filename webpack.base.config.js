import path from 'path'
import Config from 'webpack-config'
import packagejson from './package.json'

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-arcade-physics.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')

let main = packagejson.main
main = main.replace(/^.*[\\/]/, '')

export const libraryName = main.substring(0, main.lastIndexOf('.'))

export default new Config().merge({
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    path: path.join(__dirname, '/lib'),
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
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
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /pixi\.js/,
        use: ['expose-loader?PIXI']
      },
      {
        test: /phaser-arcade-physics\.js$/,
        use: ['expose-loader?Phaser']
      }
    ]
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi
    },
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: []
})
