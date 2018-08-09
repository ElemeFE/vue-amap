# 点坐标

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker>
        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" v-on:click="toggleVisible">toggle first marker</button>
        <button type="button" name="button" v-on:click="changePosition">change position</button>
        <button type="button" name="button" v-on:click="chnageDraggle">change draggle</button>
        <button type="button" name="button" v-on:click="addMarker">add marker</button>
        <button type="button" name="button" v-on:click="removeMarker">remove marker</button>
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>

  <script>
    const exampleComponents = {
      props: ['text'],
      template: `<div>text from  parent: {{text}}</div>`
    }
    module.exports = {
      name: 'amap-page',
      data() {
        return {
          count: 1,
          slotStyle: {
            padding: '2px 8px',
            background: '#eee',
            color: '#333',
            border: '1px solid #aaa'
          },
          zoom: 14,
          center: [121.5273285, 31.21515044],
          markers: [
            {
              position: [121.5273285, 31.21515044],
              events: {
                click: () => {
                  alert('click marker');
                },
                dragend: (e) => {
                  console.log('---event---: dragend')
                  this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                }
              },
              visible: true,
              draggable: false,
              template: '<span>1</span>',
            }
          ],
          renderMarker: {
            position: [121.5273285, 31.21715058],
            contentRender: (h, instance) => {
              // if use jsx you can write in this
              // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
              return h(
                'div',
                {
                  style: {background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'},
                  on: {
                    click: () => {
                      const position = this.renderMarker.position;
                      this.renderMarker.position = [position[0] + 0.002, position[1] - 0.002];
                    }
                  }
                },
                ['marker inner text']
              )
            }
          },
          componentMarker: {
            position: [121.5273285, 31.21315058],
            contentRender: (h, instance) => h(exampleComponents,{style: {backgroundColor: '#fff'}, props: {text: 'father is here'}}, ['xxxxxxx'])
          },
          slotMarker: {
            position: [121.5073285, 31.21715058]
          }
        };
      },
      methods: {
        onClick() {
          this.count += 1;
        },
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

</script>


## 静态属性
仅且可以初始化配置，不支持响应式。

名称 | 类型 | 说明
---|---|---|
vid | String | marker对象id。
topWhenClick | Boolean | 鼠标点击时marker是否置顶，默认false ，不置顶（自v1.3 新增）。
bubble | Boolean | 是否将覆盖物的鼠标或touch等事件冒泡到地图上（自v1.3 新增）默认值：false。
autoRotation | Boolean | 是否自动旋转。点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为falseIE8以下不支持旋。转，autoRotation属性无效

## 动态属性
支持响应式。

名称 | 类型 | 说明
---|---|---|
init | Object | 高德组件实例
visible | Boolean | 点标记是否可见，默认为true。
zIndex | Number | 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示默认zIndex：100。
position | Array | 点标记在地图上显示的位置，默认为地图中心点。
offset | Array | 点标记显示位置偏移量，默认值为Pixel(-10,-34)。Marker指定position后，默认以marker左上角位置为基准点，对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
icon | String | 需在点标记中显示的图标。可以是一个本地图标地址。有合法的content内容时，此属性无效。
content | String | 点标记显示内容，可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖。
template | String | 支持传入 Vue 模板。`v0.4.0` 开始支持。
vnode | VNode 或 Funtion: (Instance) => VNode | 支持 VNode 渲染。`v0.4.2` 开始支持
contentRender | Function: (createElement: () => VNode, instance) => VNode | 支持 VNode render 渲染。`v0.4.3` 开始支持
draggable | Boolean | 设置点标记是否可拖拽移动，默认为false。
raiseOnDrag | Boolean | 设置拖拽点标记时是否开启点标记离开地图的效果。
cursor | String | 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不。支持自定义cursor。
angle | Number | 点标记的旋转角度注：angle属性是使用CSS3来实现的，支持IE9及以上版本
animation | String | 点标记的动画效果，默认值：“AMAP_ANIMATION_NONE”可选值：“AMAP_ANIMATION_NONE”，无动画效果“AMAP_ANIMATION_DROP”，点标掉落果“AMAP_ANIMATION_BOUNCE”，点标弹跳效果。
title | String | 鼠标滑过点标记时的文字提示，不设置则鼠标滑过点标无文字提示。
clickable | Boolean | 点标记是否可点击。
label | {content,offset: [x, y]} | 添加文本标注，content为文本标注的内容，offset为偏移量，左上角为偏移量为（0,0）

## ref 可用方法
提供无副作用的同步帮助方法

函数 | 返回 | 说明
---|---|---|
$$getInstance() | [AMap.Marker](http://lbs.amap.com/api/javascript-api/reference/overlay#Marker) | 获取`marker`实例
$$getPosition() | [lng:Number,lat:Number] | 获取位置
$$getOffset()   |  [x:Number,y:Number]    | 获取偏移像素坐标
$$getExtData()   | any | 获取用户自定义属性

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
moveend |  | 点标记执行moveTo动画结束时触发事件，也可以由moveAlong方法触发
movealong |  | 点标记执行moveAlong动画一次后触发事件
touchstart | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸开始时触发事件，仅适用移动设备
touchmove | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸移动进行中时触发事件，仅适用移动设备
touchend | [MapsEvent](http://lbs.amap.com/api/javascript-api/reference/event/#MapsEvent) | 触摸结束时触发事件，仅适用移动设备
