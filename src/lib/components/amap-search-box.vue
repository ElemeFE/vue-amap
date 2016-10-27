<template>
  <div class="el-vue-search-box-container">
    <input type="text" v-model="keyword" @input="search">
    <div v-for="tip in tips">{{tip.name}}</div>
  </div>
</template>
<script>
import RegisterComponentMixin from '../mixins/register-component-mixin';
import {lazyAMapApiLoaderInstance} from '../services/injected-amap-api-instance';

export default {
  name: 'el-amap-search-box',
  mixins: [RegisterComponentMixin],
  props: ['city', 'type', 'dataType', 'citylimit', 'input'],
  data() {
    return {
      keyword: '',
      tips: []
    };
  },
  beforeCreate() {
    this._loadApiPromise = lazyAMapApiLoaderInstance.load();
    this._loadApiPromise.then(() => {
      let options = this.getOptions();
      this.$searchOptions = options;
      this.$auto = new AMap.Autocomplete(options);
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
    search() {
      this.$auto.search(this.keyword, (status, result) => {
        if (status === 'complete') {
          this.tips = result.tips;
        }
      });
    }
  }
};
</script>
