### 地图实例

##### 1 - 点击地图获取经纬度

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo"  
        :center="center"
        :zoom="zoom"  
        class="amap-demo"
        :events="events">
      </el-amap>
      <div class="toolbar">
        lng: {{ lng }} lat: {{ lat }}
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
      data: function() {
        let self = this;
        
        return {
          zoom: 12,
          center: [121.59996, 31.197646],
          events: {
            click(e) {
              let { lng, lat } = e.lnglat;
              self.lng = lng;
              self.lat = lat;
            }
          },
          lng: 0,
          lat: 0
        };
      }
    };
  </script>

</script>
