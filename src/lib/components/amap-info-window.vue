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
          flag === false ? this.close() : this.open(this.G.map, [this.si.position.lng, this.si.position.lat]);
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
