
<template>
  <div id="demoComponent" class="demo-component">
      <el-amap id="amap" :zoom="zoom" :center="center">
        <el-amap-info-window v-for="window in windows" :position="window.position" :content="window.content" :open="window.open" :events="window.events"></el-amap-info-window>
      </el-amap>
  </div>
</template>

<script>
export default {
  name: 'demoComponent',
  data() {
    return {
      zoom: 14,
      center: [121.5273285, 31.21515044],
      windows: [
        {
          position: [121.5273285, 31.21515044],
          content: '<div>Hi! I am here</div>',
          events: {
            close() {
              console.log('close infowindow');
            }
          }
        }
      ]
    };
  }
};
</script>
