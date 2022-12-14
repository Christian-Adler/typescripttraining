// https://webpack.js.org/configuration
const path = require('path');

// http://localhost:8080/webpack-dev-server
// https://webpack.js.org/configuration/devtool/

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/dist",
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
