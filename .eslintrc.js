module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  plugins: [
    'html'
  ],
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.config.js'
      }
    }
  },
  'env': {
    'browser': true,
    'node': true,
    'jasmine': true
  },
  'rules': {
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true,
        "optionalDependencies": false,
        "peerDependencies": false
      }
    ],
    'no-console': 'off',
    'no-empty': [
      'error',
      {
        'allowEmptyCatch': true
      }
    ],
    'no-bitwise': 'off',
    'no-param-reassign': 'off'
  }
}
