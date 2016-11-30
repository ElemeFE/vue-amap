<section class="home-page">
  <section class="page-header-bg">
  </section>
  <section class="page-header">
    <div class="project-name">vue-amap</div>
    <p class="sub">
      基于Vue 2.0 和高德地图的地图组件
    </p>
    <p class="intro">
      数据状态与地图状态单向绑定。开发者只需维护自己数据集的状态，无需关心地图的具体操作。
    </p>
    <h2 class="project-tagline"></h2>
    <a href="https://github.com/ElemeFE/vue-amap" class="btn">GitHub</a>
    <a href="/#/docs/" class="btn">文档</a>
  </section>
  <canvas id="meteor"></canvas>

  <section class="main-content">
    <h3 class="slogan">
      单向数据驱动，组件化编程，vue-amap让操作地图更加简单。
    </h3>
    <h3 class="slogan">
      “在地图上加个小人，让它动起来！”
    </h3>
    <h4>
      1 - 载入高德地图
    </h4>

```javascript
import AMap from 'vue-amap';
Vue.use(AMap);
AMap.init({
  key: 'YOUR_KEY'
});
```

<h4>
  2 - 引入地图组件
</h4>

```javascript
<amap id="amap">
</amap>
```

<h4>
  3 - 引入点坐标组件
</h4>

```javascript
<amap id="amap">
  <amap-marker v-for="marker in markers" :position="marker.position">
  </amap-marker>
</amap>
```

<h4>
  4 - 实现逻辑代码
</h4>

```javascript
export default {
  data() {
    return {
      // 小人数组
      markers: []
    }
  },
  mounted() {
    // step 1 ： 添加小人
    this.markers.push({
      position: [121.49522781, 31.21882061],
      icon: 'person.png'
    });

    // step 2 ： 让小人策马崩腾吧
    setInterval(() => {
      this.markers.position[0] = this.markers.position[0] + 0.001;
    }, 1000);
  }
}
```
  </section>
</section>
<script>
setTimeout(function() {
  if (window.meteor) {
    window.meteor();
  }
}, 2000);
</script>
