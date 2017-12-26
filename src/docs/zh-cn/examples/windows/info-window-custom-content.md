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
        <el-amap-info-window :position="window.position" :content="window.content"></el-amap-info-window>
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
        let center = [121.59996, 31.197646];
        return {
          zoom: 12,
          center,
          window: {
            position: center,
            content: 'content'
          }
        };
      },

      created() {
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
        <el-amap-info-window :position="window.position" :template="window.template"></el-amap-info-window>
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
        let basePosition = [121.59996, 31.197646];
        this.window = {
          position: [basePosition[0], basePosition[1]],
          template: `<button @click="handler('hello')">{{ source }}</button>`
        }
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
        <el-amap-info-window :position="window.position" :content-render="window.contentRender"></el-amap-info-window>
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
        return {
          zoom: 12,
          center,
          markers: [],
          source: 'click',
          window: {
            position: center,
            contentRender: h => h(BtnComponent, {
                props: {
                  text: 'hello'
                },
                style: {
                  background: 'rgb(173, 47, 47)',
                  color: '#eee'
                },
                nativeOn: {
                  click: () => this.handler(`hello click`)
                }
              })
          }
        };
      },
      created() {
      },

      methods: {
        handler(val) {
          alert(`${ val } - trigger`);
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
        <el-amap-info-window :position="window.position">
          <div :style="slotStyle">
            <b>Hello {{ count }} times</b>
            <button @click="onClick">Add</button>
          </div>
        </el-amap-info-window>
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
          count: 0,
          slotStyle: {
            padding: '2px 8px',
            background: '#eee',
            color: '#333',
            border: '1px solid #aaa'
          },
          window: {
            position: [121.59996, 31.197646]
          }
        };
      },

      methods: {
        onClick() {
          this.count += 1;
        }
      },

      created() {
      }
    };
  </script>
</script>