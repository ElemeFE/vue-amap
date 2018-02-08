const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.lib_build.env
const rules = utils.styleLoaders({
      sourceMap: false,
      extract: false
});
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })
  ],
  devtool: config.lib_build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.lib_build.assetsRoot,
    filename: 'index.js',
    chunkFilename: 'index.js',
    library: 'VueAMap',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      }
  }
})

module.exports = webpackConfig
