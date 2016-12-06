<template lang="html">
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script>
  import 'normalize.css/normalize.css';
  import 'highlight.js/styles/github-gist.css';
  export default {
    name: 'app'
  };
</script>
<style lang="scss">
  @import './assets/scss/common';
  .container {
    height: 100%;
  }
</style>
