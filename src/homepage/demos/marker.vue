<template>
    <div id="demoComponent" class="demo-component">
        <el-amap vid="amap" :zoom="zoom" :center="center">
          <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
        </el-amap>
        <button type="button" name="button" v-on:click="toggleVisible">toggle show first marker</button>
        <button type="button" name="button" v-on:click="changePosition">Change Position</button>
        <button type="button" name="button" v-on:click="chnageDraggle">chnage Draggle</button>
        <button type="button" name="button" v-on:click="addMarker">add Marker</button>
        <button type="button" name="button" v-on:click="removeMarker">remove Marker</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      zoom: 14,
      center: [121.5273285, 31.21515044],
      markers: [
        {
          position: [121.5273285, 31.21515044],
          events: {
            click: () => {
              alert('click marker');
              console.log(this);
            },
            dragend: (e) => {
              console.log(e);
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
            }
          },
          visible: true,
          draggable: false
        }
      ]
    };
  },
  methods: {
    changePosition() {
      let position = this.markers[0].position;
      this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
    },
    chnageDraggle() {
      let draggable = this.markers[0].draggable;
      this.markers[0].draggable = !draggable;
    },
    toggleVisible() {
      let visableVar = this.markers[0].visible;
      this.markers[0].visible = !visableVar;
    },
    addMarker() {
      let marker = {
        position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
      };
      this.markers.push(marker);
    },
    removeMarker() {
      if (!this.markers.length) return;
      this.markers.splice(this.markers.length - 1, 1);
    }
  }
};
</script>
