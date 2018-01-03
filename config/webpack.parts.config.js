const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')

exports.cleanup = paths => ({
  plugins: [
    new CleanWebpackPlugin(paths, { root: process.cwd(), verbose: false }),
  ],
})

exports.loadJs = ({ babelOptions }) => ({
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
        ],
      },
      {
        test: /phaser-arcade-physics\.js/,
        use: ['expose-loader?Phaser'],
      },
    ],
  },
})

exports.sourceMaps = method => ({
  devtool: method,
})

exports.minifyJavaScript = () => ({
  plugins: [new UglifyWebpackPlugin({ sourceMap: true })],
})

exports.scopeHoisting = () => ({
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
})

exports.attachRevision = () => ({
  plugins: [
    new webpack.BannerPlugin({
      banner: new GitRevisionPlugin().version(),
    }),
  ],
})
