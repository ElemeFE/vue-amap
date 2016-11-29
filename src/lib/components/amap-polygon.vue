<template>
</template>
<script>
import guid from '../utils/guid';
import CONST from '../utils/constant';
import { toLngLat, toPixel } from '../utils/converts-helper';
import registerMixin from '../mixins/register-component';
export default {
  mixins: [registerMixin],
  props: [
    'zIndex',
    'path',
    'bubble',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'fillColor',
    'fillOpacity',
    'extData',
    'strokeStyle',
    'visible',
    'strokeDasharray'
  ],
  data() {
    return {
      converts: {
        path(arrs) {
          let _convertArr = (arr) => {
            if (arr.length === 2 && !Array.isArray(arr)) {
              return toLngLat(arr)
            } else {
              return arr.map(_a => _convertArr(_a));
            }
          }
          return _convertArr(arrs);
        }
      },
      handlers: {
        visible(flag) {
          visible === false ? this.$amapComponent.hide() : this.$amapComponent.show();
        },
        strokeColor(color) {
          this.setOptions({strokeColor: color});
        },
        strokeOpacity(num) {
          this.setOptions({strokeOpacity: num});
        },
        strokeWeight(num) {
          this.setOptions({strokeWeight: num});
        },
        strokeDasharray(arr) {
          this.setOptions({strokeDasharray: arr});
        },
        strokeStyle(style) {
          this.setOptions({strokeStyle: style});
        },
        fillColor(color) {
          this.setOptions({fillColor: color});
        }
      }
    };
  },
  destroyed() {
    this.$amapComponent.setMap(null);
  },
  methods: {
    setOptions(options) {
      this.$amapComponent.setOptions(new AMap.PolygonOptions(options));
    },
    initComponent() {
      let options = this.convertProps();
      this.$amapComponent = new AMap.Polygon(options);
    }
  }
};
</script>

<style>

</style>
