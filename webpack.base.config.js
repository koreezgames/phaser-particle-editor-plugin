import path from 'path'
import Config from 'webpack-config'
import packagejson from './package.json'

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
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: []
})
