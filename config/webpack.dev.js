const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const mockRouter = require('../mock/router')
const buildConfig = require('./build')

let config = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${buildConfig.host}:${buildConfig.port}${buildConfig.publicPath}app/`],
      }
    })
  ],
  devtool: 'inline-source-map',
  output: {
    publicPath: buildConfig.staticPath,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, `../${buildConfig.outputName}`)
  },
  devServer: {
    contentBase: [path.resolve(__dirname, `../${buildConfig.outputName}`), path.resolve(__dirname, `../mock`)],
    hot: true,
    host: buildConfig.host,
    port: buildConfig.port,
    historyApiFallback: true,
    quiet: true,
    before: mockRouter,
    publicPath: buildConfig.publicPath
  }
})

module.exports = config
