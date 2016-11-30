<template></template>
<script>
import registerMixin from '../mixins/register-component';
import { toLngLat, toPixel } from '../utils/converts-helper';
export default {
  name: 'el-amap-circle',
  mixins: [registerMixin],
  props: [
    'vid',
    'zIndex',
    'center',
    'bubble',
    'radius',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'fillColor',
    'fillOpacity',
    'strokeStyle',
    'extData',
    'strokeDasharray',
    'events',
    'visible',
    'extData',
    'onceEvents'
  ],
  destroyed() {
    this.$amapComponent.setMap(null);
  },
  data() {
    return {
      converts: {
        center(arr) {
          return toPixel(arr);
        }
      },
      handlers: {
        zIndex(index) {
          this.$amapComponent.setzIndex(index);
        },
        visible(flag) {
          flag === false ? this.$amapComponent.hide() : this.$amapComponent.show();
        }
      }
    };
  },
  methods: {
    initComponent(options) {
      this.$amapComponent = new AMap.Circle(options);
    }
  }
};
</script>
