const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    rules: [
      {
        test: /\.json$/,
        loaders: [
          'json-loader'
        ]
      },
      //{
      //  test: /\.js$/,
      //  exclude: /node_modules/,
      //  loader: 'eslint-loader',
      //  enforce: 'pre'
      //},
      {
        test: /\.(css|less)$/,
        loaders: [
          'style-loader',
          'css-loader',
          'less-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader:'vue-loader',
        options: {
          loaders: {
            i18n: '@kazupon/vue-i18n-loader'
          }
        }
      },
      {
        test: /\.png|\.jpg|\.gif|\.eot|\.svg|\.ttf|\.woff$/,
        loaders: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    FailPlugin,
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      },
      debug: true
    })
  ],
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: 'index.js'
  },
  entry: `./${conf.path.src('index')}`
};
