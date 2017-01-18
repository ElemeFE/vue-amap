# 折线

---

## 示例

```html
<template lang="html">
  <div id="demoComponent" class="demo-component">
      <el-amap vid="amap" :zoom="zoom" :center="center" :amapManager="amapManager">
        <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :events="polyline.events"></el-amap-polyline>
      </el-amap>
      <button type="button" name="button" v-on:click="changeEditable">change editable</button>
  </div>
</template>

<script>
import { AMapManager } from '../../lib';
let amapManager = new AMapManager();
const POLYGON_ID = 'POLYGON_ID';
export default {
  name: 'demoComponent',
  data() {
    return {
      zoom: 12,
      amapManager: amapManager,
      center: [121.5273285, 31.25515044],
      polyline: {
        vid: POLYGON_ID,
        path: [[121.5389385, 31.21515044], [121.5389385, 31.29615044], [121.5273285, 31.21515044]],
        events: {
          click(e) {
            alert('click polyline');
          },
          end: (e) => {
            let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
            console.log(newPath);
          }
        },
        editable: false
      }
    };
  },
  methods: {
    changeEditable() {
      this.polyline.editable = !this.polyline.editable;
    }
  }
};
</script>

```

<demo></demo>
<script>
import Demo from 'demos/polyline.vue';
export default {
  components: {
    Demo
  }
}
</script>



## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
vid | String | 组件的ID。
bubble | Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上。默认值：false



## 动态属性
支持响应式。
名称 | 类型 | 说明
---|---|---|
visible | Boolean | 是否可见
editable | Boolean | 折线当前是否可编辑
path | Array | 折线的节点坐标数组
zIndex | Number | 折线覆盖物的叠加顺序。默认叠加顺序，先添加的线在底层，后添加的线在上层。通过该属性可调整叠加顺序，使级别较高的折线覆盖物在上层显示。默认zIndex：50
outlineColor | String | 线条描边颜色，此项仅在isOutline为true时有效，默认：#000000
strokeColor | String | 线条颜色，使用16进制颜色代码赋值。默认值为#006600
strokeOpacity | Number | 线条透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
strokeWeight | Number | 线条宽度，单位：像素
strokeStyle | String | 线样式，实线:solid，虚线:dashed
geodesic | Boolean | 是否绘制大地线，默认false，不支持相关示例
isOutline | Boolean | 线条是否带描边，默认false

## 事件

事件 | 参数 | 说明
---|---|---|
click | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标左键单击事件
dblclick | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标左键双击事件
rightclick | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标右键单击事件
hide | {type, target} | 隐藏
show | {type, target} | 显示
mousedown | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标按下
mouseup | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标抬起
mouseover | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标经过
mouseout | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 鼠标移出
change |  | 属性发生变化时
touchstart | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸开始时触发事件，仅适用移动设备
touchmove | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸移动进行中时触发事件，仅适用移动设备
touchend | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸结束时触发事件，仅适用移动设备
addnode |	[MapsEvent]((http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent)) | 	可编辑状态下，通过鼠标在折线上增加一个节点或在多边形上增加一个顶点时触发此事件
adjust |	[MapsEvent]((http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent)) |	可编辑状态下，鼠标调整折线上某个节点或多边形上某个顶点的位置时触发此事件
removenode | [MapsEvent]((http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent)) |	可编辑状态下，通过鼠标在折线上删除一个节点或在多边形上删除一个顶点时触发此事件
end |	{type,target}	 | 关闭编辑状态时，触发该事件，target即为编辑后的折线/多边形对象
