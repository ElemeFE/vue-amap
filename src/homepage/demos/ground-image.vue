<template>
  <div id="demoComponent" class="demo-component">
      <el-amap vid="amap" :zoom="zoom" :center="center">
      <el-amap-ground-image v-for="(groundimage, index) in groundimages" :key="index" :url="groundimage.url" :bounds="groundimage.bounds" :events="groundimage.events"></el-amap-ground-image>
      </el-amap>
  </div>
</template>

<script>
export default {
  name: 'demoComponent',
  data() {
    return {
      zoom: 7,
      center: [121.5273285, 31.21515044],
      groundimages: [
        {
          url: '//faas.elemecdn.com/desktop/media/img/appqc.95e532.png',
          bounds: [[121.5273285, 31.21515044], [122.9273285, 32.31515044]],
          events: {
            click() {
              alert('click groundimage');
            },
            init(o) {
              console.log(o);
            }
          }
        }
      ]
    };
  }
};
</script>
