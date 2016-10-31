import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Docs from './pages/Docs';
import docs from './docs';
import enToSnake from './utils/enToSnake';

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '/docs',
      component: Docs,
      children: docs.map(({en, component}) => ({
        path: enToSnake(en),
        component
      }))
    },
    {
      path: '/',
      redirect: '/docs/introduction'
    },
    {
      path: '/docs/',
      redirect: '/docs/introduction'
    }
  ]
});
