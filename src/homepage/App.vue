<template lang="html">
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script lang="babel" type="text/ecmascript-6">
  import 'normalize.css/normalize.css';
  import 'highlight.js/styles/github-gist.css';
  export default {
    name: 'app'
  };
</script>
<style lang="scss" rel="stylesheet/scss">
@import './assets/scss/common';
  .container {
    height: 100%;
  }
</style>
