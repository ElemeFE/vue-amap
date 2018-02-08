import registerComponent from '../mixins/register-component';

export default ({
  props = {},
  init,
  data = () => ({}),
  converters = {},
  handlers = {},
  computed,
  methods,
  name,
  render,
  created,
  mounted,
  updated,
  destroyed
}) => {
  const result = {
    props,
    data() {
      return {
        ...data(),
        converters,
        handlers
      };
    },
    mixins: [registerComponent ],
    name,
    created,
    mounted,
    updated,
    destroyed,
    render() {
      return render ? render.call(null, result) : null;
    },
    computed,
    methods: {
      ...methods,
      __initComponent: init
    }
  };
  result.install = Vue => Vue.use(name, result);
  return result;
};

