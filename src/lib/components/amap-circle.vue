<template></template>
<script>
import registerMixin from '../mixins/register-component';
import { toLngLat, lngLatTo } from '../utils/convert-helper';
import editorMixin from '../mixins/editor-component';
export default {
  name: 'el-amap-circle',
  mixins: [registerMixin, editorMixin],
  props: [
    'vid',
    'zIndex',
    'center',
    'bubble',
    'radius',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'editable',
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
  data() {
    return {
      converters: {
        center(arr) {
          return toLngLat(arr);
        }
      },
      handlers: {
        zIndex(index) {
          this.setzIndex(index);
        },
        visible(flag) {
          flag === false ? this.hide() : this.show();
        },
        editable(flag) {
          flag === true ? this.editor.open() : this.editor.close();
        }
      }
    };
  },
  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.Circle(options);
      this.$amapComponent.editor = new AMap.CircleEditor(this.$amap, this.$amapComponent);
    },
    $$getCenter() {
      return lngLatTo(this.$amapComponent.getCenter());
    }
  }
};
</script>
