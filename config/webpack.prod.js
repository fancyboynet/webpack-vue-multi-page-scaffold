const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const common = require('./webpack.common.js')
const buildConfig = require('./build')
const isNoHash = !!process.env.NO_HASH_ENV
const isCDN = !!process.env.CDN_ENV

module.exports = merge(common, {
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: 'vendor',
          name: "vendor",
          chunks: "all"
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    },
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new MiniCssExtractPlugin({
      filename: `${buildConfig.staticName}/[name].css`,
      chunkFilename: isNoHash ? `${buildConfig.staticName}/[name].css` : `${buildConfig.staticName}/[name].[chunkhash:${buildConfig.hashLength}].css`
    })
  ],
  output: {
    publicPath: isCDN ? buildConfig.cdnPublicPath : buildConfig.publicPath,
    filename: `${buildConfig.staticName}/[name].bundle.js`,
    chunkFilename: isNoHash ? `${buildConfig.staticName}/[name].bundle.js` : `${buildConfig.staticName}/[name].[chunkhash:${buildConfig.hashLength}].bundle.js`,
    path: path.resolve(__dirname, `../${buildConfig.outputName}`)
  }
})
