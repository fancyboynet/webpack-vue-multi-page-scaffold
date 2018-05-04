const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevMode = process.env.NODE_ENV !== 'production'
let srcRoot = path.join(process.cwd(), './src')
let pageRoot = path.join(srcRoot, './page')
let entry = {}
let plugins = []

let pages = fs.readdirSync(pageRoot)

// 遍历pages目录
pages.map((v, i) => {
  let stat = fs.statSync(path.join(pageRoot, v))
  if (!stat.isDirectory()) {
    return
  }
  entry[v] = `${pageRoot}/${v}/index.js`
  plugins.push(new HtmlWebpackPlugin({
    chunks: ['runtime', 'common', v],
    filename: `${v}.html`,
    template: `${pageRoot}/${v}/index.html`
  }))
})
module.exports = {
  entry: entry,
  plugins: plugins,
  resolve: {
    modules: [srcRoot, "node_modules"],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          isDevMode ? "style-loader": MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less/,
        use: [
          isDevMode ? "style-loader": MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
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
                isDevMode ? "style-loader": MiniCssExtractPlugin.loader,
                'css-loader'
              ]
            }
          }
        }
      }
    ]
  }
}
