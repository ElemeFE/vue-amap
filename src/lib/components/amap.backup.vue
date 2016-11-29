<template>
  <div class="el-vue-amap-container">
    <div class="el-vue-amap"></div>
    <slot></slot>
  </div>
</template>
<script>
  import guid from '../utils/guid';
  import {lazyAMapApiLoaderInstance} from '../services/injected-amap-api-instance';
  import MapEventEmitter from '../mixins/event-emitter-mixin';
  import eventHelper from '../utils/event-helper';

  export default {
    name: 'el-amap',
    props: ['center', 'zoom', 'draggEnable', 'options', 'mapEvents', 'mapManager', 'onceEvents'],
    mixins: [MapEventEmitter],
    beforeCreate() {
      this._loadApiPromise = lazyAMapApiLoaderInstance.load();
    },
    created() {
      this.componentName = 'vue-amap';
      const _events = {
        'register-component': (component) => {
          if (!this.$map) return;
          this.broadcastReady();
        }
      };
      Object.keys(_events).forEach(k => {
        this.$on(k, _events[k]);
      });

      this._resolveEventsQueue = []; // 并行等待事件
    },
    mounted() {
      if (this.mapManager) this.mapManager.setMapVM(this);
      if (this.mapEvents) {
        this._mapEvents = Object.assign({}, this.mapEvents);
      }
      this.createMap();
    },

    methods: {
      createMap() {
        let mapElement = this.$el.querySelector('.el-vue-amap');
        const elementID = this.vid || guid();
        mapElement.id = elementID;
        return this._loadApiPromise.then(() => {
          let tmpOptions = Object.assign({}, this.$options.propsData);
          if (this.$options.propsData.options) {
            delete tmpOptions.options;
            Object.assign(tmpOptions, this.$options.propsData.options);
          }
          if (tmpOptions.center.lng && tmpOptions.center.lat) tmpOptions.center = new AMap.LngLat(tmpOptions.center[0], tmpOptions.center[1]);
          delete tmpOptions.mapEvents;
          this.$mapOptions = tmpOptions;
          this.$map = new AMap.Map(elementID, tmpOptions);
          this.initEvents();
          this.broadcastReady();
          this.emitAllQueueEvents(); // 触发所有队列事件，Promise 进行 resolve
          return;
        }, () => {
          throw new Error('加载地图出错');
        });
      },
      initEvents() {
        if (!this._mapEvents) return;
        Object.keys(this._mapEvents).map(eventName => {
          if (Array.isArray(this._mapEvents[eventName])) {
            this._mapEvents[eventName].map(handler => {
              if (typeof handler !== 'function') throw new Error('event handler must be Function');
              eventHelper.addListener(this.$map, eventName, handler);
            });
          } else {
            if (typeof this._mapEvents[eventName] !== 'function') throw new Error('event handler must be Function');
            eventHelper.addListener(this.$map, eventName, this._mapEvents[eventName]);
          }
        });
      },
      broadcastReady() {
        this.$broadcast('map-ready', {
          args: [this.$map]
        });
      },
      emitAllQueueEvents() {
        while (this._resolveEventsQueue.length) {
          this.$emit(this._resolveEventsQueue.pop());
        }
      },
      getMap() {
        if (this.$map) return Promise.resolve(this.$map);
        return new Promise(resolve => {
          let eventName = `map-ready-event-${Date.now()}`;
          this._resolveEventsQueue.push(eventName);
          this.$on(eventName, () => {
            resolve(this.$map);
          });
        });
      }

    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  .el-vue-amap-container {
    width: 100%;
    height: 100%;
  }

  .el-vue-amap {
    height: 100%;
    width: 100%;
  }
</style>
