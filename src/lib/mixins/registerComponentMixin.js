export default {
  mounted() {
    console.log('mounted');
    this.$map = null;
    this.$on('map-ready', map => {
      console.log(this._events);
      this.$map = map;
      this.initComponent();
    });
  },
  methods: {
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
