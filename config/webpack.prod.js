const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const common = require('./webpack.common.js')
const buildConfig = require('./build')
const isNoHash = process.env.NO_HASH_ENV === 'true'
const isCDN = process.env.CDN_ENV === 'true'

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
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCssAssetsPlugin()
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
    filename: isNoHash ? `${buildConfig.staticName}/[name].js` : `${buildConfig.staticName}/[name].[contenthash:${buildConfig.hashLength}].js`,
    chunkFilename: isNoHash ? `${buildConfig.staticName}/[name].bundle.js` : `${buildConfig.staticName}/[name].[chunkhash:${buildConfig.hashLength}].bundle.js`,
    path: path.resolve(__dirname, `../${buildConfig.outputName}`)
  }
})
