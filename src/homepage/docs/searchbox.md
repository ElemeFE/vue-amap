# Search-Box

---

## API

| 参数 | 说明 | 类型 |
| ----- | ---- | --- |
| searchOption | 搜索条件 | Object |
| onSearchResult) | 搜索回调函数 | function[ {lng, lat} ] |

### searchOption
| 属性 | 说明 | 类型 | 默认值 |
| --- | ---- | --- | ----- |
| city | 城市名 | String | 全国 |
| citylimit | 是否限制城市内搜索 | Boolean | false |

### onSearchResult
| 参数 | 说明 | 类型 |
| ---- | --- | ---- |
| pois | 经纬度对象数组 | Object |

### 事件
| 事件名 | 参数 | 说明 |
| ---- | --- | ---- |
| init | Object | 参数包含 { autoComplete,  placeSearch} ，分别为自动补全以及地址搜索插件的高德实例 |

## 使用说明
``` html
<template>
  <div class="amap-page-container">
    <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" :events="events"></el-amap-search-box>
    <el-amap :vid="'amap-vue'" :center="mapCenter" :zoom="12">
      <el-amap-marker v-for="marker in markers" :position="marker"></el-amap-marker>
    </el-amap>
  </div>
</template>
<script>
  export default {
    name: 'search-box-page',
    data: function() {
      return {
        vid: 'amap-vue-2',
        markers: [
          [121.59996, 31.197646],
          [121.40018, 31.197622],
          [121.69991, 31.207649]
        ],
        searchOption: {
          city: '上海',
          citylimit: true
        },
        mapCenter: [121.59996, 31.197646],
        events: {
          init(o) {
            console.log(o);
          }
        }
      };
    },
    methods: {
      addMarker: function() {
        let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
        let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
        this.markers.push([lng, lat]);
      },
      onSearchResult(pois) {
        let latSum = 0;
        let lngSum = 0;
        if (pois.length > 0) {
          pois.forEach(poi => {
            let {lng, lat} = poi;
            lngSum += lng;
            latSum += lat;
            this.markers.push([poi.lng, poi.lat]);
          });
          let center = {
            lng: lngSum / pois.length,
            lat: latSum / pois.length
          };
          this.mapCenter = [center.lng, center.lat];
        }
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  .amap-page-container {
    margin: auto;
  }

  .amap-page-container .el-vue-amap {
    height: 400px;
  }

  .search-box {
    position: relative;
    top: 65px;
    left: 20px;
  }
</style>

```


<searchbox></searchbox>
<script>
import searchbox from 'demos/searchbox.vue';
export default {
  components: {
    searchbox
  }
}
</script>
