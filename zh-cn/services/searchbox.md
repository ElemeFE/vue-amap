# 搜索框

## 基础示例

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="amap-page-container">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo">
        <el-amap-marker v-for="marker in markers" :position="marker" ></el-amap-marker>
      </el-amap>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }

    .search-box {
      position: absolute;
      top: 25px;
      left: 20px;
    }

    .amap-page-container {
      position: relative;
    }
  </style>

  <script>
    module.exports = {
      data: function() {
        return {
          markers: [
            [121.59996, 31.197646],
            [121.40018, 31.197622],
            [121.69991, 31.207649]
          ],
          searchOption: {
            city: '上海',
            citylimit: true
          },
          mapCenter: [121.59996, 31.197646]
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

</script>

## API

| 参数 | 说明 | 类型 |
| ----- | ---- | --- |
| searchOption | 搜索条件 | Object |
| onSearchResult) | 搜索回调函数 | function[ {lng, lat} ] |
| default | 默认值 | String
## searchOption
| 属性 | 说明 | 类型 | 默认值 |
| --- | ---- | --- | ----- |
| city | 城市名 | String | 全国 |
| citylimit | 是否限制城市内搜索 | Boolean | false |

## onSearchResult
| 参数 | 说明 | 类型 |
| ---- | --- | ---- |
| pois | 经纬度对象数组 | Object |

## 事件
| 事件名 | 参数 | 说明 |
| ---- | --- | ---- |
| init | Object | 参数包含 { autoComplete,  placeSearch} ，分别为自动补全以及地址搜索插件的高德实例 |
