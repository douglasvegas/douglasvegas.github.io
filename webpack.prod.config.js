const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const nodemodulesPath = path.resolve(__dirname, 'node_modules')
const pathToReact = path.resolve(nodemodulesPath, 'react/dist/react.min.js')
const pathToReactDOM = path.resolve(nodemodulesPath, 'react-dom/dist/react-dom.min.js')
const argv = require('yargs').argv

const modelName = argv.env.M
const contextUrl = path.resolve(__dirname, modelName)
const publicPath = `./${modelName}/dist/`
let buildFileName = 'index.html'
if (modelName === 'main') {
  buildFileName = `${path.resolve(__dirname)}/index.html`
}
const buildPath = path.resolve(contextUrl, 'dist')

module.exports = {
  context: contextUrl,
  devtool: 'inline-source-map',
  entry: {
    index: ['./src/app'],
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: buildPath,
    publicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.join(__dirname, './src')
    ],
    alias: {
      'react.js': pathToReact,
      'react-dom.js': pathToReactDOM
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'"
      }
    }),
    new ExtractTextPlugin('index.[contenthash:8].css'),
    new WebpackMd5Hash(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: buildFileName,
      template: 'index.html',
      inject: true,
      // chunks:['bundle'], //加载指定模块、否则加载所有模块
      hash: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin(
      [`${contextUrl}/dist/*`], // 匹配文件
      {
        root: __dirname, // 根目录
        verbose: true, // 开启在控制台输出信息
        dry: false  // 启用删除文件
      }
        )
  ]
}
