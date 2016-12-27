module.exports = [
  {
    entry: [
      './src/frontend/main.js'
    ],
    output: {
      filename: './static/scripts.js'
    },
    devtool: 'source-map',
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'url-loader?name=./[name].[ext]'
        }
      ]
    },
    plugins: [],
    resolve: {
      extensions: ['', '.js', '.json', '.jsx']
    }
  }
];
