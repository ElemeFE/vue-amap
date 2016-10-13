const DEFAULT_AMP_CONFIG = {
  key: null,
  v: 1.3,
  protocol: 'https',
  hostAndPath: 'webapi.amap.com/maps',
  plugin: []
};
/**
 *
 */

export default class AMapAPILoader {
  /**
   * @param required config  初始化参数
   */
  constructor(config) {
    this._config = Object.assign({}, DEFAULT_AMP_CONFIG, config);
    this._document = document;
    this._window = window;
    this._scriptLoaded = false;
  }

  load() {
    if (this._scriptLoaded || this._window.AMap) {
      return new Promise(_ => _());
    }

    const script = this._document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = this._getScriptSrc();

    this._scriptLoadingPromise = new Promise((resolve, reject) => {
      script.onload = () => {
        this._scriptLoaded = true;
        resolve();
      };
      // this._window[callbackName] = () => resolve();
      script.onerror = error => reject(error);
    });
    this._document.head.appendChild(script);
    return this._scriptLoadingPromise;
  }

  _getScriptSrc() {
    const queryParams = this._config;
    const paramKeys = ['v', 'key', 'plugin'];
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
