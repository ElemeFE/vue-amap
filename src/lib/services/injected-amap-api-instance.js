let lazyAMapApiLoaderInstance = null;
import AMapAPILoader from './lazy-amap-api-loader';
export function initAMapApiLoader(config) {
  if (lazyAMapApiLoaderInstance) throw new Error('You has already initial your lazyAMapApiLoaderInstance, just import it');
  lazyAMapApiLoaderInstance = new AMapAPILoader(config);
  lazyAMapApiLoaderInstance.load();
}
export { lazyAMapApiLoaderInstance };
