# 插件

---


### 配置方式

插件名支持两种，不带`"AMap"`前缀，如`"MapType"`,带`"AMap"`前缀，如`"AMap.MapType"`。推荐前者，以下都基于前者说明。
**（v0.1.2之前版本，只支持后者）**

插件的配置支持两种方式。

1 - 默认配置

只配置插件名，配置则用默认

```javascript
{
  plugin: ['MapType']
}
```

2 - 自定义配置

**（v0.1.2开始支持）**

自定义配置对象，pName为插件名。所有属性仅支持初始化配置，不支持响应式。

```javascript
{
  plugin: [{
    // pName为必填字段
    pName: 'MapType',
    defaultType: 1
  }]
}
```

## MapType

地图类型切换插件，用来切换固定的几个常用图层

### 示例

```html
<template>
    <div id="demoComponent" class="demo-component">
        <el-amap vid="amap" :plugin="plugin">
        </el-amap>
    </div>
</template>

<script>
export default {
  data() {
    return {
      plugin: [{
        pName: 'MapType',
        events: {
          init(instance) {
            console.log(instance);
          }
        }
      }]
    };
  }
};
</script>
```


#### 属性

名称 | 类型 | 说明
---|---|---|
pName | String | 插件名，必填，设置为 MapType
defaultType | Number | 初始化默认图层类型。 取值为0：默认底图 取值为1：卫星图 默认值：0
showTraffic | Boolean | 叠加实时交通图层 默认值：false
showRoad | Boolean | 叠加路网图层 默认值：false

### 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 初始化完成后触发的事件，参数为插件实例

--------------

## OverView

地图鹰眼插件。

### 示例

```html
<template>
    <div id="demoComponent" class="demo-component">
        <el-amap vid="amap" :plugin="plugin">
        </el-amap>
    </div>
</template>

<script>
export default {
  data() {
    return {
      plugin: [{
        pName: 'OverView',
        events: {
          init(instance) {
            console.log(instance);
          }
        }
      }]
    };
  }
};
</script>
```


### 属性

名称 | 类型 | 说明
---|---|---|
pName | String | 插件名，必填，设置为 OverView
isOpen | Boolean | 鹰眼是否展开，默认为false
visible | Boolean | 鹰眼是否显示，默认为true

### 事件

事件 | 参数 | 说明
---|---|---|
show |  | 执行显示鹰眼窗体时触发的事件
hide |  | 执行隐藏鹰眼窗体时触发的事件
open |  | 执行展开鹰眼窗体时触发的事件
close |  | 执行折叠鹰眼窗体时触发的事件
init | Object | 初始化完成后触发的事件，参数为插件实例

--------------

## Scale

比例尺插件。位于地图右下角，用户可控制其显示与隐藏。

### 示例

```html
<template>
    <div id="demoComponent" class="demo-component">
        <el-amap vid="amap" :plugin="plugin">
        </el-amap>
    </div>
</template>

<script>
export default {
  data() {
    return {
      plugin: [{
        pName: 'Scale',
        events: {
          init(instance) {
            console.log(instance);
          }
        }
      }]
    };
  }
};
</script>
```


### 属性

名称 | 类型 | 说明
---|---|---|
pName | String | 插件名，必填，设置为 Scale
offset | Array | 相对于地图容器左上角的偏移量，正数代表向右下偏移。默认为(10,10)
position | String | 控件停靠位置LT:左上角;RT:右上角;LB:左下角;RB:右下角;默认位置：LB

### 事件

事件 | 参数 | 说明
---|---|---|
show | | 显示比例尺插件时触发的事件
hide | | 隐藏比例尺插件时触发的事件
init | Object | 初始化完成后触发的事件，参数为插件实例

--------------

## ToolBar

比例尺插件。位于地图右下角，用户可控制其显示与隐藏。

### 示例

```html
<template>
    <div id="demoComponent" class="demo-component">
        <el-amap vid="amap" :plugin="plugin">
        </el-amap>
    </div>
</template>

<script>
export default {
  data() {
    return {
      plugin: [{
        pName: 'ToolBar',
        events: {
          init(instance) {
            console.log(instance);
          }
        }
      }]
    };
  }
};
</script>
```


### 属性

名称 | 类型 | 说明
---|---|---|
pName | String | 插件名，必填，设置为 ToolBar
offset |	Array |	相对于地图容器左上角的偏移量，正数代表向右下偏移。默认为[10,10]
position | String | 控件停靠位置LT:左上角;RT:右上角;LB:左下角;RB:右下角;默认位置：LT
ruler |	Boolean |	标尺键盘是否可见，默认为true
noIpLocate |	Boolean |	定位失败后，是否开启IP定位，默认为false
locate |	Boolean |	是否显示定位按钮，默认为false
liteStyle |	Boolean |	是否使用精简模式，默认为false
direction |	Boolean |	方向键盘是否可见，默认为true
autoPosition |	Boolean |	是否自动定位，即地图初始化加载完成后，是否自动定位的用户所在地，仅在支持HTML5的浏览器中有效，默认为false

### 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 初始化完成后触发的事件，参数为插件实例
show | | 工具条显示时触发此事件
hide | | 工具条隐藏时触发此事件
location | {type,lnglat} | 使用ToolBar定位按钮或doLocation函数进行定位，定位完成时触发此事件，浏览器须支持html5 type: 事件类型 lnglat: 定位结果坐标值
zoomchanged | {type} | 使用工具条缩放地图时触发此事件 type：事件类型 放大地图时，type值为zoomin；缩小地图时，type值为zoomout

--------------

## Geolocation

Geolocation定位服务插件。融合了浏览器定位、高精度IP定位、安卓定位 sdk 辅助定位等多种手段，提供了获取当前准确位置、获取当前城市信息、持续定位(浏览器定位)等功能。用户可以通过两种当时获得定位的成败和结果，一种是在 `getCurrentPosition` 的时候传入回调函数来处理定位结果，一种是通过事件监听来取得定位结果。`Geolocation` 定位常见问题说明
注：默认情况下，PC端优先使用精确IP定位，解决多数浏览器无法完成定位的现状，IP定位失败后使用浏览器定位；手机端优先使用浏览器定位，失败后使用IP定位；对于安卓WebView页面的开发者，可以结合定位 sdk 进行辅助定位，详细说明见 useNative 参数。IP定位的精度值为 null。

**由于 Chrome 、IOS10 等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级您的站点到 HTTPS 。**

### 示例

```html
<template>
    <div id="demoComponent" class="demo-component" :center="center">
        <el-amap vid="amap" :plugin="plugin">
        </el-amap>
    </div>
</template>

<script>
export default {
  data() {
    let self = this;

    return {
      center: [],
      plugin: [{
        pName: 'Geolocation',
        events: {
          init(instance) {
            o.getCurrentPosition((status, result) => {
              self.center = [result.position.lng, result.position.lat];
            });
          }
        }
      }]
    };
  }
};
</script>
```


### 属性

名称 | 类型 | 说明
---|---|---|
pName | String | 插件名，必填，设置为 Geolocation
enableHighAccuracy | Boolean | 是否使用高精度默认值：true
timeout | Number | 超时毫秒数，若在指定时间内未定位成功，返回超时错误信息“TIMEOUT”，默认值：无穷大
noIpLocate | Number | 是否禁止使用IP定位，默认值为0，可选值0-3。0: 可以使用IP定位。1: 手机设备禁止使用IP定位2: PC上禁止使用IP定位。3: 所有终端禁止使用IP定位。
noGeoLocation | Number | 是否禁止使用浏览器Geolocation定位，默认值为0，可选值0-3。0: 可以使用浏览器定位。1: 手机设备禁止使用浏览器定位。2: PC上禁止使用浏览器定位。3: 所有终端禁止使用浏览器定位
GeoLocationFirst | Boolean | 默认为false，设置为true的时候可以调整PC端为优先使用浏览器定位，失败后使用IP定位
maximumAge | Number | 缓存毫秒数。定位成功后，定位结果的保留时间。默认值：0
convert | Boolean | 是否使用坐标偏移，取值true:为高德地图坐标，取值false:为浏览器定位坐标。默认值：true
showButton | Boolean | 是否显示定位按钮。默认值：true
buttonDom | String | 自定义定位按钮的内容。可支持HTML代码或Dom元素对象，不设置该属性则使用默认按钮样式
buttonPosition | String | 定位按钮可停靠的位置。“LT”：左上角。“LB”：左下角。“RT”：右上角。“RB”：右下角。默认值：“LB”
showMarker | Boolean | 定位成功时是否在定位位置显示一个Marker。默认值：true
markerOptions | [MarkerOptions](http://lbs.amap.com/api/javascript-api/reference/overlay/#MarkerOptions) | 定位点Marker的配置，不设置该属性则使用默认Marker样式
showCircle | Boolean | 定位成功并且有精度信息时，是否用一个圆圈circle表示精度范围。默认值：true
circleOptions | [CircleOptions](http://lbs.amap.com/api/javascript-api/reference/overlay#CircleOptions) | 定位点Circle的配置，不设置该属性则使用默认Circle样式
panToLocation | Boolean | 定位成功后，是否把定位得到的坐标设置为地图中心点坐标。默认值：true
zoomToAccuracy | Boolean | 定位成功且显示精度范围时，是否把地图视野调整到正好显示精度范围。默认值：false
useNative | Boolean | 是否使用安卓定位sdk用来进行定位，默认：false。适用于同时在APP中使用安卓定位sdk并在APP WebView中使用了JSAPI的开发者。开启后，将优先尝试使用sdk进行定位，失败后依次尝试浏览器定位和IP定位。注：如果要使用辅助定位的功能，除了需要将useNative属性设置为true以外，还需要调用高德定位sdk中，LocationManagerProxy类的startSocket()方法，开启辅助H5定位功能；如果不用，就调用stopSocket()方法停止辅助H5定位功能。具体用法可参考定位SDK的参考手册
extensions | String | JSAPI在定位成功的时候会将得到的经纬度进行逆地理编码后获取地址信息，以方便开发者的进一步使用;extensions用来设定是否需要周边POI、道路交叉口等信息，可选值'base'、'all'。默认为'base',只返回地址信息；设定为'all'的时候将返回周边POI、道路交叉口等信息。


### 事件

事件 | 参数 | 说明
---|---|---|
init | Object | 初始化完成后触发的事件，参数为插件实例
complete | GeolocationResult | 定位成功时触发此事件
error | GeolocationError | 定位失败时触发此事件
