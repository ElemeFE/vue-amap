<template></template>
<script>
  import MapEventEmitter from  '../mixins/eventEmitterMixin';
  import RegisterComponentMixin from '../mixins/registerComponentMixin';


  export default  {
    name: 'el-amap-marker',
    mixins: [RegisterComponentMixin, MapEventEmitter],
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
    }
  };
</script>
