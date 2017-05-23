# ToolBar

地图工具条插件，可以用来控制地图的缩放和平移。

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
            pName: 'ToolBar',
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
