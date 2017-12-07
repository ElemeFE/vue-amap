# 点坐标 - render 函数

支持 `render` 函数渲染。**(推荐)**。当同时设置 `contentRender` 和 `template` 时，优先 `content`。`v0.4.3` 开始支持。
同理支持 `info-window`

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo"  
        :center="center"
        :zoom="zoom"
        class="amap-demo">
        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :vid="index" :content-render="marker.contentRender"></el-amap-marker>
        <el-amap-marker v-for="(marker, index) in componentsMarkers" :position="marker.position" :vid="marker.vid" :content-render="marker.contentRender"></el-amap-marker>
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
        const BtnComponent = {
          props: ['text'],
          template: `<button>{{text}}</button>`
        };
        const center = [121.59996, 31.197646];
        const componentsMarkers = [1,2,3,4].map((item, index) => {
          return {
            position: [center[0] + index * 0.02, center[1] + index * 0.02],
            vid: `${index}-vid`,
            contentRender: h => h(BtnComponent, {props: {text: `component ${index}`}, style: {background: 'rgb(173, 47, 47)', color: '#eee'}, nativeOn: {click: () => this.handler(`component-${index}`)}})
          }
        });
        return {
          zoom: 12,
          center,
          markers: [],
          markerRefs: [],
          source: 'click',
          componentsMarkers
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
            contentRender: h => h('button', {on: {click: () => this.handler(i)}}, [`source-${i}`])
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
