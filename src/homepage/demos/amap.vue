<template>
  <div class="amap-page-container">
    <el-amap :vid="'amap-vue'" :center="[121.59996, 31.197646]" :zoom="12" :map-manager="amapManager" :map-events="events">
      <el-amap-marker v-for="marker in markers" :position="marker"></el-amap-marker>
    </el-amap>
    <button v-on:click="addMarker">add marker</button>
    <button v-on:click="getMap">get map</button>
    <button v-on:click="getMapInstanceByPromise">getMapInstanceByPromise</button>
  </div>
</template>
<script lang="babel" type="text/ecmascript-6">
  import VueAMap from '../../lib';
  let amapManager = new VueAMap.AMapManager();
  export default {
    name: 'amap-page',
    data: function() {
      return {
        vid: 'amap-vue-1',
        events: {
          'click': (e) => {
            console.log(e.lnglat.getLng() + ':' + e.lnglat.getLat());
            console.log(this);
          }
        },
        amapManager: amapManager,
        markers: [
                 [121.59996, 31.197646],
                 [121.40018, 31.197622],
                 [121.69991, 31.207649]]
      };
    },
    methods: {
      getMap: function() {
        console.log(this.amapManager.getMap());
      },
      getMapInstanceByPromise() {
        this.amapManager.getMapPromise().then(map => {
          return map;
        }).then(map => {console.log(map);});
      },
      addMarker: function() {
        let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
        let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
        this.markers.push([lng, lat]);
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  .amap-page-container {
    margin: auto;
  }

  .amap-page-container .el-vue-amap {
    height: 400px;
  }
</style>
