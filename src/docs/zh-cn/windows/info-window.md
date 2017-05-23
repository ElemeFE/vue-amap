# 信息窗体

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-info-window v-for="window in windows" :position="window.position" :content="window.content" :open="window.open" :events="window.events"></el-amap-info-window>
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
      data () {
        return {
          zoom: 14,
          center: [121.5273285, 31.21515044],
          windows: [
            {
              position: [121.5273285, 31.21515044],
              content: 'Hi! I am here!',
              open: true,
              events: {
                close() {
                  console.log('close infowindow');
                }
              }
            }
          ]
        }
      }
    };
  </script>

</script>


## 静态属性

仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
vid | String | 组件的ID。
bubble | Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上。默认值：false

## 静态属性

名称 | 类型 | 说明
---|---|---|
vid | String | 组件的ID。
isCustom | Boolean | 是否自定义窗体。设为true时，信息窗体外框及内容完全按照content所设的值添加（默认为false，即在系统默认的信息窗体外框中显示content内容）
autoMove | Boolean | 是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）
closeWhenClickMap | Boolean | 控制是否在鼠标点击地图后关闭信息窗体，默认false，鼠标点击地图后不关闭信息窗体
showShadow | Boolean | Boolean 控制是否显示信息窗体阴影，取值false时不显示窗体阴影，取值true时显示窗体阴影默认值：false
offset | Array | 相对于基点的偏移量。默认情况是信息窗体的底部中心点(BOTTOM_CENTER) 和基点之间的偏移量

## 动态属性

支持响应式。

名称 | 类型 | 说明
---|---|---|
content | String/HTML | 显示内容。支持字符串和HTML。
size | Size | 信息窗体尺寸（isCustom为true时，该属性无效）
position | Array | 信息窗体显示基点位置（自v1.2 新增）
visible | Boolean | 信息窗体是否显示。**这里需要注意的是，高德地图只支持同时一个信息窗体的显示**。所以一旦有窗体显示切换的场景，visible数组的状态需要自行维护。

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 高德组件实例
change||属性发生变化时
open||信息窗体打开之后触发事件
close||信息窗体关闭之后触发事件
