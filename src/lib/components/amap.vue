<template>
    <div class="el-vue-amap-container">
      <div class="el-vue-amap"></div>
      <slot></slot>
    </div>
</template>
<script>
  import guid  from '../utils/guid';
  import {lazyAMapApiLoaderInstance} from '../services/injected-amap-api-instance';
  import MapEventEmitter from  '../mixins/eventEmitterMixin';
  export default {
    name: 'el-amap',
    props: ['lng', 'lat', 'zoom', 'draggEnable', 'options'],
    mixins: [MapEventEmitter],
    mounted() {
      let mapElement = this.$el.querySelector('.el-vue-amap');
      const elementID = guid();
      mapElement.id = elementID;
      lazyAMapApiLoaderInstance.load().then(() => {
        let tmpOptions = Object.assign({} ,this.$options.propsData);
        if (this.$options.propsData.options) {
          delete tmpOptions.options;
          Object.assign(tmpOptions, this.$options.propsData.options)
        }
        if(tmpOptions.lng && tmpOptions.lat) tmpOptions.center = new AMap.LngLat(tmpOptions.lng, tmpOptions.lat);
        delete tmpOptions.lng;
        delete tmpOptions.lat;
        this.$mapOptions = tmpOptions;
        this.$map = new AMap.Map(elementID, tmpOptions);
        this.$broadcast('map-ready', {
          args: [this.$map]
        });
      }, error => {
        throw new Error(error)
      });
    }
  }
</script>
<style>
.el-vue-amap-container{
  width: 100%;
  height: 100%;
}
.el-vue-amap {
  height: 100%;
  width: 100%;
}
</style>

