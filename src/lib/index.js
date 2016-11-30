// polyfills
import './polyfills';

import upperCamelCase from 'uppercamelcase';

// 初始化接口
import {initAMapApiLoader} from './services/injected-amap-api-instance';

// 组建导入
import AMap from './components/amap.vue';
import AMapMarker from './components/amap-marker.vue';
import AMapSearchBox from './components/amap-search-box.vue';
// managers
import AMapManager from './managers/amap-manager';

let components = [
  AMap,
  AMapMarker,
  AMapSearchBox
];

let VueAMap = {
  initAMapApiLoader,
  AMapManager
};

VueAMap.install = (Vue) => {
  if (VueAMap.installed) return;
  Vue.config.optionMergeStrategies.deferredReady = Vue.config.optionMergeStrategies.created;
  components.map(_component => {
    console.log('register:' + _component.name);
    Vue.component(_component.name, _component);
    VueAMap[upperCamelCase(_component.name).replace(/^El/, '')] = _component;
  });
};
export default VueAMap;
