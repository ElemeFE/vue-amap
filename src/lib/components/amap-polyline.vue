<template>
</template>
<script>
import registerMixin from '../mixins/register-component';
import editorMixin from '../mixins/editor-component';
import { lngLatTo } from '../utils/convert-helper';
export default {
  name: 'el-amap-polyline',
  mixins: [registerMixin, editorMixin],
  props: [
    'vid',
    'zIndex',
    'visible',
    'editable',
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
    'onceEvents',
    'lineJoin'
  ],
  data() {
    return {
      converters: {},
      handlers: {
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
      this.$amapComponent = new AMap.Polyline(options);
      this.$amapComponent.editor = new AMap.PolyEditor(this.$amap, this.$amapComponent);
    },
    $$getPath() {
      return this.$amapComponent.getPath().map(lngLatTo);
    },
    $$getBounds() {
      return this.$amapComponent.getBounds();
    },
    $$getExtData() {
      return this.$amapComponent.getExtData();
    }
  }
};
</script>
