# 点坐标 - 自定义内容

### 基础 content 渲染

<vuep template="#exampleContent"></vuep>

<script v-pre type="text/x-template" id="exampleContent">

  <template>
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo"  
        :center="center"
        :zoom="zoom"
        class="amap-demo">
        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :vid="index" :content="marker.content"></el-amap-marker>
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
        const center = [121.59996, 31.197646];
      
        return {
          zoom: 12,
          center,
          markers: []
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
            content: `content ${i}`
          });
        }
        this.markers = markers;
      }
    };
  </script>

</script>

### template 模板渲染

支持传入 `Vue` 模板，支持 `Vue` 机制的事件绑定和状态访问。当同时设置 `content` 和 `template` 时，优先 `content`。`v0.4.0` 开始支持。

<vuep template="#exampleTemplate"></vuep>

<script v-pre type="text/x-template" id="exampleTemplate">

  <template>
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo1"  
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

### render 方式渲染

`v0.4.3` 开始支持。

<vuep template="#exampleRender"></vuep>

<script v-pre type="text/x-template" id="exampleRender">

  <template>
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo2"  
        :center="center"
        :zoom="zoom"
        class="amap-demo">
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
            contentRender: h => h(BtnComponent, {
                props: {
                  text: `component ${index}`
                },
                style: {
                  background: 'rgb(173, 47, 47)',
                  color: '#eee'
                },
                nativeOn: {
                  click: () => this.handler(`component-${index}`)
                }
              })
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
            contentRender: h => h('button', {
              on: {click: () => this.handler(i)}}, [`source-${i}`])
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

### slots 渲染

`v0.4.5` 开始支持。

<vuep template="#exampleSlots"></vuep>

<script v-pre type="text/x-template" id="exampleSlots">

  <template>
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo3"  
        :center="center"
        :zoom="zoom"
        class="amap-demo">
        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :vid="index">
          <div :style="slotStyle">
            <b>Hello {{ count }} times</b>
            <button @click="onClick">Add</button>
          </div>
        </el-amap-marker>
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
        const center = [121.59996, 31.197646];
      
        return {
          zoom: 12,
          center,
          markers: [],
          count: 0,
          slotStyle: {
            padding: '2px 8px',
            background: '#eee',
            color: '#333',
            border: '1px solid #aaa'
          }
        };
      },

      methods: {
        onClick() {
          this.count += 1;
        }
      },

      created() {
        let self = this;
        let markers = [];
        let index = 0;

        let basePosition = [121.59996, 31.197646];
        let num = 10;

        for (let i = 0 ; i < num ; i++) {
          markers.push({
            position: [basePosition[0], basePosition[1] + i * 0.03]
          });
        }
        this.markers = markers;
      }
    };
  </script>

</script>