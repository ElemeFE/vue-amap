import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Docs from './pages/Docs';
import docs from './docs';
import enToSnake from './utils/enToSnake';
import Home from './pages/Home';

let componentChildren = docs.reduce((componentChildrenSoFar, component) =>
  component.children
    ? componentChildrenSoFar.concat(component.children.map(child => {
      return {
        path: enToSnake(child.en),
        component: child.component
      };
    }))
    : componentChildrenSoFar, []);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '/docs',
      component: Docs,
      children: componentChildren,
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
