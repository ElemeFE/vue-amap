# 脚本初始化

---

## 示例
项目入口文件
初始化脚本，将项目用到的服务插件都提前加载入脚本中
```javascript
import Vue from 'vue';
import AMap from 'vue-amap';

import App from './App.vue';
import router from './router';

Vue.use(AMap);
AMap.initAMapApiLoader({
  key: 'YOUR_KEY',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',...]
});

const app = new Vue({  // eslint-disable-line
  router,
  render: h => h(App)
}).$mount('#app');

```

```html
<template lang="html">
  <div id="amap-cointainer">

  </div>
</template>

<script>
import { lazyAMapApiLoaderInstance } from 'vue-amap';
export default {
  mounted() {
    lazyAMapApiLoaderInstance.load().then(() => {
      this.map = new AMap.Map('amap-cointainer', {center: new AMap.LngLat(121.59996, 31.197646)});
    });
  }
};
</script>

<style lang="css">
#amap-cointainer {
  height: 200px;
}
</style>

```

## 提示
该 `promise` 只是地图脚本的初始化，作为定制化较高（如服务）的需求；组件直接使用无需；

<demo></demo>
<script>
import Demo from 'demos/init.vue';
export default {
  components: {
    Demo
  }
}
</script>
