# 插件

---

## 引入方式

### 1 - 全局引入地图插件

首先需要在项目初始化时，通过 `initAMapApiLoader` 引入所需要的插件。

*使用插件之前一定要初始化，否则会报错！*

```javascript
import VueAMap from 'vue-amap';
VueAMap.initAMapApiLoader({
  key: 'YOUR_KEY',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor']
});
```

### 2 - 配置插件

全局引入后，需要给单个地图组件配置插件:

```javascript
<template>
  <div>
    <el-amap vid="amapDemo" :plugin="plugins"></el-amap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plugins: ['MapType'];
    };
  };
};
</script>
```

## 配置说明

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
