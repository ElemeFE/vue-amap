<template>
</template>
<script>
import guid from '../utils/guid';
import CONST from '../utils/constant';
import { toLngLat, toPixel } from '../utils/converts-helper';
import registerMixin from '../mixins/register-component';
export default {
  name: 'el-amap-polyline',
  mixins: [registerMixin],
  props: [
    'vid',
    'zIndex',
    'bubble',
    'geodesic',
    'isOutline',
    'outlineColor',
    'path',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'strokeStyle',
    'strokeDasharray',
    'events',
    'extData',
    'onceEvents'
  ],
  data() {
    return {
      converts: {},
      handlers: {
        visible(flag) {
          visible === false ? this.$amapComponent.hide() : this.$amapComponent.show();
        }
      }
    };
  },
  destroyed() {
    this.$amapComponent.setMap(null);
  },
  methods: {
    initComponent() {
      let options = this.convertProps();
      this.$amapComponent = new AMap.Polygon(options);
    }
  }
};
</script>
