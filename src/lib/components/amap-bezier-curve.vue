<template></template>
<script>
import registerMixin from '../mixins/register-component';
const TAG = 'el-amap-bezier-curve';

export default {
  name: TAG,
  mixins: [registerMixin],
  props: {
    vid: {
      type: String
    },

    path: {
      type: Array
    },

    strokeColor: {
      type: String
    },

    strokeOpacity: {
      type: Number
    },

    strokeWeight: {
      type: Number,
      default() {
        return 1;
      }
    },

    strokeStyle: {
      type: String
    },

    strokeDasharray: {
      type: Array
    },

    zIndex: {
      type: Number
    },

    showDir: {
      type: Boolean
    },

    bubble: {
      type: Boolean
    },

    cursor: {
      type: String
    },

    outlineColor: {
      type: Boolean
    },

    isOutline: {
      type: Boolean
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
      this.$amapComponent = new AMap.BezierCurve(options);
    }
  }
};
</script>
