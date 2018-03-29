const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const mockRouter = require('../mock/router')

let config = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    })
  ],
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, '../output')
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../output'),
    host: 'localhost',
    historyApiFallback: true,
    before: mockRouter
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              js: [
                {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-syntax-dynamic-import']
                  }
                }
              ],
              css: [
                "style-loader",
                'css-loader'
              ]
            }
          }
        }
      }
    ]
  }
})

module.exports = config
