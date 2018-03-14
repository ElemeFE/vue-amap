<template></template>
<script>
import registerMixin from '../mixins/register-component';
const TAG = 'el-amap-circle-marker';

export default {
  name: TAG,

  mixins: [registerMixin],

  props: {
    vid: {
      type: String
    },

    zIndex: {
      type: Number
    },

    visible: {
      type: Boolean,
      default: true
    },

    center: {
      type: Array,
      $type: 'LngLat'
    },

    bubble: {
      type: Boolean
    },

    radius: {
      type: Number
    },

    strokeColor: {
      type: String
    },

    strokeOpacity: {
      type: Number
    },

    strokeWeight: {
      type: Number
    },

    fillColor: {
      type: String
    },

    fillOpacity: {
      type: Number
    },

    extData: {
      type: Object
    },

    events: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      converters: {
      },

      handlers: {
        zIndex(index) {
          this.setzIndex(index);
        },

        visible(flag) {
          flag === false ? this.hide() : this.show();
        }
      },

      amapTagName: TAG
    };
  },

  methods: {
    __initComponent(options) {
      this.$amapComponent = new AMap.CircleMarker(options);
    }
  }
};
</script>