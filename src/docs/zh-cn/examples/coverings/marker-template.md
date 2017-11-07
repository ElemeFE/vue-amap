# 点坐标 - Vue 模板

支持传入 `Vue` 模板，支持 `Vue` 机制的事件绑定和状态访问。**(推荐)**。当同时设置 `content` 和 `template` 时，优先 `content`。

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo"  
        :center="center"
        :zoom="zoom"
        class="amap-demo">
        <el-amap-marker v-for="marker in markers" :position="marker.position" :template="marker.template"></el-amap-marker>
      </el-amap>
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
          markers: [],
          markerRefs: [],
          source: 'click'
        };
      },

      created() {
        let self = this;
        let markers = [];
        let index = 0;

        let basePosition = [121.59996, 31.197646];
        let num = 10;

        for (let i = 0 ; i < num ; i++) {
          markers.push({
            position: [basePosition[0], basePosition[1] + i * 0.03],
            template: `<button @click="handler(${ i })">{{ source }} ${ i }</button>`
          });
        }
        this.markers = markers;
      },

      methods: {
        handler(index) {
          alert(`${ index } - trigger`);
        }
      }
    };
  </script>

</script>
