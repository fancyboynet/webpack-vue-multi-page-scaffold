const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const buildConfig = require('./build')
const pages = require('./pages')

const isDevMode = process.env.NODE_ENV !== 'production'
const isNoHash = !!process.env.NO_HASH_ENV
const needEslint = isDevMode && buildConfig.openStandardJs

let srcRoot = path.join(process.cwd(), './src')
let pageRoot = path.join(srcRoot, './page')
let staticRoot = path.join(srcRoot, './static')
let hasStaticRoot = fs.existsSync(staticRoot)

let entry = {
  vendor: buildConfig.vendor
}
let plugins = []

// 遍历pages目录
pages.map((v, i) => {
  entry[v] = `${pageRoot}/${v}/index.js`
  plugins.push(new HtmlWebpackPlugin({
    publicPath: true,
    chunks: ['runtime', 'vendor', v],
    filename: isDevMode ? `${v}.html` : `${buildConfig.templateName ? buildConfig.templateName + '/' : ''}${v}.html`,
    template: `${pageRoot}/${v}/index.html`,
    minify: isDevMode ? false : {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  }))
})
if (hasStaticRoot) {
  plugins.push(new CopyWebpackPlugin([{from: staticRoot, to: `${buildConfig.staticName}`}]))
}
plugins.push(new VueLoaderPlugin())
// plugins.push(new webpack.HashedModuleIdsPlugin())

module.exports = {
  entry: entry,
  plugins: plugins,
  resolve: {
    modules: [srcRoot, 'node_modules'],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: isDevMode ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js',
      '@': srcRoot
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: buildConfig.pageTemplateWithoutHtmlLoader ? /src[\\/]page[\\/].+[\\/]index\.html$/ : []
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: isDevMode ? '[name].[ext]' : (isNoHash ? `${buildConfig.staticName}/[name].[ext]` : `${buildConfig.staticName}/[name].[hash:${buildConfig.hashLength}].[ext]`)
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-object-rest-spread',
            ]
          }
        }].concat(needEslint ? ['eslint-loader'] : []),
        include: [
          srcRoot
        ]
      },
      {
        test: /\.css$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('autoprefixer')()
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'].concat(needEslint ? ['eslint-loader'] : [])
      }
    ]
  }
}
