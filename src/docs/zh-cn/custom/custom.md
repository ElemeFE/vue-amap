# 自定义组件

实际开发中面对复杂业务，库中现有的几个基础组件很多时候无法满足我们的业务需求，另一个方面在于高德的sdk也在疯狂更新，一味的包装也不是长久之计，所以这里提供一个方法 -- `createCustomComponent`，让用户自己开发并维护自己特定业务组件，同时也希望通过社区成员一起建设公共组件。

先看个例子
<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">
  <template>
    <div class="amap-page-container">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
        <amap-canvas-markers
          :data="markerData"
          :get-position="markerOptions.getPosition"
          :get-hover-title="markerOptions.getHoverTitle"
          :visible="markerOptions.visible"
          render-constructor="PointSimplifier.Render.Canvas"
          :render-options="markerOptions.renderOptions"
          :events="markerOptions.events"
          ></amap-canvas-markers>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" @click="toggleVisible">toggle visible</button>
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>
  <script>
    // import {createCustomComponent} from 'vue-amap' 
    const { createCustomComponent } = VueAMap;
    // 组件定义
    const AmapCanvasMarkers = createCustomComponent({
      name: 'amap-canvas-marker',
      props: [
        'visible',
        'zIndex',
        'data',
        'getPosition',
        'getHoverTitle',
        'compareDataItem',
        'autoSetFitView',
        'renderConstructor',
        'renderOptions',
        'maxChildrenOfQuadNode',
        'maxDepthOfQuadTree',
        'badBoundsAspectRatio'
      ],
      contextReady() {
        console.log('context ready', AMap);
      },
      init(options, map) {
        return new Promise((resolve, reject) => {
          AMapUI.loadUI(['misc/PointSimplifier'], PointSimplifier => {
            const {renderConstructor: renderStr, renderOptions } = options;
            // console.log(renderStr);
            if (renderStr) options.renderConstructor = renderStr.split('.').reduce((pre, cur) =>  pre[cur], {PointSimplifier});
            if (options.renderOptions && options.renderOptions.pointStyle) {
              const {pointStyle} = options.renderOptions;
              if (pointStyle.contentImg) pointStyle.content = PointSimplifier.Render.Canvas.getImageContent(pointStyle.contentImg, () => this.$amapComponent.renderLater()),
              e => console.error(e)
            }
            resolve(new PointSimplifier(options))
          });
        })
      },
      converters: {},
      handlers: {
        zIndex(index) {
          this.setzIndex(index);
        },
        visible(flag) {
          flag === false ? this.hide() : this.show();
        }
      }
    });
    const center = [121.5273285, 31.21515044];
    const markerData = Array.from({length: 10000},(x, index) => ({position: [
      center[0] + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 0.6,
      center[1] + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 0.6
    ], title: `小点坐标-${index}`}));
    module.exports = {
      components: {AmapCanvasMarkers},
      data() {
        return {
          zoom: 14,
          center,
          markerData,
          markerOptions: {
            visible: true,
            getPosition(dateItem) {
              return dateItem.position
            },
            getHoverTitle(dateItem) {
              return dateItem.title
            },
            renderOptions: {
              pointStyle: {
                contentImg: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b1.png',
                width: 19,
                height: 31,
                offset: ['-50%', '-100%'],
                fillStyle: null,
                strokeStyle: null
              }
            },
            events: {
              pointClick(e, point) {
                console.log('event pointClick', e, point)
              },
              pointMouseover(e, point) {
                console.log('event pointMouseover', e, point);
              },
              pointMouseout(e, point) {
                console.log('event pointMouseout', e, point)
              }
            }
          }
        }
      },
      methods: {
        toggleVisible() {
          this.markerOptions.visible = !this.markerOptions.visible;
        }
      }
    }
  </script>
</script>

再看第二个
<vuep template="#example2"></vuep>

<script v-pre type="text/x-template" id="example2">
<style>
  .amap-demo {
    height: 300px;
  }
  .container {
    position: relative;
  }
  .tip {
      background-color: #ddf;
      color: #333;
      border: 1px solid silver;
      box-shadow: 3px 4px 3px 0px silver;
      position: absolute;
      top: 10px;
      right: 10px;
      border-radius: 5px;
      overflow: hidden;
      line-height: 20px;
      z-index: 99;
  }
  .tip input {
      height: 25px;
      border: 0;
      padding-left: 5px;
      width: 280px;
      border-radius: 3px;
      outline: none;
  }
</style>
<template>
  <div class="container">
  <div class="tip">
    <input class="custom-componet-input" id="custom-componet-input" />
  </div>
    <el-amap vid="xxx" :zoom="zoom" :center="center" class="amap-demo">
      <custom-map-searchbox @select="selectSearch" input="custom-componet-input" ></custom-map-searchbox>
      <el-amap-marker v-if="selectMarker" :position="selectMarker.position" :label="selectMarker.label"></el-amap-marker>
    </el-amap>
  </div>
</template>

<script>

const customMapSearchbox = VueAMap.createCustomComponent({
  props: {
    input: String
  },
  init(options, map) {
    return new Promise(resolve => {
      AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'], () => {
        const autocomplete = new AMap.Autocomplete(options)
        AMap.event.addListener(autocomplete, 'select', (e) => {
          this.$emit('select', e.poi)
        });
        resolve(autocomplete)
      })
    });
  }
})

module.exports = {
  data() {
    return {
      selectMarker: null,
      zoom: 14,
      center: [121.5273285, 31.21515044]
    }
  },
  components: {customMapSearchbox},
  methods: {
    selectSearch(poi) {
      console.log(poi)
      const {location, name, adcode, district, address, } = poi
      const center = [location.lng, location.lat];
      console.log(center)
      this.selectMarker = {
        label: {content: `<div>
          <div>${name}</div>
          <div>${district}</div>
        </div>`, offset: [20, 20]},
        position: [...center]
      },
      console.log(this.selectMarker);
      this.center = center;
    }
  }
}
</script>
</script>

再看第三个
<vuep template="#example3"></vuep>

<script v-pre type="text/x-template" id="example3">
<style>
.xxconatiner {
  position: relative;
  padding: 60px 10px
}
.tip {
    background-color: #ddf;
    color: #333;
    border: 1px solid silver;
    box-shadow: 3px 4px 3px 0px silver;
    display: inline-block;

    border-radius: 5px;
    overflow: hidden;
    line-height: 20px;
    z-index: 99;
}
.tip input {
    height: 25px;
    border: 0;
    padding-left: 5px;
    width: 280px;
    border-radius: 3px;
    outline: none;
}
</style>

<template>
<div class="xxconatiner">
  <custom-search @select="select">
  </custom-search>
</div>
</template>

<script>
const customSearch = VueAMap.createCustomComponent({
  template: `<div class="tip">
    <input class="custom-componet-input" :id="id" />
  </div>`,
  data() {
    return {
      id: `custom-componet-input-${Math.random()}`
    }
  },
  contextReady(_options) {
    const options = {
      ..._options,
      input: this.id
    }
    AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'], () => {
      const autocomplete = new AMap.Autocomplete(options)
      AMap.event.addListener(autocomplete, 'select', (e) => {
        this.$emit('select', e.poi)
      })
      this.$amapComponent = autocomplete
    })
  }
})
module.exports = {
  components: {customSearch},
  methods: {
    select(poi) {
      console.log(poi)
    }
  }
}
</script>

</script>


```js
import {createCustomComponent} from 'vue-amap'
const customComponent = createCustomComponent({
  name: 'custom-component-name',
  init() {  // required
    ...
    return amapInstance // required
    // or
    return new Promise(resolve => {
      ...
      resolve(amapInstance)
    })
    ...
  },
  converters: {
    [propKey](propVal) {
      return customConvert(propVal)
    }
  },
  handlers: {
    [propKey]() {
      // callback
    }
  },
  contextReady() {},
  created() {},
  mounted() {},
  destoryed() {},
  // other hooks
})

Vue.use(customComponent) // registered as a component named [custom-component-name]

```
以上是一个简单的组件的例子，关键函数就是 `createCustomComponent(VueComponentOptionsPlus)`，返回是一个完整的 `VueComponentOptions`， 入参除了具有基本的 `VueComponentOptions` 的相关属性外，还有以下的关键属性

名称 | 类型 | 说明
---|---|---|
name | String | component Name
init  |  Function(options, AMapInstance)  |  该 hook 是父组件`vue-amap`中地图实例初始化后进行调用的, 所以依赖于父组件，该函数的作用是组件对应的高德实例进行初始化，关键步骤`return componentInstance / resolve(componentInstance)`，返回个实例，异步初始化需要返回一个 `Promise`，将实例 `resolve` 出来；
contextReady | Fucntion | 该 hook 在组件 `mounted` 中并且浏览器上下文完成高德脚本加载后执行，该 hook 内部可安全使用高德API，该 hook 依赖于内部的 `lazyAMapApiLoaderInstance`, 请务必保证在该组件 `mounted` 前完成初始化函数 `initAMapApiLoader` 调用。该 hook 并不依赖父组件，可独立存在，适用于一些简单无交互的工具组件
converters  | Object: {[propKey]:Function} | 对于组件原始入参的转换函数，像一些坐标类型数据需要从原始数组转为 `AMap.LngLat`，本库内部内置了 `position: toLngLat, offset: toPixel, bounds: toBounds` 的转换
handlers  | Object: {[propKey]: Function} | 自定义组件属性值变化后对应的回调，内置的回调指定规则是 `自定义 handler -> 高德实例 set[PropKey] 方法 -> setOptions 方法` 从左到右的依次判空，如果存在则指定调用该回调，注：回调函数的默认 `this` 是该 `高德实例`

原理其实很简单，内部 `watch` 了所有提前申明的 `prop`，propValue 改变时执行对应回调，规则如上。自定义组件的实例上维护了有两个特殊的属性 `$amap` 高德地图实例(父组件为 `vue-amap` 才会初始化)和 `$amapComponent`高德组件实例；

关于 `destoryed` 内置了[通用的回收方法](https://github.com/ElemeFE/vue-amap/blob/dev/src/lib/mixins/register-component.js#L23)，如果不满足请务必自行回收。

