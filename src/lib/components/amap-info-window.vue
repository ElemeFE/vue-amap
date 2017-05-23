<template>
</template>
<script>
import { toLngLat } from '../utils/convert-helper';
import registerMixin from '../mixins/register-component';
export default {
  name: 'el-amap-info-window',
  mixins: [registerMixin],
  props: [
    'vid',
    'icCustom',
    'autoMove',
    'closeWhenClickMap',
    'content',
    'size',
    'offset',
    'position',
    'showShadow',
    'visible',
    'events'
  ],
  data() {
    return {
      converters: {

      },
      handlers: {
        visible(flag) {
          // fixed Amap info-window reopen
          let lng = 0;
          let lat = 0;

          if (this.G && this.G.position) {
            lng = this.G.position.lng;
            lat = this.G.position.lat;
          } else if (this.si && this.si.position) {
            // #90 https://github.com/ElemeFE/vue-amap/commit/6ac6bc8d51ff11c8009d056fbdd1fdb4f92aac7a
            // i can't find si in this scope. why ?
            lng = this.si.position.lng;
            lat = this.si.position.lat;
          }

          flag === false ? this.close() : this.open(this.G.map, [lng, lat]);
        }
      }
    };
  },
  destroyed() {
    this.$amapComponent.close();;
  },
  methods: {
    initComponent(options) {
      this.$amapComponent = new AMap.InfoWindow(options);
      if (this.visible !== false) this.$amapComponent.open(this.$amap, toLngLat(this.position));
    }
  }
};
</script>
