<template></template>
<script>
import registerMixin from '../mixins/register-component';

export default {
  name: 'el-amap-marker',
  mixins: [registerMixin],
  props: [
    'vid',
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
    'label',
    'events',
    'onceEvents'
  ],
  destroyed() {
    this.$amapComponent.setMap(null);
  },
  data() {
    return {
      converts: {
        shape(options) {
          return new AMap.MarkerShape(options);
        },
        shadow(options) {
          return new AMap.Icon(options);
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
    initComponent() {
      let options = this.convertProps();
      this.$amapComponent = new AMap.Marker(options);
    }
  }
};
</script>
