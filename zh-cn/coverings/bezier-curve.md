# 贝塞尔曲线

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

<template>
  <div class="amap-page-container">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-bezier-curve v-for="line in lines" :events="line.events" :path="line.path" :stroke-color="line.strokeColor" :stroke-style="line.strokeStyle" :events="line.events" :stroke-opacity="line.strokeOpacity"></el-amap-bezier-curve>
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
          center: [116.380298, 39.907771],
          lines: [
            {
              path: [
                [116.39, 39.91, 116.37, 39.91],
                [116.380298, 39.907771, 116.38, 39.90],
                [116.385298, 39.907771, 116.40, 39.90]
              ],
              strokeDasharray: [10, 10],
              strokeColor: "#FF33FF", //线颜色
              strokeOpacity: 1, //线透明度
              strokeWeight: 3, //线宽
              strokeStyle: "solid", //线样式
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
topWhenClick |  Boolean | 鼠标点击时是否置顶，默认false ，不置顶
bubble |  Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上 默认值：false
autoRotation |  Boolean | 是否自动旋转。点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为false。广泛用于自动调节车辆行驶方向。IE8以下不支持旋转，autoRotation属性无效
extData | Any | 用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等



## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
path | Array | 贝瑟尔曲线的路径。描述为一个二维数组规则如下：第一个元素是起点，之后的元素同时描述控制点和途经点，之后每个元素可以有0个到2个控制点控制点在前，途经点在最后 [[lng,lat],//起点0[lng,lat,lng,lat],//控制点、途经点1[lng,lat,lng,lat,lng,lat],//控制点、控制点、途经点2[lng,lat,lng,lat]//控制点、途经点3] [示例](https://lbs.amap.com/api/javascript-api/example/overlayers/bezier-curve)
strokeColor | String | 线条颜色，如‘#000000’、‘red’
strokeOpacity | Number | 透明度
strokeWeight | Number | 线宽
strokeStyle | String | 虚线或者视线，'dashed'、'solid'
strokeDasharray | Array | 虚线的分段，如[10,10]
zIndex | Number | 层级
showDir | Boolean | 是否显示白色方向箭头
bubble | Boolean | 事件是否穿透到地图
cursor | String |指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor 
isOutline | Boolean | 是否描边
outlineColor | String | 描边颜色
borderWeight | Number | 描边宽度 

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [AMap.BezierCurve](http://lbs.amap.com/api/javascript-api/reference/overlay#BezierCurve) | 获取`BezierCurve`实例


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
