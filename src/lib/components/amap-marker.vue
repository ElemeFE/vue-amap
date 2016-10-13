<template></template>
<script>
  import MapEventEmitter from  '../mixins/event-emitter-mixin';
  import RegisterComponentMixin from '../mixins/register-component-mixin';

  export default  {
    name: 'el-amap-marker',
    mixins: [RegisterComponentMixin],
    props: ['lng', 'lat', 'draggable', 'options'],
    methods: {
      initComponent() {
        if(!this.$map)  throw new error('map instance not initaled');
        let markerOptions = this.getOptions();
        if (markerOptions.lng && markerOptions.lat) {
          markerOptions.position = new AMap.LngLat(markerOptions.lng, markerOptions.lat);
        }
        delete markerOptions.lng;
        delete markerOptions.lat;
        markerOptions.map = this.$map;
        this.$marker = new AMap.Marker(markerOptions);
        this.$markerOptions = markerOptions;
      }
    },
    setCenter() {

    },
    getCenter() {
      if(!this.$map) throw new Error('not ready for');
      return this.$map
    }
  };
</script>
