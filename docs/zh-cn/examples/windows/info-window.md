### 信息窗体

##### 1 - 切换信息窗体

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
        <el-amap-info-window v-for="window in windows" :position="window.position" :visible="window.visible" :content="window.content"></el-amap-info-window>
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
          windows: []
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
                (function(i) {
                  self.windows.forEach(window => {
                    window.visible = false;
                  });

                  self.windows[i].visible = true;
                })(i);
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
        console.log(this.windows);
      }
    };
  </script>

</script>
