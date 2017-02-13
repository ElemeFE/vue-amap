import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Docs from './pages/Docs';
import docs from './docs';
import enToSnake from './utils/enToSnake';
import Home from './pages/Home';

let componentsChildren = [];
docs.forEach(components => {
  if (components.children && components.children.length) {
    components.children.forEach(c => componentsChildren.push({
      path: enToSnake(c.en),
      component: c.component
    }));
  }
});

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '/docs',
      component: Docs,
      children: componentsChildren,
      redirect: '/docs/introduction'
    },
    {
      path: '/',
      component: Home
    }
  ]
});

router.beforeEach((to, from, next) => {
  window.scroll(0, 0);
  return next();
});
export default router;
