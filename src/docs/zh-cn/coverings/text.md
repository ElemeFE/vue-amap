# 文本

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-text v-for="text in texts" :text="text.text" :offset="text.offset" :position="text.position" :events="text.events"></el-amap-text>
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
          zoom: 15,
          center: [121.5273285, 31.21515044],
          texts: [
            {
              position: [121.5273285, 31.21515044],
              text: 'hello world',
              offset: [0, 0],
              events: {
                click: () => {
                  alert('click text');
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
topWhenClick |  Boolean | 鼠标点击时是否置顶，默认false ，不置顶
bubble |  Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上 默认值：false
autoRotation |  Boolean | 是否自动旋转。点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为false。广泛用于自动调节车辆行驶方向。IE8以下不支持旋转，autoRotation属性无效
extData | Any | 用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等



## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
text |  String |  标记显示的文本内容
position |  LngLat |  点标记在地图上显示的位置，默认为地图中心点
offset |  Pixel | 点标记显示位置偏移量，默认值为Pixel(-10,-34)。Marker指定position后，默认以marker左上角位置为基准点，对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
textAlign | String |  横向位置，'left' 'right', 'center'可选
verticalAlign | String |  纵向位置，'top' 'middle', 'bottom'可选
draggable | Boolean | 设置点标记是否可拖拽移动，默认为false
raiseOnDrag | Boolean | 设置拖拽点标记时是否开启点标记离开地图的效果
cursor |  String |  指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
visible | Boolean | 点标记是否可见，默认为true
zIndex |  Number |  点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示默认zIndex：100
angle | Number |  点标记的旋转角度，广泛用于改变车辆行驶方向.注：angle属性是使用CSS3来实现的，支持IE9及以上版本
animation | String |  点标记的动画效果，默认值：“AMAP_ANIMATION_NONE” 可选值： “AMAP_ANIMATION_NONE”，无动画效果 “AMAP_ANIMATION_DROP”，点标掉落效果 “AMAP_ANIMATION_BOUNCE”，点标弹跳效果 
shadow |  Icon |  点标记阴影，不设置该属性则点标记无阴影
title | String |  鼠标滑过点标记时的文字提示，不设置则鼠标滑过点标无文字提示
clickable | Boolean | 点标记是否可点击


## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [AMap.Circle](http://lbs.amap.com/api/javascript-api/reference/overlay#Text) | 获取`Text`实例


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
