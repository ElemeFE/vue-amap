<template></template>
<script>
import registerMixin from '../mixins/register-component';
const TAG = 'el-amap-ellipse';

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

    center: {
      type: Array,
      $type: 'LngLat'
    },

    radius: {
      type: Array,
      default() {
        return [1000, 1000];
      }
    },

    bubble: {
      type: Boolean
    },

    cursor: {
      type: String
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

    strokeStyle: {
      type: String
    },

    extData: {
      type: Object,
      default() {
        return {};
      }
    },

    visible: {
      type: Boolean,
      default: true
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
      this.$amapComponent = new AMap.Ellipse(options);
    }
  }
};
</script>