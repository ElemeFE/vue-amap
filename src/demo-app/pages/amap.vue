<template>
  <div class="amap-page-container">
    <el-amap
        :center="[121.59996, 31.197646]"
        :zoom="12"
        :map-manager="amapManager"
        :map-events="events"
        >
          <el-amap-marker
          v-for="marker in markers"
          :position="marker"
          ></el-amap-marker>
        </el-amap>
        <button v-on:click="addMarker">add marker</button>
        <button v-on:click="getMap">get map</button>
        <button v-on:click="getMapInstaneByPromise">getMapInstaneByPromise</button>
  </div>
</template>
<script>
import VueAMap from '../../lib';
let amapManager  = new VueAMap.AMapManager();
export default {
  name:'amap-page',
  data: function() {
    return {
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
                  [121.69991, 31.207649]
        ]
    };
  },
  methods: {
    getMap: function(){
      console.log(this.amapManager.getMap());
    },
    getMapInstaneByPromise(){
      this.amapManager.getMapPromise().then(map => {
          return map;
      }).then(map => {console.log(map);});
    },
    addMarker: function() {
      this.markers.push(
        [121.7, 31.197646])
    }
  }
}
</script>
<style>
  .amap-page-container {
    with: 80%;
    margin: auto;
  }
  .amap-page-container .el-vue-amap {
    height: 400px;
  }
</style>



