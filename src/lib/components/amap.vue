<template>
<div class="el-vue-amap-container">
    <div class="el-vue-amap"></div>
    <slot></slot>
</div>
</template>
<script>
   import guid from '../utils/guid';
   import CONST from '../utils/constant';
   import { toLngLat } from '../utils/converts-helper';
   import registerMixin from '../mixins/register-component';
   import {lazyAMapApiLoaderInstance} from '../services/injected-amap-api-instance';
   export default {
     name: 'el-amap',
     mixins: [registerMixin],
     props: [
       'vid',
       'events',
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
       'plugin',
       'features',
       'mapManager'  // 地图管理 manager
     ],
     beforeCreate() {
       this._loadPromise = lazyAMapApiLoaderInstance.load();
     },
     destroyed() {
       this.$amap && this.$amap.destroy();
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
     mounted() {
       this.createMap();
     },
     addEvents() {
       this.$amapComponent.on('moveend', () => {
         let centerLngLat = this.$amapComponent.getCenter();
         this.center = [centerLngLat.getLng(), centerLngLat.getLat()];
       });
     },
     methods: {
       addPlugins(plugin) {
         let _notInjectPlugins = plugin.filter(_plugin => !AMap[_plugin]);
         if (!_notInjectPlugins || !_notInjectPlugins.length) return this.addMapControls();
         return this.$amapComponent.plugin(_notInjectPlugins, this.addMapControls);
       },
       addMapControls() {
         if (!this.plugin || !this.plugin.length) return;
         this.plugin.forEach(_plugin => this.$amapComponent.addControl(new AMap[_plugin]()));
       },
       setStatus(option) {
         this.$amap.setStatus(option);
       },
       createMap() {
         this._loadPromise.then(() => {
           let mapElement = this.$el.querySelector('.el-vue-amap');
           const elementID = this.vid || guid();
           mapElement.id = elementID;
           this.$amap = this.$amapComponent = new AMap.Map(elementID, this.convertProps());
           if (this.mapManager) this.mapManager.setMap(this.$amap);

           this.$emit(CONST.AMAP_READY_EVENT, this.$amap);
           this.$children.forEach(component => {
             component.$emit(CONST.AMAP_READY_EVENT, this.$amap);
           });
           if (this.plugin && this.plugin.length) {
             this.addPlugins(this.plugin);
           }
         });
       }
     }
   };
</script>

<style lang="scss">
.el-vue-amap-container {
  height: 100%;
.el-vue-amap {
    height: 100%;
  }
}
</style>
