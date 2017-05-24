# Overview

地图鹰眼插件。

## 示例

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
            pName: 'OverView',
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


## 属性

名称 | 类型 | 说明
---|---|---|
isOpen | Boolean | 鹰眼是否展开，默认为false
visible | Boolean | 鹰眼是否显示，默认为true


## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 高德插件示例
