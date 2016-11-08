<template></template>
<script lang="babel" type="text/ecmascript-6">
  import RegisterComponentMixin from '../mixins/register-component-mixin';

  export default {
    name: 'el-amap-marker',
    mixins: [RegisterComponentMixin],
    props: ['lng', 'lat', 'draggable', 'options', 'position'],
    destoryed() {

    },
    methods: {
      initComponent() {
        if (!this.$map) throw new Error('map instance not initaled');
        let markerOptions = this.getOptions();
        if (markerOptions.position && markerOptions.position.length) {
          markerOptions.position = new AMap.LngLat(markerOptions.position[0], markerOptions.position[1]);
        }
        markerOptions.map = this.$map;
        this.$marker = new AMap.Marker(markerOptions);
        this.$markerOptions = markerOptions;
      }
    },
    setCenter() {

    },
    getCenter() {
      if (!this.$map) throw new Error('not ready for');
      return this.$map.getCenter();
    }
  };
</script>
