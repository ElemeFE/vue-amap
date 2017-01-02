<template></template>
<script>
import registerMixin from '../mixins/register-component';
export default {
  name: 'el-amap-ground-image',
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
            this.setMap(null);
          } else {
            this.setMap(this.$amap);
          }
        }
      }
    };
  },
  methods: {
    initComponent(options) {
      this.$amapComponent = new AMap.GroundImage(options.url, options.bounds, options);
    }
  }
};
</script>
