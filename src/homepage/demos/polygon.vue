<template>
  <div id="demoComponent" class="demo-component">
        <el-amap id="amap" :zoom="zoom" :center="center">
          <el-amap-polygon v-for="polygon in polygons" :path="polygon.path" :events="polygon.events"></amap-polygon>
        </amap>
  </div>
</template>

<script>
export default {
  name: 'demoComponent',
  data() {
    return {
      zoom: 15,
      center: [121.5273285, 31.21515044],
      polygons: [
        {
          path: [[121.5273285, 31.21515044], [121.5293285, 31.21515044], [121.5293285, 31.21915044], [121.5273285, 31.21515044]],
          events: {
            click() {
              alert('click polygon');
            }
          }
        }
      ]
    };
  }
};
</script>
