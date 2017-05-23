# MapType

地图类型切换插件，用来切换固定的几个常用图层

### 示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap vid="amap" :plugin="plugin" class="amap-demo">
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
      data() {
        return {
          plugin: [{
            pName: 'MapType',
            events: {
              init(instance) {
                console.log(instance);
              }
            }
          }]
        };
      }
    };
  </script>

</script>
