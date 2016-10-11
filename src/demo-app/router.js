import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import AMapPage from './pages/amap.vue';
export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {path: '/amap', component: AMapPage},
    {path: '', redirect: '/amap' }
  ]
});
