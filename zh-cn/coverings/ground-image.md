# 图片覆盖物

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-ground-image v-for="groundimage in groundimages" :url="groundimage.url" :bounds="groundimage.bounds" :events="groundimage.events"></el-amap-ground-image>
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
          zoom: 7,
          center: [121.5273285, 31.21515044],
          groundimages: [
            {
              url: '//faas.elemecdn.com/desktop/media/img/appqc.95e532.png',
              bounds: [[121.5273285, 31.21515044], [122.9273285, 32.31515044]],
              events: {
                click() {
                  alert('click groundimage');
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
clickable | Boolean | 图层是否可点击，若为可点击则GroundImage支持鼠标点击事件默认值：false
bounds | Array | 区域
url | String | 图片路径

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
path | Array | 多边形轮廓线的节点坐标数组，当为“环”多边形时（多边形区域在多边形内显示为“岛”），path为二维数组，数组元素为多边形轮廓的节点坐标数组“环”多边形时，要求数组第一个元素为外多边形，其余为“岛”多边形，外多边形需包含“岛”多边形，否则程序不作处理
opacity | Number | 图片透明度，取值范围[0,1]，0表示完全透明，1表示不透明默认值：1

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [AMap.GroundImage](http://lbs.amap.com/api/javascript-api/reference/overlay#GroundImage) | 获取`groundImage`实例

## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 高德组件实例
click | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标左键单击事件
dblclick | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标左键双击事件
