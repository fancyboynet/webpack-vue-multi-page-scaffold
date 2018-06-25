const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackIncludeFilePlugin = require('html-webpack-include-file-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const buildConfig = require('./build')
const isDevMode = process.env.NODE_ENV !== 'production'
let srcRoot = path.join(process.cwd(), './src')
let pageRoot = path.join(srcRoot, './page')
let staticRoot = path.join(srcRoot, './static')
let hasStaticRoot = fs.existsSync(staticRoot)

let entry = {
  vendor: buildConfig.vendor
}
let plugins = []
let pages = fs.readdirSync(pageRoot)

function isIncludePage(pageName){
  if(!buildConfig.includePage || !buildConfig.includePage.length){
    return true
  }
  return buildConfig.includePage.includes(pageName)
}

// 遍历pages目录
pages.map((v, i) => {
  let stat = fs.statSync(path.join(pageRoot, v))
  if (!stat.isDirectory()) {
    return
  }
  if(!isIncludePage(v)){
    return
  }
  entry[v] = `${pageRoot}/${v}/index.js`
  plugins.push(new HtmlWebpackPlugin({
    chunks: ['runtime', 'vendor', v],
    filename: isDevMode ? `${v}.html` : `${buildConfig.templateName}/${v}.html`,
    template: `${pageRoot}/${v}/index.html`,
    minify: isDevMode ? false : {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  }))
})
if(hasStaticRoot){
  plugins.push(new CopyWebpackPlugin([ { from: staticRoot, to: `${buildConfig.staticName}` } ]))
}
plugins.push(new VueLoaderPlugin())
plugins.push(new HtmlWebpackIncludeFilePlugin())
// plugins.push(new webpack.HashedModuleIdsPlugin())



module.exports = {
  entry: entry,
  plugins: plugins,
  resolve: {
    modules: [srcRoot, "node_modules"],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@': srcRoot
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: isDevMode ? '[name].[ext]' : `${buildConfig.staticName}/[name].[hash:7].[ext]`
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-object-rest-spread',
            ]
          }
        },
        include: [
          srcRoot,
          /node_modules\/iggfe/
        ]
      },
      {
        test: /\.css$/,
        use: [
          isDevMode ? "style-loader": MiniCssExtractPlugin.loader,
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
          isDevMode ? "style-loader": MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss/,
        use: [
          isDevMode ? "style-loader": MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}
