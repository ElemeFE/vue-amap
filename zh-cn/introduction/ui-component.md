# 引入高德 UI 组件库

支持引入高德 UI 组件库，如下，只需在初始化的时候添加 `uiVersion` 的脚本版本号，就能轻松完成脚本的加载及初始化，版本号参考[官方介绍](http://lbs.amap.com/api/javascript-api/guide/amap-ui/intro)

  注：官方组件库出来不久，暂时不会封装。

```javascript
VueAMap.initAMapApiLoader({
  key: 'YOUR_KEY',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',...],
  uiVersion: '1.0.11' // 版本号
});
```

## 使用组件
<vuep template="#example"></vuep>

## 仅使用初始化脚本
<vuep template="#example2"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap vid="amapDemo"  :center="center" :map-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
      </el-amap>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>
  <script>
    // NPM 方式
    // import { AMapManager } from 'vue-amap';
    // CDN 方式
    let amapManager = new VueAMap.AMapManager();
    module.exports = {
      data: function() {
        return {
          zoom: 12,
          center: [121.59996, 31.197646],
          amapManager,
          events: {
            init(map) {
              AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
                const marker = new SimpleMarker({
                  iconLabel: 'A',
                  iconStyle: 'red',
                  map: map,
                  position: map.getCenter()
                });
              });
            }
          }
        };
      }
    };
  </script>

</script>


<script v-pre type="text/x-template" id="example2">
  <template>
    <div id="amap-demo1" class="amap-demo">
    </div>
  </template>
  <style>
    #amap-demo1 {
      height: 300px;
    }
  </style>
  <script>
    // NPM 方式
    // import { lazyAMapApiLoaderInstance } from 'vue-amap';
    // CDN 方式
    const loadPromise = window.VueAMap.lazyAMapApiLoaderInstance.load()
    module.exports = {
      mounted() {
        loadPromise.then(() => {
          console.log('-----')
          this.map = new AMap.Map('amap-demo1', {
            center: [121.59996, 31.197646],
            zoom: 12
          })
          AMapUI.loadUI(['overlay/SimpleMarker'], (SimpleMarker) => {
            const marker = new SimpleMarker({
              iconLabel: 'A',
              iconStyle: 'red',
              map: this.map,
              position: this.map.getCenter()
            });
          });
        })
      }
    };
  </script>

</script>
