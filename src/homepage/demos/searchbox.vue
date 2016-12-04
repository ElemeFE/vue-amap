<template>
  <div class="amap-page-container">
    <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
    <el-amap :vid="'amap-vue'" :center="[121.59996, 31.197646]" :zoom="12" :map-manager="amapManager">
      <el-amap-marker v-for="marker in markers" :position="marker"></el-amap-marker>
    </el-amap>
  </div>
</template>
<script>
  import VueAMap from '../../lib';
  let amapManager = new VueAMap.AMapManager();
  export default {
    name: 'search-box-page',
    data: function() {
      return {
        vid: 'amap-vue-2',
        amapManager: amapManager,
        markers: [
          [121.59996, 31.197646],
          [121.40018, 31.197622],
          [121.69991, 31.207649]
        ],
        searchOption: {
          city: '上海',
          citylimit: true
        }
      };
    },
    methods: {
      addMarker: function() {
        let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
        let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
        this.markers.push([lng, lat]);
      },
      onSearchResult(pois) {
        let latSum = 0;
        let lngSum = 0;
        pois.forEach(poi => {
          let {lng, lat} = poi;
          lngSum += lng;
          latSum += lat;
          this.markers.push([poi.lng, poi.lat]);
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.amapManager.getMap().setZoomAndCenter(17, new AMap.LngLat(center.lng, center.lat));
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

  .search-box {
    position: relative;
    top: 65px;
    left: 20px;
  }
</style>
