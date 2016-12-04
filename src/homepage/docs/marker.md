# 点标志

---

## 示例

```html
<template>
    <div id="demoComponent" class="demo-component">
        <el-amap vid="amap" :zoom="zoom" :center="center">
          <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
        </el-amap>
        <button type="button" name="button" v-on:click="toggleVisible">toggle show first marker</button>
        <button type="button" name="button" v-on:click="changePosition">Change Position</button>
        <button type="button" name="button" v-on:click="chnageDraggle">chnage Draggle</button>
        <button type="button" name="button" v-on:click="addMarker">add Marker</button>
        <button type="button" name="button" v-on:click="removeMarker">remove Marker</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      zoom: 14,
      center: [121.5273285, 31.21515044],
      markers: [
        {
          position: [121.5273285, 31.21515044],
          events: {
            click: () => {
              alert('click marker');
              console.log(this);
            },
            dragend: (e) => {
              console.log(e);
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
            }
          },
          visible: true,
          draggable: false
        }
      ]
    };
  },
  methods: {
    changePosition() {
      let position = this.markers[0].position;
      this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
    },
    chnageDraggle() {
      let draggable = this.markers[0].draggable;
      this.markers[0].draggable = !draggable;
    },
    toggleVisible() {
      let visableVar = this.markers[0].visible;
      this.markers[0].visible = !visableVar;
    },
    addMarker() {
      let marker = {
        position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
      };
      this.markers.push(marker);
    },
    removeMarker() {
      if (!this.markers.length) return;
      this.markers.splice(this.markers.length - 1, 1);
    }
  }
};
</script>

```


<demo></demo>
<script>
import Demo from 'demos/marker.vue';
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
vid | String | marker对象id
topWhenClick | Boolean | 鼠标点击时marker是否置顶，默认false ，不置顶（自v1.3 新增）
bubble | Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上（自v1.3 新增）默认值：false
autoRotation | Boolean | 是否自动旋转。点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为falseIE8以下不支持旋转，autoRotation属性无效

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
visible | Boolean | 点标记是否可见，默认为true
zIndex | Number | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示默认zIndex：100
position | Array | 点标记在地图上显示的位置，默认为地图中心点
offset | Array | 点标记显示位置偏移量，默认值为Pixel(-10,-34)。Marker指定position后，默认以marker左上角位置为基准点，对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
icon | String | 需在点标记中显示的图标。可以是一个本地图标地址，或者Icon对象。有合法的content内容时，此属性无效
content | String | 点标记显示内容，可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖
draggable | Boolean | 设置点标记是否可拖拽移动，默认为false
raiseOnDrag | Boolean | 设置拖拽点标记时是否开启点标记离开地图的效果
cursor | String | 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
angle | Number | 点标记的旋转角度注：angle属性是使用CSS3来实现的，支持IE9及以上版本
animation | String | 点标记的动画效果，默认值：“AMAP_ANIMATION_NONE”可选值：“AMAP_ANIMATION_NONE”，无动画效果“AMAP_ANIMATION_DROP”，点标掉落果“AMAP_ANIMATION_BOUNCE”，点标弹跳效果
title | String | 鼠标滑过点标记时的文字提示，不设置则鼠标滑过点标无文字提示
clickable | Boolean | 点标记是否可点击
label | {content,offset} | 添加文本标注，content为文本标注的内容，offset为偏移量，左上角为偏移量为（0,0）

## 事件

事件 | 参数 | 说明
---|---|---|
init |[Marker](http://lbs.amap.com/api/javascript-api/reference/overlay/#Marker) | 高德点标志实例
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
moveend |  | 点标记执行moveTo动画结束时触发事件，也可以由moveAlong方法触发
movealong |  | 点标记执行moveAlong动画一次后触发事件
touchstart | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸开始时触发事件，仅适用移动设备
touchmove | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸移动进行中时触发事件，仅适用移动设备
touchend | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸结束时触发事件，仅适用移动设备
