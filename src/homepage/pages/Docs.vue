<template lang="html">
  <div class="docs-page">
    <div class="nav">
      <router-link v-for="doc in docs" :key="doc.en" class="anchor" :class="{selected: $route.path === `/docs/${enToSnake(doc.en)}`}" :to="`/docs/${enToSnake(doc.en)}`">
        {{doc.zh}}
      </router-link>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="babel">
  import docs from '../docs';
  import enToSnake from '../utils/enToSnake';
  export default {
    name: 'docs',
    data() {
      return {
        docs
      };
    },
    methods: {
      enToSnake
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  .docs-page {
    height: 100%;
    > div {
      float: left;
      height: 100%;
      padding: 40px 20px;
      overflow-y: scroll;
      &.nav {
        font-size: 14px;
        font-family: sans-serif;
        padding-top: 35px;
        padding-right: 0;
        width: 20%;
        background-color: #eee;
        .anchor {
          display: block;
          padding: 10px 0;
          cursor: pointer;
          transition: color .2s;
          border-right: 2px solid transparent;
          color: inherit;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          &:hover {
            color: #42b983;
          }
          &.selected {
            color: #42b983;
            border-right-color: #42b983;
          }
        }
      }
      &.main {
        width: 80%;
        a {
          margin: 0 3px;
        }
        h1 {
          font-size: 28px;
          font-weight: normal;
          margin: 0 0 1.2em 0;
        }
        h2 {
          font-size: 18px;
          font-weight: normal;
          margin: 1.2em 0;
        }
        hr {
          border: 0;
          border-bottom: 1px solid #eee;
        }
        p {
          font-size: 14px;
          color: #666;
        }
        code {
          background-color: #eee;
          padding: 2px;
        }
        pre {
          background-color: #f8f8f8;
          padding: 20px;
          margin: 1.2em 0;
          font-size: 14px;
          code {
            background-color: inherit;
            padding: 0;
          }
        }
      }
      a {
        text-decoration: none;
        color: #42b983;
      }
    }
  }
</style>
