import MarkerManager from './amap-marker-manager';
export default class AMapManager {
  constructor() {
    this._mapVM = null;
    this._context = null;
    this._markerManager = new MarkerManager();
  }
  setMarkerManager(markerManager) {
    this._markerManager = markerManager;
  }
  getMarkerManager() {
    return this._markerManager;
  }
  setContext(context) {
    this._context = context;
  }
  getContext() {
    return this._context;
  }
  setMapVM(vm) {
    this._mapVM = vm;
  }

  getMap() {
    if (!this._mapVM || !this._mapVM.$map) throw new Error('no map instance or instance not ready');
    return this._mapVM.$map;
  }

  getMapVM() {
    if (!this._mapVM) throw new Error('no map vm instance');
  }
  /**
   * @description 异步获取 map 实例
   */
  getMapPromise() {
    return this._mapVM.getMap();
  }

  /**
   * @description 封装的刷新地图
   * @param center Array[lng, lat]
   * @param zoom zoom?
   */
  setView(center, zoom) {
    if (!center || !center.length || center.length.length !== 2) {
      throw new Error('params set error');
    }
    this.getMapPromise().then(map => {
      if (zoom) map.setZoom(zoom);
      map.setCenter(new AMap.LngLat(center[0], center[1]));
    });
    return this;
  }
  /**
   * @description 设置当前地图显示范围
   * @param southWest:Array[lng:number, lat:number]
   * @param northEast:Array[lng:number, lat:number]
   * @param flag 是否同步使用 map
   */
  setBounds(southWest, northEast, flag) {
    if (!southWest || !southWest.length || southWest.length !== 2 ||
        !northEast || !northEast.length || northEast.length !== 2) {
      throw new Error('地图参数不正确');
    }
    let _southWest = new AMap.LngLat(southWest[0], southWest[1]);
    let _northEast = new AMap.LngLat(northEast[0], northEast[1]);
    let _bound = new AMap.Bounds(_southWest, _northEast);
    if (flag) {
      this.getMap().setBounds(_bound);
    } else {
      this.getMapPromise().then(map => {
        map.setBounds(_bound);
      });
    }
    return this;
  }

  /**
   * @description 设置当前地图的限制
   * @param southWest:Array[lng:number, lat:number]
   * @param northEast:Array[lng:number, lat:number]
   * @param flag 是否同步使用 map
   */
  setLimitBounds(southWest, northEast, flag) {
    if (!southWest || !southWest.length || southWest.length !== 2 ||
        !northEast || !northEast.length || northEast.length !== 2) {
      throw new Error('地图参数不正确');
    }
    let _southWest = new AMap.LngLat(southWest[0], southWest[1]);
    let _northEast = new AMap.LngLat(northEast[0], northEast[1]);
    let _bound = new AMap.Bounds(_southWest, _northEast);
    if (flag) {
      this.setLimitBounds().setBounds(_bound);
    } else {
      this.getMapPromise().then(map => {
        map.setLimitBounds(_bound);
      });
    }
    return this;
  }

  /**
   * @description 清除边界
   * @param 是否同步
   * @return this 链式调用
   */
  clearLimitBounds(flag) {
    if (flag) {
      this.getMap().clearLimitBounds();
    } else {
      this.getMapPromise().then(map => {
        this.getMap().clearLimitBounds();
      });
    }
    return this;
  }

  /**
   * @description 清除地图
   */
  clearMap() {
    return this.getMapPromise().then(map => {map.clearMap();});
  }

  /**
   * @description 加载插件
   * @param plugins:Array[plugin:String] or String
   * @return Promise<void>
   */
  plugin(plugins) {
    if (!plugins || (Array.isArray(plugins) && plugins.length)) {
      return Promise.resolve();
    }
    if (!Array.isArray(plugins)) plugins = [plugins];
    let _plugins = plugins.filter(plugin => {
      return !AMap[plugin];
    }).map(plugin => `AMap.${plugin}`);
    if (!_plugins.length) return Promise.resolve();
    return new Promise(resolve => {
      this.getMapPromise().then(map => {
        map.plugin(_plugins, () => {
          resolve();
        });
      });
    });
  }

  /**
   * @description 添加在线插件
   * @param type String
   * @param options Object
   * @return Promise<plugin>
   */
  createOnlinePlugin(type, options) {
    if (!AMap[type]) {
      return this.plugin(type).then(() => {
        return new AMap[type](options);
      });
    } else {
      return new Promise(resolve => {
        resolve(new AMap[type](options));
      });
    }
  }

  /**
   * @description 添加在线插件到实例
   * @param view 插件实例
   */
  addControl(view) {
    this.getMapPromise().then(map => {
      map.addControl(view);
    });
    return this;
  }
};
