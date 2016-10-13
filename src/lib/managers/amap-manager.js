export default class AMapManager {
  constructor() {
    this.mapManager = null;
    this.context = null;
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
  getMapPromise() {
    return this._mapVM.getMap();
  }
};
