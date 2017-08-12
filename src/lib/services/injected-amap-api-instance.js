let lazyAMapApiLoaderInstance = null;
import AMapAPILoader from './lazy-amap-api-loader';
import Vue from 'vue';
export const initAMapApiLoader = (config) => {
  if (Vue.prototype.$isServer) return;
  // if (lazyAMapApiLoaderInstance) throw new Error('You has already initial your lazyAMapApiLoaderInstance, just import it');
  if (lazyAMapApiLoaderInstance) return;
  if (!lazyAMapApiLoaderInstance) lazyAMapApiLoaderInstance = new AMapAPILoader(config);
  lazyAMapApiLoaderInstance.load();
};
export { lazyAMapApiLoaderInstance };
