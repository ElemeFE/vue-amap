<template lang="html">
  <div class="docs-page">
    <a href="https://github.com/elemefe/vue-amap">
      <img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67"
        alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png">
    </a>
    <div class="nav">
      <router-link to="/" class="back">返回</router-link>
      <section v-for="chapter in docs" class="chapters">
        <header class="chapter-title">
          {{chapter.zh}}
        </header>
        <router-link v-for="doc in chapter.children" :key="doc.en" class="anchor" :class="{selected: $route.path === `/docs/${enToSnake(doc.en)}`}"
          :to="`/docs/${enToSnake(doc.en)}`">
          {{doc.zh}}
        </router-link>
      </section>
    </div>
    <div class="main">
      <div class="inner">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
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
  @keyframes menu-present {
    from {
      left: -15%
    }
    to {
      left: 0
    }
  }

  .docs-page {
    height: 100%;
    #demoComponent {
      height: 400px;
    }
    >div {
      float: left;
      height: 100%;

      .back {
        font-size: 14px;
        display: block;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: #f3f3f3;
        padding: 6px;
        box-sizing: border-box;
        text-align: center;
      }

      &.nav {
        font-size: 14px;
        font-family: sans-serif;
        padding-top: 35px;
        padding-right: 0;
        background-color: #f9f9f9;
        animation-name: menu-present;
        animation-duration: 0.6s;
        animation-delay: 0.4s;
        animation-timing-function: leaner;
        animation-fill-mode: forwards;
        position: fixed;
        left: -15%;
        top: 0;
        width: 15%;
        overflow: auto;

        .chapters {
          margin: 10px 0 30px 35px;
          .chapter-title {
            border-bottom: 1px #d2d2d2 solid;
            padding-bottom: 15px;
            margin: 10px 0;
            color: #716d6d
          }
        }
        .anchor {
          display: block;
          padding: 10px 0;
          cursor: pointer;
          transition: color .2s;
          border-right: 2px solid transparent;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 13px;
          color: #80a0b1;
          &:hover {
            color: #4f8eca;
            font-weight: bold;
          }
          &.selected {
            color: #4f8eca;
            border-right-color: #4f8eca;
            font-weight: bold;
          }
        }
      }
      &.main {
        width: 80%;
        padding: 30px 0 1rem 1rem;
        margin-left: 15%;
        .inner {
          padding: 0 40px;
        }
        table {
          border-collapse: collapse;
          border-spacing: 0;
          font-size: 14px;
          width: 100%;
          th,
          td {
            border: 1px #efefef solid;
            padding: 10px;
            font-weight: normal;
            line-height: 24px;
          }
          th {
            background: #f7f6f6;
            &:nth-child(1) {
              width: 15%
            }
            &:nth-child(2) {
              width: 15%
            }
            &:nth-child(3) {
              width: 70%
            }
          }
        }

        a {
          margin: 0 3px;
        }

        h1 {
          font-size: 26px;
        }

        h2 {
          font-size: 20px;
          margin: 40px 0 20px 0
        }

        h3 {
          font-size: 18px;
        }

        h4 {
          font-size: 16px;
        }

        hr {
          border: 0;
          border-bottom: 3px solid #e4e1e1;
          margin: 35px 0;
        }
        p {
          font-size: 14px;
          color: #666;
          line-height: 30px;
        }
      }
      a {
        text-decoration: none;
        color: #5194bf;
      }
    }
  }
</style>
