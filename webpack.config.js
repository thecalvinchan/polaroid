const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin= require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname),
  entry: [
    path.resolve(__dirname, 'src/js/main.js'), 
    path.resolve(__dirname, 'src/scss/main.scss')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        loader: 'babel-loader'
      },
      {
        test:/\.scss$/,
        use: ExtractTextPlugin.extract([
          'css-loader',
          'sass-loader'
        ])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};
