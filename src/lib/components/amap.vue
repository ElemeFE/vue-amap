<template>
<div class="el-vue-amap-container">
    <div class="el-vue-amap"></div>
    <slot></slot>
</div>
</template>
<script>
   import CONST from '../utils/constant';
   import { toLngLat } from '../utils/converts-helper';
   import registerMixin from '../mixins/register-component';
   import {lazyAMapApiLoaderInstance} from '../services/injected-amap-api-instance';
   export default {
     name: 'el-amap',
     mixins: [registerMixin],
     props: [
       'vid',
       'center',
       'zoom',
       'draggEnable',
       'level',
       'zooms',
       'lang',
       'cursor',
       'crs',
       'animateEnable',
       'isHotspot',
       'defaultLayer',
       'rotateEnable',
       'resizeEnable',
       'showIndoorMap',
       'indoorMap',
       'expandZoomRange',
       'dragEnable',
       'zoomEnable',
       'doubleClickZoom',
       'keyboardEnable',
       'jogEnable',
       'scrollWheel',
       'touchZoom',
       'mapStyle',
       'features',
       'mapManager'  // 地图管理 manager
     ],
     beforeCreate() {
       this._loadPromise = lazyAMapApiLoaderInstance.load();
     },
     data() {
       return {
         converts: {
           center(arr) {
             return toLngLat(arr);
           }
         },
         handlers: {
           zoomEnable(flag) {
             this.setStatus({zoomEnable: flag});
           },
           dragEnable(flag) {
             this.setStatus({dragEnable: flag});
           },
           rotateEnable(flag) {
             this.setStatus({rotateEnable: flag});
           }
         }
       };
     },
     methods: {
       setStatus(option) {
         this.$amap.setStatus(option);
       },
       initComponent() {
         this._loadPromise.then(() => {
           let options = this.convertProps();
           this.$amap = this.$amapComponent = new AMap(options);
           if (this.amapManager) this.amapManager.setMap(this.$map);
           this.$emit(CONST.AMAP_READY_EVENT, this.$amap);
           this.$children.forEach(component => {
             component.$emit(CONST.AMAP_READY_EVENT, this.$map);
           });
         });
       }
     }
   };
</script>

<style>

</style>
