<template>
  <div class="amap-page-container">
    <el-amap
        :lat="31.197646"
        :lng="121.39986"
        :zoom="12"
        :options="{}">
        <el-amap-marker
        :lat="31.197646"
        :lng="121.39986"
        ></el-amap-marker>
        </el-amap>
  </div>
</template>
<script>
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



