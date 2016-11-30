<template></template>
<script>
import registerMixin from '../mixins/register-component';
import { toLngLat, toPixel } from '../utils/converts-helper';
export default {
  name: 'el-amap-group-image',
  mixins: [registerMixin],
  props: [
    'vid',
    'clickable',
    'opacity',
    'url',
    'bounds',
    'visible',
    'events',
    'onceEvents'
  ],
  destroyed() {
    this.$amapComponent.setMap(null);
  },
  data() {
    return {
      converts: {},
      handlers: {
        visible(flag) {
          if (flag === false) {
            this.$amapComponent.setMap(null);
          } else {
            this.$amapComponent.setMap(this.$amap);
          }
        }
      }
    };
  },
  methods: {
    initComponent(options) {
      this.$amapComponent = new AMap.GroundImage(options.url, options.bounds);
    }
  }
};
</script>
