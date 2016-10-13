<template>
  <div class="amap-page-container">
    <el-amap
        :center="{lat:31.197646,lng:121.59996}"
        :zoom="12"
        :options="{}"
        :map-manager="amapManager"
        :map-events="events"
        >
          <el-amap-marker
          v-for="marker in markers"
          :lat="marker.lat"
          :lng="marker.lng"
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
              {
                lat:31.197646,
                lng:121.59996
              },
              {
                lat:31.197648,
                lng:121.40018
              },
              {
                lat:31.197649,
                lng:121.69991
              }
        ]
    };
  },
  methods: {
    getMap: function(){
      console.log(this.amapManager.getMap());
    },
    getMapInstaneByPromise(){
      this.amapManager.getMapPromise().then(map => {
          console.log(map);
      });
    },
    addMarker: function() {
      this.markers.push(
        {
           lat:31.107648,
           lng:121.30018
        })
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



