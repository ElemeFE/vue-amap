<template></template>
<script lang="babel" type="text/ecmascript-6">
  import RegisterComponentMixin from '../mixins/register-component-mixin';

  export default {
    name: 'el-amap-marker',
    mixins: [RegisterComponentMixin],
    props: ['markerOptions'],
    methods: {
      initComponent() {
        if (!this.$map) throw new Error('map instance not initialized');
        let options = this.getOptions();
        if (options.position && Array.isArray(options.position)) {
          options.position = new AMap.LngLat(options.position[0], options.position[1]);
        }
        if (options.offset && Array.isArray(options.offset)) {
          options.offset = new AMap.Pixel(options.offset[0], options.offset[1]);
        }
        options.map = this.$map;
        this.$marker = new AMap.Marker(options);
        this.$markerOptions = options;
        ['map', 'offset', 'position', 'label', 'icon', 'content', 'shadow', 'shape', 'extData', 'angle', 'zIndex', 'clickable', 'draggable', 'top', 'animation', 'cursor', 'title'].forEach(item => {
          this.generateSetFn(item);
        });
        ['map', 'offset', 'position', 'label', 'icon', 'content', 'shadow', 'shape', 'extData', 'angle', 'clickable', 'draggable', 'top', 'animation', 'title'].forEach(item => {
          this.generateGetFn(item);
        });
      },
      generateSetFn(name) {
        var fn = 'set' + (name.substring(0, 1).toUpperCase() + name.substring(1));
        this[fn] = function(value) {
          this.$map[fn].call(this[fn], value);
        };
      },
      generateGetFn(name) {
        var fn = 'get' + (name.substring(0, 1).toUpperCase() + name.substring(1));
        this[fn] = function() {
          return this.$map[fn].call(this[fn]);
        };
      },
      markOnAMAP(obj) {
        if (!obj.name) return;
        this.$marker.markOnAMAP(obj);
      },
      hide() {
        this.$marker.hide();
      },
      show() {
        this.$marker.show();
      },
      moveAlong(pointlist, speed, fn, circlable) {
        if (!pointlist instanceof Array || !speed instanceof Number) return;
        this.$marker.moveAlong(pointlist, speed, fn, circlable);
      },
      moveTo(poi, speed, fn) {
        this.$marker.moveTo(poi, speed, fn);
      },
      stopMove() {
        this.$marker.stopMove();
      }
    }
  };
</script>
