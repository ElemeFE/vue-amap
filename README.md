<p align="center">
  <img src="https://cdn.rawgit.com/ElemeFE/vue-amap/master/src/docs/assets/images/logo.png">
</p>

# vue-amap
[![Build Status](https://travis-ci.org/ElemeFE/vue-amap.svg?branch=master)](https://travis-ci.org/ElemeFE/vue-amap)
[![npm package](https://img.shields.io/npm/v/vue-amap.svg)](https://www.npmjs.org/package/vue-amap)
[![NPM downloads](http://img.shields.io/npm/dm/vue-amap.svg)](https://npmjs.org/package/vue-amap)
![JS gzip size](http://img.badgesize.io/https://unpkg.com/vue-amap/src/lib/index.js?compression=gzip&label=gzip%20size:%20JS)
[![license](https://img.shields.io/github/license/elemefe/vue-amap.svg?style=flat-square)](https://github.com/ElemeFE/vue-amap)
[![GitHub stars](https://img.shields.io/github/stars/elemefe/vue-amap.svg?style=social&label=Star)](https://github.com/ElemeFE/vue-amap)

> vue-amap是一套基于Vue 2.0和高德地图的地图组件。

## 安装
```
npm install -S vue-amap
```

## 文档
[https://elemefe.github.io/vue-amap](https://elemefe.github.io/vue-amap)


## 快速上手

引入vue-amap

```javascript
// 引入vue-amap
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'YOUR_KEY',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
```

## 组件

### 地图

```vue
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
</el-amap>
```

### 点坐标

```vue
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-marker v-for="marker in markers" :position="marker.position"></el-amap-marker>
</el-amap>
```

### 折线

```vue
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-polyline :path="polyline.path"></el-amap-polyline>
</el-amap>
```

### 多边形

```vue
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-polygon v-for="polygon in polygons" :path="polygon.path" :events="polygon.events"></el-amap-polygon>
</el-amap>
```

### 圆

```vue
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-circle v-for="circle in circles" :center="circle.center" :radius="circle.radius"></el-amap-circle>
</el-amap>
```

### 图片覆盖物

```vue
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-ground-image v-for="groundimage in groundimages" :url="groundimage.url"></el-amap-ground-image>
</el-amap>
```

### 文本

```vue
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-text v-for="text in texts"></el-amap-text>
</el-amap>
```

### 贝塞尔曲线

```vue
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-bezier-curve v-for="line in lines"></el-amap-bezier-curve>
</el-amap>
```

### 圆点标记

```vue
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-circle-marker v-for="marker in markers"></el-amap-circle-marker>
</el-amap>
```

### 椭圆

```vue
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-ellipse v-for="ellipse in ellipses"></el-amap-ellipse>
</el-amap>
```

### 矩形

```vue
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-rectangle v-for="rectangle in rectangles"></el-amap-rectangle>
</el-amap>
```

### 信息窗体

```vue
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-info-window v-for="window in windows" :position="window.position" :content="window.content" :open="window.open"></el-amap-info-window>
</el-amap>
```

### Search-Box

```vue
<el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
<el-amap vid="amapDemo">
</el-amap>
```

### 其他特性

* 支持自定义组件
* 支持官方 UI 组件库

## 反馈

文档被大家吐槽了挺久，这段时间，针对大家的问题，对文档进行了一次升级。后续将重点持续完善「示例中心」，如果大家在使用过程中，遇到了些问题，欢迎提 issue，我们将根据大家的反馈，逐渐充实「示例中心」，更好地为大家服务。
