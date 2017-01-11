export default class AMapManager {
  constructor() {
    this._componentMap = new Map();
  }
  setMap(map) {
    this._map = map;
  }
  getMap() {
    return this._map;
  }
  setComponent(id, component) {
    this._componentMap.set(id, component);
  }
  getComponent(id) {
    return this._componentMap.get(id);
  }
  getChildInstance(id) {
    return this.getComponent(id);
  }
  removeComponent(id) {
    this._componentMap.delete(id);
  }
};
