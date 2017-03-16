<template>
</template>
<script>
import registerMixin from '../mixins/register-component';
import editorMixin from '../mixins/editor-component';
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
    'onceEvents'
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
    initComponent() {
      let options = this.convertProps();
      this.$amapComponent = new AMap.Polygon(options);
      this.$amapComponent.editor = new AMap.PolyEditor(this.$amap, this.$amapComponent);
    }
  }
};
</script>
