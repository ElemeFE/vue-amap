<template>
</template>
<script>
import { toLngLat } from '../utils/converts-helper';
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
      converts: {

      },
      handlers: {
        visible(flag) {
          flag === false ? this.$amapComponent.close() : this.$amapComponent.open();
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
