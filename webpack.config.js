const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'bundle.css',
  // disable: process.env.NODE_ENV === "development"
});

const copy = new CopyWebpackPlugin([
  { from: 'app/src/images', to: 'images' }
]);

module.exports = {
  entry: './app/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app/dist')
  },
  // externals: {
  //   'jquery': 'jQuery'
  // },
  devServer: {
    contentBase: path.join(__dirname, 'app'),
    publicPath: '/dist/',
    compress: true,
    host: '192.168.1.105',
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract([
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ])
      }
    ]
  },
  plugins: [
    extractSass,
    copy
  ],
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, 'app/src/@common/'),
      '@pages': path.resolve(__dirname, 'app/src/@pages/')
    }
  }
};
