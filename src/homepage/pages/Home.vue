<template lang="html">
  <section class="home-page">
    <section class="page-header-bg">
    </section>
    <section class="page-header">
      <div class="project-name">
        <img src="../assets/images/logo_a.png" class="logo" />
        vue-amap
      </div>
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
    <div id="meteor"></div>
    </section>
  </section>
</template>
<script>
  require('particles.js/particles.js');
  export default {
    name: 'homepage',
    mounted() {
      particlesJS.load('meteor', 'static/json/particles.json', () => {});
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .home-page {
    .slogan {
      text-align: center;
      margin: 70px 0 !important;
      font-size: 24px;
    }
  
    .main-content {
      width: 900px;
      margin: 0 auto;
      line-height: 24px;
      margin-top: 380px;
  
      .h1, h2, h3, h4, h5, h6 {
        margin-bottom: 1rem;
        font-weight: normal;
        color: #159957;
      }
    }
  
    #meteor, .page-header-bg, .page-header {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }
  
    .page-header-bg {
      background-color: #21364c;
      left: 0;
      z-index: 9;
    }
  
    #meteor {
      height: 100%;
      width: 100%;
      z-index: 10;
    }
  
    .page-header {
      color: #fff;
      text-align: center;
      z-index: 11;
      height: 432px;
      top: 50%;
      margin-top: -222px;
      background: rgba(17, 29, 47, 0.4);
      width: 500px;
      left: 50%;
      margin-left: -250px;
      border-radius: 15px;
  
      .sub {
        color: #939b9e;
        margin: 20px 0 55px 0;
      }
  
      .intro {
        width: 450px;
        margin: 0 auto 60px auto;
        line-height: 32px;
        font-size: 20px;
        color: #e6e5e5;
        border: 1px #3a667d solid;
        border-right: 0;
        border-left: 0;
        padding: 22px 10px;
      }
  
      .project-name {
        font-size: 80px;
        font-family: cursive;
  
        .logo {
          width: 60px;
          vertical-align: middle;
        }
      }
  
      .btn {
        display: inline-block;
        color: rgba(255, 255, 255, 0.7);
        background-color: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 0.3rem;
        transition: color 0.2s, background-color 0.2s, border-color 0.2s;
        padding: 15px 40px;
        margin: 0 10px;
  
        &:hover {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          background-color: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3); }
        }
      }
  }
</style>
