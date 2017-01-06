<template>
  <div class="amap-page-container">
    <el-amap :vid="'amap-vue'" :center="center" :zoom="zoom" :plugin="plugins">
    </el-amap>
  </div>
</template>
<script>
  export default {
    name: 'amap-page',
    data: function() {
      return {
        vid: 'amap-vue-1',
        zoom: 12,
        center: [121.59996, 31.197646],
        plugins: [{
          pName: 'MapType',
          defaultType: 1
        }]
      };
    }
  };
</script>
