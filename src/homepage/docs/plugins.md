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
