# Search-Box

---

## API

| 参数 | 说明 | 类型 |
| --- | --- | ---- |
| searchOption | 搜索条件 | Object |
| onSearchResult | 搜索回调函数 | function |

### searchOption
| 属性 | 说明 | 类型 | 默认值 |
| --- | ---- | --- | ----- |
| city | 城市名 | String | 全国 |
| citylimit | 是否限制城市内搜索 | Boolean | false |

### onSearchResult
| 参数 | 说明 | 类型 |
| --- | --- | ---- |
| pois | 经纬度对象数组 | Object |

## 使用说明
``` html
<el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
<el-amap>
  <el-amap-marker v-for="marker in markers" :position="marker"></el-amap-marker>
</el-amap>
```

``` javascript
onSearchResult(pois) {
  let latSum = 0;
  let lngSum = 0;
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
  this.amapManager.getMap().setZoomAndCenter(17, new AMap.LngLat(center.lng, center.lat));
}
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
