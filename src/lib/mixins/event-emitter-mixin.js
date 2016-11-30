const emitEvent = (eventName, params, context) => {
  if (params && params.args) {
    context.$emit(eventName, ...params.args);
  } else {
    context.$emit(eventName);
  }
};
export default {
  methods: {
    /**
     * @param eventName String 事件名称
     * @param params Object{ [String]:components(默认对所有子组件广播), args: 参数 }
     */
    $broadcast(eventName, params) {
      this.$children.forEach(child => {
        // 广播全部
        if (!params || !params.components || !params.components.length ||
            params.components.indexOf(child.$options.componentName !== -1)) {
          emitEvent(eventName, params, child);
        }
        if (child.$broadcast) child.$broadcast(eventName, params);
      });
    },
    /**
     * @param eventName
     * @param params Object{ [String]:components(默认对所有冒泡向上的), args: 参数 }
     */
    $dispatch(eventName, params) {
      if (this.$parent) {
        if (!params || !params.components || !params.components.length ||
            params.components.indexOf(this.$parent.$options.componentName) !== -1) {
          emitEvent(eventName, params, this.$parent);
        }
        if (this.$parent.$dispatch) this.$parent.$dispatch(eventName, params);
      }
    }
  }
};
