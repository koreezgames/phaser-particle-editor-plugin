const settings = {
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  extends: 'standard',
  plugins: ['import'],
  settings: {
    'import/parser': 'babel-eslint',
    'import/resolver': {
      webpack: {
        config: 'config/webpack.config.js',
      },
    },
  },
  globals: {
    NODE_ENV: true,
  },
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'no-fallthrough': ['error', { commentPattern: 'break[\\s\\w]*omitted' }],
    'standard/computed-property-even-spacing': 0,
  },
}

module.exports = settings
