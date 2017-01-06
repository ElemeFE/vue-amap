export function toPixel(arr) {
  return new AMap.Pixel(arr[0], arr[1]);
}

export function toLngLat(arr) {
  return new AMap.LngLat(arr[0], arr[1]);
}

/**
 * @param arrs 二重数组 southWest, northEast
 */
export function toBounds(arrs) {
  return new AMap.Bounds(toLngLat(arrs[0]), toLngLat(arrs[1]));
}
