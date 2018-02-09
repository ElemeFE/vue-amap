import registerComponent from '../mixins/register-component';

export default (options) => {
  const {
    init,
    data = () => ({}),
    converters = {},
    handlers = {},
    computed,
    methods,
    name,
    render,
    contextReady,
    template,
    mixins = [],
    props = {}
  } = options;
  const result = {
    ...options,
    props,
    data() {
      return {
        ...data(),
        converters,
        handlers
      };
    },
    mixins: [registerComponent, ...mixins],
    computed,
    methods: {
      ...methods,
      __initComponent: init,
      __contextReady: contextReady
    }
  };
  if (!template && !render) {
    result.render = () => null;
  }
  result.install = Vue => Vue.use(name, result);
  return result;
};

