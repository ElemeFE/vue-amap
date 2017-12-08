import RemoGeoLocation from '../patch/remote';

/**
 * assign pollyfill
 * @param  {Object} target
 * @param  {Object} varArgs
 * @return
 */
export function assign(target, varArgs) {
  if (typeof Object.assign !== 'function') {
    'use strict';
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) { // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  } else {
    return Object.assign.apply(Object, arguments);
  }
};

// http://a.amap.com/jsapi_demos/static/remogeo/remo.html
export function patchIOS11Geo() {
  // ios环境切换到使用远程https定位
  if (AMap.UA.ios && document.location.protocol !== 'https:') {
    // 使用远程定位，见 remogeo.js
    var remoGeo = new RemoGeoLocation();
    // 替换方法
    navigator.geolocation.getCurrentPosition = function() {
      return remoGeo.getCurrentPosition.apply(remoGeo, arguments);
    };
    // 替换方法
    navigator.geolocation.watchPosition = function() {
      return remoGeo.watchPosition.apply(remoGeo, arguments);
    };
  }
}
