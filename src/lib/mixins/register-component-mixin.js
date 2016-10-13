import MapEventEmitter from './event-emitter-mixin';

export default {
  mixins: [MapEventEmitter],
  created() {
    this.$map = null;
    this.$on('map-ready', map => {
      if (this.$map) return;
      this.$map = map;
      this.initComponent();
    });
  },
  mounted() {
    this.dispatchRigister();
  },
  methods: {
    dispatchRigister() {
      this.$dispatch('register-component', {
        args: [this]
      });
    },
    getOptions() {
      let tmpOptions = Object.assign({}, this.$options.propsData);
      if (this.$options.propsData.options) {
        delete tmpOptions.options;
        Object.assign(tmpOptions, this.$options.propsData.options);
      }
      return tmpOptions;
    }
  }
};
