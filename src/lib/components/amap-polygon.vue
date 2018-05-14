<template>
</template>
<script>
import registerMixin from '../mixins/register-component';
import editorMixin from '../mixins/editor-component';
import { lngLatTo } from '../utils/convert-helper';
export default {
  name: 'el-amap-polygon',
  mixins: [registerMixin, editorMixin],
  props: [
    'vid',
    'zIndex',
    'path',
    'bubble',
    'strokeColor',
    'strokeOpacity',
    'strokeWeight',
    'fillColor',
    'editable',
    'fillOpacity',
    'extData',
    'strokeStyle',
    'visible',
    'strokeDasharray',
    'events',
    'onceEvents',
    'draggable'
  ],
  data() {
    return {
      converters: {},
      handlers: {
        visible(flag) {
          flag === false ? this.hide() : this.show();
        },
        zIndex(num) {
          this.setOptions({zIndex: num});
        },
        editable(flag) {
          flag === true ? this.editor.open() : this.editor.close();
        }
      }
    };
  },
  methods: {
    __initComponent() {
      let options = this.convertProps();
      this.$amapComponent = new AMap.Polygon(options);
      this.$amapComponent.editor = new AMap.PolyEditor(this.$amap, this.$amapComponent);
    },
    $$getPath() {
      return this.$amapComponent.getPath().map(lngLatTo);
    },
    $$getExtData() {
      return this.$amapComponent.getExtData();
    },
    $$contains(point) {
      if (Array.isArray(point)) point = new AMap.LngLat(point[0], point[1]);
      return this.$amapComponent.getBounds().contains(point);
    }
  }
};
</script>
