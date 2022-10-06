// https://webpack.js.org/configuration
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

// http://localhost:8080/webpack-dev-server
// https://webpack.js.org/configuration/devtool/

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist'),
  },
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
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin()
  ]
};
