# 信息窗体 - 切换

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo"  
        :center="center"
        :zoom="zoom"  
        class="amap-demo">
        <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events"></el-amap-marker>
        <el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
      </el-amap>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }

    .prompt {
      background: white;
      width: 100px;
      height: 30px;
      text-align: center;
    }
  </style>

  <script>
    module.exports = {
      data: function() {
        return {
          zoom: 16,
          center: [121.59996, 31.197646],
          markers: [],
          windows: [],
          window: ''
        };
      },

      mounted() {
        let markers = [];
        let windows = [];

        let num = 10;
        let self = this;

        for (let i = 0 ; i < num ; i ++) {
          markers.push({
            position: [121.59996, 31.197646 + i * 0.001],
            events: {
              click() {
                self.windows.forEach(window => {
                  window.visible = false;
                });

                self.window = self.windows[i];
                self.$nextTick(() => {
                  self.window.visible = true;
                });
              }
            }
          });

          windows.push({
            position: [121.59996, 31.197646 + i * 0.001],
            content: `<div class="prompt">${ i }</div>`,
            visible: false
          });
        }

        this.markers = markers;
        this.windows = windows;
      }
    };
  </script>

</script>
