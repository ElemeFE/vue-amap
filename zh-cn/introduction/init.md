# 初始化

---

## 引入地图

一般项目中，对于 vue-amap 的初始化只需要调用 `initAMapApiLoader` 方法即可。

NPM 安装：

```javascript
import VueAMap from 'vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'YOUR_KEY',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',...],
  v: '1.4.4'
});
```

CDN 引入：

```javascript
window.VueAMap.initAMapApiLoader({
  key: 'YOUR_KEY',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',...],
  v: '1.4.4'
});
```

## Promise

在**定制化程度较高**的项目中，开发者可能只想通过 vue-amap 引入高德地图，而部分实例化的操作直接基于高德地图的 sdk 完成。这个时候就需要 `lazyAMapApiLoaderInstance`。

NPM 安装：

```javascript
import VueAMap from 'vue-amap';
import { lazyAMapApiLoaderInstance } from 'vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'YOUR_KEY',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',...],
  uiVersion: '1.0' // ui库版本，不配置不加载,
  v: '1.4.4'
});

lazyAMapApiLoaderInstance.load().then(() => {
  // your code ...
  this.map = new AMap.Map('amapContainer', {
    center: new AMap.LngLat(121.59996, 31.197646)
  });
});
```

CDN 引入：

```javascript
window.VueAMap.initAMapApiLoader({
  key: 'YOUR_KEY',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',...],
  v: '1.4.4'
});

window.VueAMap.lazyAMapApiLoaderInstance.load().then(() => {
  // your code ...
  this.map = new AMap.Map('amapContainer', {
    center: new AMap.LngLat(121.59996, 31.197646)
  });
});
```

## 参数

参数名  | 类型  |  默认值 | 描述 |
--- | --- | --- | --- |
key | `String` | `` | 高德 Key |
plugin | `Array` | `['Autocomplete', 'PlaceSearch', 'PolyEditor', 'CircleEditor']` | 插件 |
uiVersion | `String` | `` | UI库 版本 |
v | `String` | `1.4.4` | SDK 版本 |
protocol | `String` | `https` | 引用协议 |

