import Vue from 'vue';
import router from './router';
import VueAMap from '../lib';
Vue.use(VueAMap);
import App from './App.vue';
VueAMap.initAMapApiLoader({
  key: '28966b6be8e4fa0e4c4f4c9b4bf8d3ce',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.Autocomplete']
});
const app = new Vue({  // eslint-disable-line
  router,
  render: h => h(App)
}).$mount('#app');
