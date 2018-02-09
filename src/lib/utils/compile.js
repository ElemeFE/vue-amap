import Vue from 'vue';

export const compile = (tpl, vm) => {
  let keys = ['methods', 'computed', 'data', 'filters'];
  let props = {};

  let node = Vue.compile(tpl);
  keys.forEach(key => {
    props[key] = vm.$parent.$parent.$options[key];

    if (key === 'data' && typeof props[key] === 'function') {
      props[key] = props[key]();
    }
  });

  let vNode = new Vue({
    ...props,
    ...node
  });

  return vNode.$mount().$el;
};

export const mountedVNode = (vn, el) => {
  const instance = new Vue({render: (h) => <div>{vn}</div>});

  if (el) {
    return instance.$mount(el);
  } else {
    return instance.$mount().$el;
  }
};

export const mountedRenderFn = (renderFn, vueInstance) => {
  const instance = new Vue({render: h => renderFn(h, vueInstance)});
  return instance.$mount().$el;
};
