# 圆形

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-circle v-for="circle in circles" :center="circle.center" :radius="circle.radius" :fill-opacity="circle.fillOpacity" :events="circle.events"></el-amap-circle>
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
          circles: [
            {
              center: [121.5273285, 31.21515044],
              radius: 200,
              fillOpacity: 0.5,
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
radius | Number | 圆半径，单位:米
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
$$getInstance() | [AMap.Circle](http://lbs.amap.com/api/javascript-api/reference/overlay#Circle) | 获取`circle`实例
$$getCenter() | [lng:Number,lat:Number] | 获取 `circle` 圆心坐标


## 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 组件实例
click | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标左键单击事件
dblclick | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标左键双击事件
rightclick | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 右键单击
hide | {type, target} | 隐藏
show | {type, target} | 显示
mousedown | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标按下
mouseup | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标抬起
mouseover | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标经过
mouseout | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标移出
change | {type, target} | 属性发生变化时
touchstart | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸开始时触发事件，仅适用移动设备
touchmove | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸移动进行中时触发事件，仅适用移动设备
touchend | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸结束时触发事件，仅适用移动设备
move | {type, target, lnglat}	|编辑状态下， 拖拽圆心调整圆形位置时触发此事件type: 事件类型 target: 发生事件的目标对象 lnglat: 调整后圆的圆心坐标
adjust | 	{type, target, radius} |	编辑状态下，鼠标调整圆形半径时，触发此事件 type: 事件类型  target: 发生事件的目标对象 radius: 调整后圆的半径，单位：米
end | {type,target}| 关闭编辑状态时，该方法后触发，target即为编辑后的圆对象
