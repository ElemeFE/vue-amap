// polyfills
import './polyfills';

import upperCamelCase from 'uppercamelcase';

// 初始化接口
import {initAMapApiLoader} from './services/injected-amap-api-instance';

// 组建导入
import AMap from './components/amap.vue';
import AMapMarker from './components/amap-marker.vue';
import AMapSearchBox from './components/amap-search-box.vue';
import AMapCircle from './components/amap-circle.vue';
import AMapGroupImage from './components/amap-ground-image.vue';
import AMapInfoWindow from './components/amap-info-window.vue';
import AMapPolyline from './components/amap-polyline.vue';
import AMapPolygon from './components/amap-polygon.vue';

// managers
import AMapManager from './managers/amap-manager';
import createCustomComponent from './adapter/custom-adapter';

let components = [
  AMap,
  AMapMarker,
  AMapSearchBox,
  AMapCircle,
  AMapGroupImage,
  AMapInfoWindow,
  AMapPolygon,
  AMapPolyline
];

let VueAMap = {
  initAMapApiLoader,
  AMapManager
};

VueAMap.install = (Vue) => {
  if (VueAMap.installed) return;
  Vue.config.optionMergeStrategies.deferredReady = Vue.config.optionMergeStrategies.created;
  components.map(_component => {
    Vue.component(_component.name, _component);
    VueAMap[upperCamelCase(_component.name).replace(/^El/, '')] = _component;
  });
};

const install = function(Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;
  VueAMap.install(Vue);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
  // window.VueAmap = VueAMap;
};

export default VueAMap;

export {
  AMapManager,
  initAMapApiLoader,
  createCustomComponent
};
export { lazyAMapApiLoaderInstance } from './services/injected-amap-api-instance';
