
export default {
  methods: {
    /**
     * @param eventName String 事件名称
     * @param params Object{ [String]:components(默认对所有子组件广播), args: 参数 }
     */
    $broadcast(eventName, params) {
      this.$children.forEach(child => {
        // 广播全部
        if (!params.components || !params.components.length ||
            params.components.indexOf(child.$options.componentName)) {
          child.$emit(eventName, ...params.args);
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
        if (!params.components || !params.components.length ||
            params.components.indexOf(this.$parent.$options.componentName)) {
          this.$parent.$emit(eventName, ...params.args);
        }
        if (this.$parent.$broadcast) this.$parent.$broadcast(eventName, params);
      }

    }
  }
};
