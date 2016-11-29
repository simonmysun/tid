module.exports = {
  entry: "./lib/frontend/src/main.js",
  output: {
    path: __dirname,
    filename: "./lib/frontend/build/scripts.js",
    publicPath: "/assets/"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.css$/, loader: "style!css"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader?name=./lib/frontend/build/fonts/[name].[ext]'
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  }
};
