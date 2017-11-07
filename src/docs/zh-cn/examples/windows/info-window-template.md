# 信息窗体 - Vue 模板

支持传入 `Vue` 模板，支持 `Vue` 机制的事件绑定和状态访问。**(推荐)**。当同时设置 `content` 和 `template` 时，优先 `content`。

<vuep template="#example1"></vuep>

<script v-pre type="text/x-template" id="example1">

  <template>
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo1"  
        :center="center"
        :zoom="zoom"  
        class="amap-demo">
        <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events"></el-amap-marker>
        <el-amap-info-window v-for="window in windows" :position="window.position" :visible="window.visible" :content="window.content" :template="window.template"></el-amap-info-window>
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
          source: 'click'
        };
      },

      methods:{
        handler(index) {
          alert(`${ index } - trigger`);
        }
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

                self.$nextTick(() => {
                  self.windows[i].visible = true;
                });
              }
            }
          });

          windows.push({
            position: [121.59996, 31.197646 + i * 0.001],
            template: `<button @click="handler(${ i })">{{ source }} ${ i }</button>`,
            visible: false
          });
        }

        // 动态修改 template
        setTimeout(() => {
          this.windows[0].template = '<span>changed</span>';
        }, 3000);

        this.markers = markers;
        this.windows = windows;
      }
    };
  </script>

</script>
