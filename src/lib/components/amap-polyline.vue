<template>
</template>
<script>
import registerMixin from '../mixins/register-component';
import editorMixin from '../mixins/editor-component';
export default {
  name: 'el-amap-polyline',
  mixins: [registerMixin, editorMixin],
  props: [
    'vid',
    'zIndex',
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
    'onceEvents'
  ],
  data() {
    return {
      converts: {},
      handlers: {
        visible(flag) {
          flag === false ? this.hide() : this.show();
        },
        editable(flag) {
          flag === true ? this.editor.open() : this.editor.close();
        },
        strokeStyle(style) {
          this.setOptions({
            strokeStyle: style
          });
        },
        strokeColor(color) {
          this.setOptions({
            strokeColor: color
          });
        }
      }
    };
  },
  methods: {
    initComponent(options) {
      this.$amapComponent = new AMap.Polyline(options);
      this.$amapComponent.editor = new AMap.PolyEditor(this.$amap, this.$amapComponent);
      this.setEditorEvents();
    }
  }
};
</script>
