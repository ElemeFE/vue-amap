<template>
  <div class="el-vue-search-box-container"
       @keydown.up="selectTip('up')"
       @keydown.down="selectTip('down')">
    <div class="search-box-wrapper">
      <input type="text"
             v-model="keyword"
             @keyup.enter="search"
             @input="autoComplete">
      <a class="search-btn" @click="search" >搜索</a>
    </div>
    <div class="search-tips">
      <ul>
        <li v-for="(tip, index) in tips"
            @click="changeTip(tip)"
            @mouseover="selectedTip=index"
            :class="{'autocomplete-selected': index === selectedTip}">{{tip.name}}</li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
  .el-vue-search-box-container {
    position: relative;
    width: 360px;
    height: 45px;
    background: #fff;
    box-shadow: 0 2px 2px rgba(0,0,0,.15);
    border-radius: 2px 3px 3px 2px;
    z-index: 10;

    .search-box-wrapper {
      position: absolute;
      display: flex;
      align-items: center;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;

      input {
        flex: 1;
        height: 20px;
        line-height: 20px;
        letter-spacing: .5px;
        font-size: 14px;
        text-indent: 10px;
        box-sizing: border-box;
        border: none;
        outline: none;
      }

      .search-btn {
        width: 45px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        cursor: pointer;
      }
    }

    .search-tips {
      position: absolute;
      top: 100%;
      border: 1px solid #dbdbdb;
      background: #FFF;
      overflow: auto;

      ul {
        padding: 0;
        margin: 0;

        li {
          height: 40px;
          line-height: 40px;
          box-shadow: 0 1px 1px rgba(0,0,0,.1);
          padding: 0 10px;
          cursor: pointer;

          &.autocomplete-selected {
            background: #eee;
          }
        }
      }
    }
  }
</style>
<script>
import RegisterComponentMixin from '../mixins/register-component';
import {lazyAMapApiLoaderInstance} from '../services/injected-amap-api-instance';

export default {
  name: 'el-amap-search-box',
  mixins: [RegisterComponentMixin],
  props: ['searchOption', 'onSearchResult'],
  data() {
    return {
      keyword: '',
      tips: [],
      selectedTip: -1
    };
  },
  beforeCreate() {
    this._loadApiPromise = lazyAMapApiLoaderInstance.load();
    this._loadApiPromise.then(() => {
      let options = this.getOptions();
      let {mapConfig, onSearchResult} = options;
      this._autoComplete = new AMap.Autocomplete(mapConfig);
      this._placeSearch = new AMap.PlaceSearch(mapConfig);
      this._onSearchResult = onSearchResult;
    });
  },
  methods: {
    getOptions() {
      let tmpOptions = Object.assign({}, this.$options.propsData);
      if (this.$options.propsData.options) {
        delete tmpOptions.options;
        Object.assign(tmpOptions, this.$options.propsData.options);
      }
      return tmpOptions;
    },
    autoComplete() {
      if (!this.keyword) return ;
      this._autoComplete.search(this.keyword, (status, result) => {
        if (status === 'complete') {
          this.tips = result.tips;
        }
      });
    },
    search() {
      this.tips = [];
      this._placeSearch.search(this.keyword, (status, result) => {
        let {poiList: {pois}} = result;

        let LngLats = pois.map(poi => ({lat: poi.location.lat, lng: poi.location.lng}));
        this._onSearchResult(LngLats);
      });
    },
    changeTip(tip) {
      this.keyword = tip.name;
      this.search();
    },
    selectTip(type) {
      if (type === 'up' && this.selectedTip > 0) {
        this.selectedTip -= 1;
        this.keyword = this.tips[this.selectedTip].name;
      } else if (type === 'down' && this.selectedTip + 1 < this.tips.length) {
        this.selectedTip += 1;
        this.keyword = this.tips[this.selectedTip].name;
      }
    }
  }
};
</script>
