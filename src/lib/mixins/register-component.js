import upperCamelCase from 'uppercamelcase';
import CONST from '../utils/constant';
export default {
  methods: {
    getHandlerFun(prop) {
      if (this.handlers && this.handlers[prop]) {
        return this.handlers[prop];
      }
      let fun = this.$amapComponent[`set${upperCamelCase(prop)}`];
      if (fun) return fun;
    },

    convertProps() {
      let props = {};
      for (let key in this.$options.propsData) {
        if (this.converts && this.converts[key]) {
          props[key] = this.converts[key].apply(this);
        } else {
          props[key] = this.$options.propsData[key];
        }
        return props;
      }
    },

    register() {
      let converts = this.converts;
      this.initComponent();
      for (let prop in this.$options.propsData) {
        let handleFun = this.getHandlerFun(prop);
        if (!handleFun) continue;
        this.$watch(prop, nv => {
          let propArg = nv;
          if (converts && converts[prop]) propArg = this.converts[prop].apply();
          handleFun.apply(this.$amapComponent, propArg);
        });
      }
    }
  },

  mounted() {
    this.$amap = this.$amap || this.$parent.$amap;
    if (this.$amap) {
      this.register();
    } else {
      this.$on(CONST.AMAP_READY_EVENT, map => {
        this.$amap = map;
        this.register();
      });
    }
  }
};
