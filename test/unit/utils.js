// import Vue from 'Vue';
import VueAMap from '../../src/lib';
// Vue.use(VueAMap);
// initAMap();

export function initAMap(options) {
  VueAMap.initAMapApiLoader({
    key: '608d75903d29ad471362f8c58c550daf',
    plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor', 'Geolocation', 'Geocoder', 'MarkerClusterer'],
    ...options
  });
}
