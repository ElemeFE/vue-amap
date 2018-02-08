# 自定义

实际开发中面对复杂业务，库中现有的几个基础组件很多时候无法满足我们的业务需求，另一个方面在于高德的sdk也在疯狂更新，一味的包装也不是长久之计，所以这里提供一个方法 -- `extendCustomOptions`，让用户自己开发并维护自己特定业务组件，希望通过社区成员一起建设

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
        <!-- 
        <button type="button" name="button" v-on:click="changePosition">change position</button>
        <button type="button" name="button" v-on:click="chnageDraggle">change draggle</button>
        <button type="button" name="button" v-on:click="addMarker">add marker</button>
        <button type="button" name="button" v-on:click="removeMarker">remove marker</button> -->
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }
  </style>
  <script>
    // import {extendCustomOptions} from 'vue-amap' 
    const { extendCustomOptions } = VueAMap;
    // 组件定义
    const AmapCanvasMarkers = extendCustomOptions({
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
            this.$amapComponent = new PointSimplifier(options)
            resolve()
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

以上是一个简单的组件的例子，关键函数就是 `extendCustomOptions(VueComponentOptionsPlus)`，返回是一个完整的 `VueComponentOptions`， 入参除了具有基本的 `VueComponentOptions` 的相关属性外，还有以下的关键属性

名称 | 类型 | 说明
---|---|---|
name | String | component Name
init  |  Function(options, AMapInstance)  |  该函数的作用是组件对应的高德实例进行初始化，关键步骤`this.$amapInstacne = ...`，在组件上挂载一个高德实例，异步初始化需要返回一个 `Promise`
converters  | Object: {[propKey]:Function} | 对于组件原始入参的转换函数，像一些坐标类型数据需要从原始数组转为 `AMap.LngLat`，本库内部内置了 `position: toLngLat, offset: toPixel, bounds: toBounds` 的转换
handlers  | Object: {[propKey]: Function} | 自定义组件属性值变化后对应的回调，内置的回调指定规则是 `自定义 handler -> 高德实例 set[PropKey] 方法 -> setOptions 方法` 从左到右的依次判空，如果存在则指定调用该回调，注：回调函数的默认 `this` 是该 `高德实例`
