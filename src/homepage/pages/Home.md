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
    <router-link to="/docs" class="btn">文档</router-link>
  </section>
  <canvas id="meteor"></canvas>
  </section>
</section>
<script>
setTimeout(function() {
  if (window.meteor) {
    window.meteor();
  }
}, 2000);
</script>
