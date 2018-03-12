<template></template>
<script>
import registerMixin from '../mixins/register-component';
const TAG = 'el-amap-text';

export default {
  name: TAG,
  mixins: [registerMixin],
  props: {
    vid: {
      type: String,
      default: ''
    },

    text: {
      type: String,
      default: ''
    },

    textAlign: {
      type: String,
      default: ''
    },

    verticalAlign: {
      type: String,
      default: ''
    },

    position: {
      type: Array,
      default() {
        return [0, 0];
      },
      $type: 'LngLat'
    },

    offset: {
      type: Array,
      default() {
        return [0, 0];
      },
      $type: 'Pixel'
    },

    topWhenClick: {
      type: Boolean,
      default() {
        return false;
      }
    },

    bubble: {
      type: Boolean,
      default() {
        return false;
      }
    },

    draggable: {
      type: Boolean,
      default() {
        return false;
      }
    },

    raiseOnDrag: {
      type: Boolean,
      default() {
        return false;
      }
    },

    cursor: {
      type: String,
      default() {
        return '';
      }
    },

    visible: {
      type: Boolean,
      default() {
        return true;
      }
    },

    zIndex: {
      type: Number,
      default() {
        return 100;
      }
    },

    angle: {
      type: Number,
      default() {
        return 0;
      }
    },

    autoRotation: {
      type: Boolean,
      default() {
        return false;
      }
    },

    animation: {
      type: String,
      default() {
        return '“AMAP_ANIMATION_NONE”';
      }
    },

    shadow: {
      type: Object,
      default() {
        return {};
      },
      $type: 'Icon'
    },

    title: {
      type: String,
      default() {
        return '';
      }
    },

    clickable: {
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
      this.$amapComponent = new AMap.Text(options);
    }
  }
};
</script>
