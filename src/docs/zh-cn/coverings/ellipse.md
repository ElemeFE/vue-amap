# 椭圆

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

   <template>
     <div class="amap-page-container">
        <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
          <el-amap-ellipse v-for="ellipse in ellipses" :events="ellipse.events" :center="ellipse.center" :radius="ellipse.radius"></el-amap-ellipse>
        </el-amap>
      </div>
  </template>

  <style>
    .amap-page-container {
      height: 200px;
    }
  </style>

  <script>
    module.exports = {
      data () {
        return {
          zoom: 12,
          center: [121.5273285, 31.21515044],
          ellipses: [
            {
              center: [121.5273285, 31.21515044],
              radius: [500, 1000],
              events: {
                click: () => {
                  alert('click');
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
bubble | Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上（自v1.3 新增）默认值：false

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否可见
editable | Boolean | 当前圆形是否可编辑
center | LngLat | 圆心位置
radius | Array | 椭圆的半径，用2个元素的数组表示，单位：米 如： radius: [1000, 2000]表示横向半径是1000，纵向的半径是2000  默认值：[1000, 1000]
zIndex | Number | 层叠顺序默认zIndex:10
strokeColor | String | 线条颜色，使用16进制颜色代码赋值。默认值为#006600
strokeOpacity | Float | 轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
strokeWeight | Number | 轮廓线宽度
fillColor | String | 圆形填充颜色,使用16进制颜色代码赋值。默认值为#006600
fillOpacity | Float | 圆形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
strokeStyle | String | 轮廓线样式，实线:solid，虚线:dashed
extData | Any | 用户自定义属性，支持JavaScript API任意数据类型，如Circle的id等

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [AMap.CircleEllipse](http://lbs.amap.com/api/javascript-api/reference/overlay#CircleEllipse) | 获取`CircleMarker`实例


## 事件

事件 | 参数 | 说明
---|---|---|
click | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标左键单击事件
dblclick | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标左键双击事件
rightclick | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标右键单击事件
mousemove | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标移动
mouseover | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标移近点标记时触发事件
mouseout | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标移出点标记时触发事件
mousedown | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标在点标记上按下时触发事件
mouseup | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标在点标记上按下后抬起时触发事件
dragstart | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 开始拖拽点标记时触发事件
dragging | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标拖拽移动点标记时触发事件
dragend | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 点标记拖拽移动结束触发事件
moving | Object | 点标记在执行moveTo，moveAlong动画时触发事件，Object对象的格式是{passedPath:Array.<LngLat>}。其中passedPath为Marker对象在moveAlong或者moveTo过程中已经走过的路径。
moveend | |点标记执行moveTo动画结束时触发事件，也可以由moveAlong方法触发
movealong | |点标记执行moveAlong动画一次后触发事件
touchstart | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸开始时触发事件，仅适用移动设备
touchmove | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸移动进行中时触发事件，仅适用移动设备
touchend | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸结束时触发事件，仅适用移动设备
