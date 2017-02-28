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
  height: 400px;
}
</style>
