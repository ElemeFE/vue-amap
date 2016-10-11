import upperCamelCase from 'uppercamelcase';
import {initAMapApiLoader} from './services/injected-amap-api-instance';
import AMap from './components/amap.vue';
import AMapMarker from './components/amap-marker.vue';

let components = [
  AMap,
  AMapMarker
];

let VueAMap = {
  initAMapApiLoader
};

VueAMap.install = (Vue) => {
  if (VueAMap.installed) return;
  components.map(_component =>{
    console.log('register:' + _component.name);
    Vue.component(_component.name, _component);
    VueAMap[upperCamelCase(_component.name).replace(/^El/, '')] = _component;
  });
};
export default VueAMap;

