import Vue from 'vue';
import { AMapManager } from 'vue-amap';

describe('AMap:amap', () => {
  it('should init amap instance', (done) => {
    (new Vue({
      template: `
      <div :style="{height:'100px'}">
        <el-amap :events="events">
        </el-amap>
      </div>
      `,
      data() {
        let center = [116.397428, 39.90923];
        return {
          center,
          zoom: 12,
          events: {
            init: (instance) => {
              expect(instance instanceof window.AMap.Map).to.true;
              console.log(instance.getCenter());
              done();
            }
          }
        };
      }
    })).$mount();
  });

  it('should init plugin', done => {
    (new Vue({
      template: `
        <el-amap :plugin="plugin"></el-amap>
      `,
      data() {
        return {
          plugin: [{
            pName: 'MapType',
            defaultType: 0,
            events: {
              init(pluginInstance) {
                expect(pluginInstance instanceof AMap.MapType).to.true;
                done();
              }
            }
          }]
        };
      }
    })).$mount();
  });

  it('should get map instance from manager', done => {
    const amapManager = new AMapManager();
    (new Vue({
      template: `<el-amap
      :amap-manager="amapManager"
      vid="vid"
      :events="events"
    ></el-amap>`,
      data() {
        return {
          amapManager,
          vid: 'vid',
          events: {
            init: (instance) => {
              expect(amapManager.getMap() === instance).to.true;
              done();
            }
          }
        };
      }
    })).$mount();
  });
});
