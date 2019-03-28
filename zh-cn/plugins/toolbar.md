# ToolBar

地图工具条插件，可以用来控制地图的缩放和平移。

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

## 属性

名称 | 类型 | 说明
---|---|---|
position | String | 控件停靠位置 LT:左上角; RT:右上角; LB:左下角; RB:右下角; 默认位置：LT
ruler | Boolean | 标尺键盘是否可见，默认为true
noIpLocate | Boolean | 定位失败后，是否开启IP定位，默认为false
locate | Boolean | 是否显示定位按钮，默认为false
liteStyle | Boolean | 是否使用精简模式，默认为false
direction | Boolean | 方向键盘是否可见，默认为true
autoPosition | Boolean | 是否自动定位，即地图初始化加载完成后，是否自动定位的用户所在地，仅在支持HTML5的浏览器中有效，默认为false
useNative | Boolean | 是否使用高德定位sdk用来辅助优化定位效果，默认：false.

**仅供在使用了高德定位sdk的APP中，嵌入webview页面时使用注：如果要使用辅助定位的功能，除了需要将useNative属性设置为true以外，还需要调用高德定位sdk中，AMapLocationClient类的startAssistantLocation()方法开启辅助H5定位功能；不用时，可以调用stopAssistantLocation()方法停止辅助H5定位功能。具体用法可参考定位SDK的参考手册**


## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 高德插件示例
