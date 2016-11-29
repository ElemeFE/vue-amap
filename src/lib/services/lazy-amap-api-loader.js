const DEFAULT_AMP_CONFIG = {
  key: null,
  v: 1.3,
  protocol: 'https',
  hostAndPath: 'webapi.amap.com/maps',
  plugin: [],
  callback: 'amapInitComponent'
};
/**
 *
 */

export default class AMapAPILoader {
  /**
   * @param config required 初始化参数
   */
  constructor(config) {
    this._config = Object.assign({}, DEFAULT_AMP_CONFIG, config);
    this._document = document;
    this._window = window;
    this._scriptLoaded = false;
    this._queueEvents = [];
  }

  load() {
    if (this._window.AMap) {
      return Promise.resolve();
    }

    // if (this._loading) {
    //   return new Promise(resolve => {
    //     this._queueEvents.push(() => resolve());
    //   });
    // }

    // this._loading = true;
    if (this._scriptLoadingPromise) return this._scriptLoadingPromise;
    const script = this._document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = this._getScriptSrc();

    this._scriptLoadingPromise = new Promise((resolve, reject) => {
      this._window['amapInitComponent'] = () => {
        this._queueEvents.forEach(event => event());
        while (this._queueEvents.length) {
          this._queueEvents.pop().apply();
        }
        return resolve();
      };
      script.onerror = error => reject(error);
    });
    this._document.head.appendChild(script);
    return this._scriptLoadingPromise;
  }

  _getScriptSrc() {
    const queryParams = this._config;
    const paramKeys = ['v', 'key', 'plugin', 'callback'];
    const params = Object.keys(queryParams)
                         .filter(k => paramKeys.indexOf(k) !== -1)
                         .filter(k => queryParams[k] != null)
                         .filter(k => {
                           return !Array.isArray(queryParams[k]) ||
                                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
                         })
                         .map(k => {
                           let v = queryParams[k];
                           if (Array.isArray(v)) return { key: k, value: v.join(',')};
                           return {key: k, value: v};
                         })
                         .map(entry => `${entry.key}=${entry.value}`)
                         .join('&');
    return `${this._config.protocol}://${this._config.hostAndPath}?${params}`;
  }

}
