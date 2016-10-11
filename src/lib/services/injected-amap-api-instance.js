let lazyAMapApiLoaderInstance = null;
import AMapAPILoader from './lazy-amap-api-loader';
export function initAMapApiLoader(config) {
  lazyAMapApiLoaderInstance = new AMapAPILoader(config);
  lazyAMapApiLoaderInstance.load();
}
export { lazyAMapApiLoaderInstance };
