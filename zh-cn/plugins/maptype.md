# MapType

地图类型切换插件，用来切换固定的几个常用图层

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
            pName: 'MapType',
            defaultType: 0,
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
defaultType | Number | 初始化默认图层类型。 取值为0：默认底图 取值为1：卫星图 默认值：0
showTraffic | Boolean | 叠加实时交通图层 默认值：false
showRoad | Boolean | 叠加路网图层 默认值：false


## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 高德插件示例
