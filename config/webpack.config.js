const path = require('path')
const merge = require('webpack-merge')
const packagejson = require('../package.json')

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const parts = require('./webpack.parts.config')

let main = packagejson.main
main = main.replace(/^.*[\\/]/, '')

const libraryName = main.substring(0, main.lastIndexOf('.'))

// Phaser webpack config
const phaserModule = path.resolve('node_modules/phaser-ce/')

const paths = {
  base: path.resolve('src'),
  app: path.resolve('src/index.js'),
  dist: path.resolve('dist'),
  phaser: path.join(phaserModule, 'build/custom/phaser-arcade-physics.js'),
}

const libConfig = merge([
  {
    target: 'web',
    context: paths.base,
    entry: {
      app: paths.app,
    },
    output: {
      path: paths.dist,
      libraryExport: 'default',
    },
    resolve: {
      alias: {
        phaser: paths.phaser,
      },
      modules: [path.resolve('./node_modules'), path.resolve('./src')],
      extensions: ['.json', '.js'],
    },
    plugins: [new CaseSensitivePathsPlugin()],
  },

  parts.loadJs({
    babelOptions: {
      presets: [
        [
          'babel-preset-env',
          {
            modules: false,
            useBuiltIns: 'entry',
            shippedProposals: true,
          },
        ],
        'stage-2',
      ],
      plugins: [],
    },
  }),

  parts.sourceMaps('source-map'),

  parts.cleanup([paths.dist]),

  parts.minifyJavaScript(),

  parts.scopeHoisting(),

  parts.attachRevision(),
])

const varConfig = merge([
  {
    output: {
      filename: 'plugin.min.js',
      library: 'ParticleEditorPlugin',
      libraryTarget: 'var',
      umdNamedDefine: false,
    },
    externals: {
      phaser: 'Phaser',
    },
  },
])

const umdConfig = merge([
  {
    output: {
      library: libraryName,
      filename: libraryName + '.js',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    externals: {
      phaser: {
        commonjs: 'phaser-ce',
        commonjs2: 'phaser-ce',
        amd: 'phaser-ce',
        root: 'Phaser',
      },
    },
  },
])

module.exports = env => {
  const config = merge(libConfig, env === 'var' ? varConfig : umdConfig)
  return config
}
