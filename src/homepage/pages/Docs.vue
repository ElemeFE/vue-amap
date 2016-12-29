<template lang="html">
  <div class="docs-page">
    <div class="nav">
      <router-link to="/" class="back">返回</router-link>
      <section v-for="chapter in docs" class="chapters">
        <header class="chapter-title">
          {{chapter.zh}}
        </header>
        <router-link v-for="doc in chapter.children" :key="doc.en" class="anchor" :class="{selected: $route.path === `/docs/${enToSnake(doc.en)}`}" :to="`/docs/${enToSnake(doc.en)}`">
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
<style lang="scss">
@keyframes menu-present{
  from {left: -15%}
  to {left: 0}
}

.docs-page {
  height: 100%;

  .back {
    font-size: 14px;
    margin: -10px 0 0 35px;
    color: #b9b4b4;
    display: block;
    width: 100%;
  }
  #demoComponent {
    height: 400px;
  }
  > div {
    float: left;
    height: 100%;
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

        th, td {
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
        font-size: 28px;
        font-weight: normal;
        margin: 0 0 0.7em 0;
      }
      h2 {
        font-size: 18px;
        font-weight: bold;
        margin: 2.2em 0 1.2em 0;
      }
      hr {
        border: 0;
        border-bottom: 1px solid #eee;
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
