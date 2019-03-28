import { patchIOS11Geo } from '../utils/polyfill';
;
const DEFAULT_AMP_CONFIG = {
  key: null,
  v: '1.4.4',
  protocol: 'https',
  hostAndPath: 'webapi.amap.com/maps',
  plugin: [],
  callback: 'amapInitComponent'
};

export default class AMapAPILoader {
  /**
   * @param config required 初始化参数
   */
  constructor(config) {
    this._config = {
      ...DEFAULT_AMP_CONFIG,
      ...config
    };
    this._document = document;
    this._window = window;
    this._scriptLoaded = false;
    this._queueEvents = [ patchIOS11Geo];
  }

  load() {
    if (this._window.AMap && this._window.AMap.Map) {
      return this.loadUIAMap();
    }

    if (this._scriptLoadingPromise) return this._scriptLoadingPromise;
    const script = this._document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = this._getScriptSrc();

    const UIPromise = this._config.uiVersion ? this.loadUIAMap() : null;

    this._scriptLoadingPromise = new Promise((resolve, reject) => {
      this._window['amapInitComponent'] = () => {
        while (this._queueEvents.length) {
          this._queueEvents.pop().apply();
        }
        if (UIPromise) {
          UIPromise.then(() => {
            window.initAMapUI();
            setTimeout(resolve);
          });
        } else {
          return resolve();
        }
      };
      script.onerror = error => reject(error);
    });
    this._document.head.appendChild(script);
    return this._scriptLoadingPromise;
  }

  loadUIAMap() {
    if (!this._config.uiVersion || window.AMapUI) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const UIScript = document.createElement('script');
      const [versionMain, versionSub, versionDetail] = this._config.uiVersion.split('.');
      if (versionMain === undefined || versionSub === undefined) {
        console.error('amap ui version is not correct, please check! version: ', this._config.uiVersion);
        return;
      }
      let src = `${this._config.protocol}://webapi.amap.com/ui/${versionMain}.${versionSub}/main-async.js`;
      if (versionDetail) src += `?v=${versionMain}.${versionSub}.${versionDetail}`;
      UIScript.src = src;
      UIScript.type = 'text/javascript';
      UIScript.async = true;
      this._document.head.appendChild(UIScript);
      UIScript.onload = () => {
        setTimeout(resolve, 0);
      };
      UIScript.onerror = () => reject();
    });
  }

  _getScriptSrc() {
    // amap plugin prefix reg
    const amap_prefix_reg = /^AMap./;

    const config = this._config;
    const paramKeys = ['v', 'key', 'plugin', 'callback'];

    // check 'AMap.' prefix
    if (config.plugin && config.plugin.length > 0) {
      // push default types
      config.plugin.push('Autocomplete', 'PlaceSearch', 'PolyEditor', 'CircleEditor');

      const plugins = [];

      // fixed plugin name compatibility.
      config.plugin.forEach(item => {
        const prefixName = (amap_prefix_reg.test(item)) ? item : 'AMap.' + item;
        const pureName = prefixName.replace(amap_prefix_reg, '');

        plugins.push(prefixName, pureName);
      });

      config.plugin = plugins;
    }

    const params = Object.keys(config)
                         .filter(k => ~paramKeys.indexOf(k))
                         .filter(k => config[k] != null)
                         .filter(k => {
                           return !Array.isArray(config[k]) ||
                                (Array.isArray(config[k]) && config[k].length > 0);
                         })
                         .map(k => {
                           let v = config[k];
                           if (Array.isArray(v)) return { key: k, value: v.join(',')};
                           return {key: k, value: v};
                         })
                         .map(entry => `${entry.key}=${entry.value}`)
                         .join('&');
    return `${this._config.protocol}://${this._config.hostAndPath}?${params}`;
  }

}
