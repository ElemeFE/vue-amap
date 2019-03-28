# 快速上手

---

本节将介绍如何在项目中使用 vue-amap。


## 1 - 项目结构

这里提供了简单的示例项目模板。

项目结构为：
```html
|- src/  --------------------- 项目源代码
    |- App.vue
    |- main.js  -------------- 入口文件
|- .babelrc  ----------------- babel 配置文件
|- index.html  --------------- HTML 模板
|- package.json  ------------- npm 配置文件
|- webpack.config.js  -------- webpack 配置文件
```

项目中涉及到的几个文件如下：

.babelrc
```json
{
  "presets": [
    ["es2015", { "modules": false }]
  ]
}
```

index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>vue-amap-starter</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="dist/build.js"></script>
  </body>
</html>
```

package.json
```json
{
  "name": "vue-amap-starter",
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --inline --hot --port 9876",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
  },
  "dependencies": {
    "vue-amap": "^0.0.8",
    "vue": "^2.0.5"
  },
  "devDependencies": {
    "babel-core": "^6.0.0",
    "babel-loader": "^6.0.0",
    "babel-preset-es2015": "^6.13.2",
    "css-loader": "^0.23.1",
    "style-loader": "^0.13.1",
    "cross-env": "^1.0.6",
    "vue-loader": "^9.8.0",
    "webpack": "beta",
    "webpack-dev-server": "beta"
  }
}
```

webpack.config.js
```javascript
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  performance: {
    hints: false
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
```

## 2 - 引入vue-amap

main.js
```javascript
import Vue from 'vue';
import VueAMap from 'vue-amap';
import App from './App.vue';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'your amap key',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

new Vue({
  el: '#app',
  render: h => h(App)
})
```

App.vue
```html
<template>
  <div id="app">
    <h3 class="title">{{ msg }}</h3>
    <div class="amap-wrapper">
      <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'vue-amap向你问好！'
    }
  }
}
</script>

<style>
.amap-wrapper {
  width: 500px;
  height: 500px;
}
</style>
```

## 安装依赖

```javascript
npm install
```

## 构建

```javascript
npm run dev
```
