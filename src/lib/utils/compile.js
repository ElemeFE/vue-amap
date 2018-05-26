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

  vNode.$mount();
  return vNode;
};

export const mountedVNode = (vn) => {
  const instance = new Vue({render: (h) => h('div', vn)});
  instance.$mount();
  return instance;
};

export const mountedRenderFn = (renderFn, vueInstance) => {
  const instance = new Vue({render: h => renderFn(h, vueInstance)});
  instance.$mount();
  return instance;
};
