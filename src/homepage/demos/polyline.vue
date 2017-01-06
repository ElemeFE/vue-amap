<template lang="html">
  <div id="demoComponent" class="demo-component">
      <el-amap vid="amap" :zoom="zoom" :center="center" :amapManager="amapManager">
        <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :events="polyline.events"></el-amap-polyline>
      </el-amap>
      <button type="button" name="button" v-on:click="changeEditable">change editable</button>
      <button type="button" name="button" v-on:click="logPath">log path</button>
  </div>
</template>

<script>
import { AMapManager } from '../../lib';
let amapManager = new AMapManager();
const POLYGON_ID = 'POLYGON_ID';
export default {
  name: 'demoComponent',
  data() {
    return {
      zoom: 12,
      amapManager: amapManager,
      center: [121.5273285, 31.25515044],
      polyline: {
        vid: POLYGON_ID,
        path: [[121.5389385, 31.21515044], [121.5389385, 31.29615044], [121.5273285, 31.21515044]],
        events: {
          click(e) {
            alert('click polyline');
          },
          end: (e) => {
            this.polyline.path = e.target.getPath().map(point => [point.lng, point.lat]);
          }
        },
        editable: false
      }
    };
  },
  methods: {
    changeEditable() {
      this.polyline.editable = !this.polyline.editable;
    },
    logPath() {
      console.log(this.polyline.path);
    }
  }
};
</script>
