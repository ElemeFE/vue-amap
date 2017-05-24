# Geolocation

Geolocation定位服务插件。融合了浏览器定位、高精度IP定位、安卓定位 sdk 辅助定位等多种手段，提供了获取当前准确位置、获取当前城市信息、持续定位(浏览器定位)等功能。用户可以通过两种当时获得定位的成败和结果，一种是在 getCurrentPosition 的时候传入回调函数来处理定位结果，一种是通过事件监听来取得定位结果。Geolocation 定位常见问题说明 注：默认情况下，PC端优先使用精确IP定位，解决多数浏览器无法完成定位的现状，IP定位失败后使用浏览器定位；手机端优先使用浏览器定位，失败后使用IP定位；对于安卓WebView页面的开发者，可以结合定位 sdk 进行辅助定位，详细说明见 useNative 参数。IP定位的精度值为 null。

由于 Chrome 、IOS10 等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级您的站点到 HTTPS 。

## 示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
      </el-amap>

      <div class="toolbar">
        <span v-if="loaded">
          location: lng = {{ lng }} lat = {{ lat }}
        </span>
        <span v-else>正在定位</span>
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    module.exports = {
      data() {
        let self = this;
        return {
          center: [121.59996, 31.197646],
          lng: 0,
          lat: 0,
          loaded: false,
          plugin: [{
            pName: 'Geolocation',
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                    self.lng = result.position.lng;
                    self.lat = result.position.lat;
                    self.center = [self.lng, self.lat];
                    self.loaded = true;
                    self.$nextTick();
                  }
                });
              }
            }
          }]
        };
      }
    };
  </script>

</script>
