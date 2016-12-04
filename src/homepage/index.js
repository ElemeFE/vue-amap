import Vue from 'vue';
import router from './router';
import AMap from '../lib';
import './assets/scripts/meteor.js';
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: '28966b6be8e4fa0e4c4f4c9b4bf8d3ce',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});
import App from './App.vue';

const app = new Vue({  // eslint-disable-line
  router,
  render: h => h(App)
}).$mount('#app');
