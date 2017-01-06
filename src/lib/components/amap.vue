<template>
<div class="el-vue-amap-container">
    <div class="el-vue-amap"></div>
    <slot></slot>
</div>
</template>
<script>
   import guid from '../utils/guid';
   import CONST from '../utils/constant';
   import { toLngLat } from '../utils/convert-helper';
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

     computed: {
       /**
        * convert plugin prop from 'plugin' to 'plugins'
        * unify plugin options
        * @return {Array}
        */
       plugins() {
         let plus = [];

         if (typeof this.plugin === 'string') {
           plus.push({
             pName: this.plugin
           });
         } else if (this.plugin instanceof Array) {
           plus = this.plugin.map(oPlugin => {
             let nPlugin = {};

             if (typeof oPlugin === 'string') {
               nPlugin.pName = oPlugin;
             } else {
               nPlugin = oPlugin;
             }

             return nPlugin;
           });
         }

         return plus;
       }
     },

     data() {
       return {
         converters: {
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
       addPlugins() {
         let _notInjectPlugins = this.plugins.filter(_plugin => !AMap[_plugin.pName]);
         if (!_notInjectPlugins || !_notInjectPlugins.length) return this.addMapControls();
         return this.$amapComponent.plugin(_notInjectPlugins, this.addMapControls);
       },

       addMapControls() {
         if (!this.plugins || !this.plugins.length) return;

         this.plugins.forEach(_plugin => {
           this.$amapComponent.addControl(new AMap[_plugin.pName](_plugin));
         });
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
           if (this.plugins && this.plugins.length) {
             this.addPlugins();
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
