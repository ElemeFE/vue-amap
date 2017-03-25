<template>
  <div class="amap-page-container">
    <el-amap :vid="'amap-vue'" :center="center" :zoom="zoom" :map-manager="amapManager" :plugin="plugin" :events="events">
       <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker"></el-amap-marker>
    </el-amap>
    <button v-on:click="addMarker">add marker</button>
    <button v-on:click="getMap">get map</button>
    <button type="button" name="button" v-on:click="addZoom">zoom++</button>
    <button type="button" name="button" v-on:click="subZoom">zoom--</button>
    <button type="button" name="button" v-on:click="changeCenter">change center</button>
  </div>
</template>
<script>
  import { AMapManager } from 'vue-amap';
  let amapManager = new AMapManager();
  export default {
    name: 'amap-page',
    data: function() {
      return {
        vid: 'amap-vue-1',
        zoom: 12,
        center: [121.59996, 31.197646],
        events: {
          'moveend': () => {
            let mapCenter = this.amapManager.getMap().getCenter();
            this.center = [mapCenter.getLng(), mapCenter.getLat()];
          },
          'zoomchange': () => {
            this.zoom = this.amapManager.getMap().getZoom();
          },
          'click': (e) => {
            alert('map clicked');
          }
        },
        plugin: ['ToolBar', {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init(o) {
              console.log(o);
            }
          }
        }],
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
        console.log(this.center);
      },
      addMarker: function() {
        let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
        let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
        this.markers.push([lng, lat]);
      },
      addZoom() {
        this.zoom++;
      },
      subZoom() {
        this.zoom--;
      },
      changeCenter() {
        this.center = [this.center[0] + 0.1, this.center[1] + 0.1];
        console.log(this.center);
      }
    }
  };
</script>
