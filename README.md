# vue-amap

vue-amap是基于Vue 2.0和高德地图的地图组件。

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
import AMap from 'vue-amap';
Vue.use(AMap);

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'YOUR_KEY',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});
```

## 组件

### 地图

```javascript
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
</el-amap>
```

### 点坐标

```javascript
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-marker v-for="marker in markers" :position="marker.position"></el-amap-marker>
</el-amap>
```

### 折线

```javascript
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-polyline :path="polyline.path"></el-amap-polyline>
</el-amap>
```

### 多边形

```javascript
<amap vid="amapDemo" :zoom="zoom" :center="center">
  <amap-polygon v-for="polygon in polygons" :path="polygon.path" :events="polygon.events"></amap-polygon>
</amap>
```

### 圆

```javascript
<amap vid="amapDemo" :zoom="zoom" :center="center">
  <amap-circle v-for="circle in circles" :center="circle.center" :radius="circle.radius"></amap-circle>
</amap>
```

### 图片覆盖物

```javascript
<amap vid="amapDemo" :zoom="zoom" :center="center">
  <amap-groundimage v-for="groundimage in groundimages" :url="groundimage.url"></amap-groundimage>
</amap>
```

### 信息窗体

```javascript
<amap vid="amapDemo" :zoom="zoom" :center="center">
  <amap-info-window v-for="window in windows" :position="window.position" :content="window.content" :open="window.open"></amap-info-window>
</amap>
```

### Search-Box

```javascript
<el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
<el-amap vid="amapDemo">
</el-amap>
```
