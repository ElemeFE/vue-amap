# 安装

---

## npm 安装

推荐 npm 安装。

```
npm install vue-amap --save
```

## CDN

目前可通过 [unpkg.com/vue-amap](https://unpkg.com/vue-amap/dist/index.js) 获取最新版本的资源。

```html
<script src="https://unpkg.com/vue-amap/dist/index.js"></script>
```

## Hello World

通过 CDN 的方式我们可以很容易地使用 vue-amap 写出一个 Hello world 页面。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>demo | vue-amap</title>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="app">
      <el-amap vid="amap"></el-amap>
    </div>
  </body>
  <!-- 先引入 Vue -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- 引入组件库 -->
  <script src="https://unpkg.com/vue-amap/dist/index.js"></script>
  <script>
    // 初始化高德地图的 key 和插件
    window.VueAMap.initAMapApiLoader({
      key: 'YOUR_KEY',
      plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor'],
      // 默认高德 sdk 版本为 1.4.4
      v: '1.4.4'
    });

    new Vue({
      el: '#app',
      data: function(){
        return { }
      }
    });
  </script>
</html>
```
