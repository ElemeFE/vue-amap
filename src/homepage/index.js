import Vue from 'vue';
import router from './router';
// import AMap from 'vue-amap';
// Vue.use(AMap);
// AMap.initAMapApiLoader({
//   key: '28966b6be8e4fa0e4c4f4c9b4bf8d3ce',
//   plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor']
// });
// import App from './App.vue';

const app = new Vue({  // eslint-disable-line
  router,
  render: h => ''
}).$mount('#app1');
