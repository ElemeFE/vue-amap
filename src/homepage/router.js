import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Docs from './pages/Docs';
import docs from './docs';
import enToSnake from './utils/enToSnake';
import Home from './pages/Home.md';

let componentsChildren = [];
docs.map(components => {
  if (components.children && components.children.length) {
    components.children.forEach(c => componentsChildren.push({
      path: enToSnake(c.en),
      component: c.component
    }));
  }
});

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '/docs',
      component: Docs,
      children: componentsChildren
    },
    {
      path: '/',
      component: Home
    },
    {
      path: '/docs/',
      redirect: '/docs/introduction'
    }
  ]
});
