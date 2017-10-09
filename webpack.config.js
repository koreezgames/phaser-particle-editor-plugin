import Config, { environment } from 'webpack-config'

environment.setAll({
  env: () => process.env.NODE_ENV
})

// Also you may use `'conf/webpack.[NODE_ENV].config.js'`
export default new Config().extend('webpack.[env].config.js')
