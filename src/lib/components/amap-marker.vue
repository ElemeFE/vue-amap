<template></template>
<script>
import { toLngLat, toPixel } from '../utils/converts-helper';
import registerMixin from '../mixins/register-component';

export default {
  name: 'el-amap-marker',
  mixins: [registerMixin],
  props: [
    'id',
    'position',
    'offset',
    'icon',
    'content',
    'topWhenClick',
    'bubble',
    'draggable',
    'raiseOnDrag',
    'cursor',
    'visible',
    'zIndex',
    'angle',
    'autoRotation',
    'animation',
    'shadow',
    'title',
    'clickable',
    'shape',
    'extData',
    'label'
  ],
  destroyed() {
    this.$amapComponent.setMap(null);
  },
  data: {
    converts: {
      position(arr) {
        return toLngLat(arr);
      },
      offset(arr) {
        return toPixel(arr);
      }
    },
    handlers: {
      zIndex(index) {
        this.$amapComponent.setzIndex(index);
      },
      visible(flag) {
        flag ? this.$amapComponent.show() : this.$amapComponent.hide();
      }
    }
  },
  methods: {
    initComponent() {
      let options = this.convertProps();
      this.$amapComponent = new AMap.Marker(options);
    }
  }
};
</script>
