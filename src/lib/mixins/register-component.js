import upperCamelCase from 'uppercamelcase';
import CONST from '../utils/constant';
import { toLngLat, toPixel, toBounds } from '../utils/convert-helper';
import eventHelper from '../utils/event-helper';
export default {
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
  },

  destroyed() {
    this.unregisterEvents();
    if (!this.$amapComponent) return;
    this.$amapComponent.setMap && this.$amapComponent.setMap(null);
    this.$amapComponent.close && this.$amapComponent.close();
    this.$amapComponent.editor && this.$amapComponent.editor.close();
  },

  methods: {
    getHandlerFun(prop) {
      if (this.handlers && this.handlers[prop]) {
        return this.handlers[prop];
      }
      return this.$amapComponent[`set${upperCamelCase(prop)}`] || this.$amapComponent.setOptions;
    },

    convertProps() {
      let props = {};
      if (this.$amap) props.map = this.$amap;
      for (let key in this.$options.propsData) {
        let propsValue = this.convertSignalProp(key, this.$options.propsData[key]);
        if (propsValue === undefined) continue;
        props[key] = propsValue;
      }
      return props;
    },

    convertSignalProp(key, sourceDate) {
      if (this.converters && this.converters[key]) {
        return this.converters[key](sourceDate);
      } else if (key === 'position') {
        return toLngLat(sourceDate);
      } else if (key === 'offset') {
        return toPixel(sourceDate);
      } else if (key === 'bounds') {
        return toBounds(sourceDate);
      } else {
        return sourceDate;
      }
    },

    registerEvents() {
      if (this.$options.propsData.events) {
        for (let eventName in this.events) {
          eventHelper.addListener(this.$amapComponent, eventName, this.events[eventName]);
        }
      }
      if (this.$options.propsData.onceEvents) {
        for (let eventName in this.onceEvents) {
          eventHelper.addListenerOnce(this.$amapComponent, eventName, this.onceEvents[eventName]);
        }
      }
    },

    unregisterEvents() {
      eventHelper.clearListeners(this.$amapComponent);
    },

    setPropWatchers() {
      for (let prop in this.$options.propsData) {
        let handleFun = this.getHandlerFun(prop);
        if (!handleFun) continue;
        this.$watch(prop, nv => {
          if (prop === 'events') {
            this.unregisterEvents();
            this.registerEvents();
            return;
          }
          if (handleFun === this.$amapComponent.setOptions) {
            return handleFun.call(this.$amapComponent, {[prop]: this.convertSignalProp(prop, nv)});
          }
          handleFun.call(this.$amapComponent, this.convertSignalProp(prop, nv));
        });
      }
    },

    registerToManager() {
      let manager = this.amapManager || this.$parent.amapManager;
      if (manager && this.vid) {
        manager.setComponent(this.vid, this.$amapComponent);
      }
    },

    // some prop can not init by initial created methods
    initProps() {
      const props = ['editable', 'visible'];
      props.forEach(propstr => {
        if (this[propstr] !== undefined) {
          let handleFun = this.getHandlerFun(propstr);
          handleFun.call(this.$amapComponent, this.convertSignalProp(propstr, this[propstr]));
        }
      });
    },

    register() {
      this.initComponent && this.initComponent(this.convertProps());
      this.registerEvents();
      if (this.events && this.events.init) this.events.init(this.$amapComponent, this.$amap, this.amapManager || this.$parent.amapManager);
      this.initProps();
      this.setPropWatchers();
      this.registerToManager();
    }
  }
};
