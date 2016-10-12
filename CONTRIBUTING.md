# Contributiong to Vue AMap

## directory structure

```
.
├── src/
│   └── lib/
│          └── components/
│          └── mixins/
│          └── services/
│          └── utils/
|          └── managers/
│   └── demo-app/
│   └── e2e-app/
├── test/
├── .editorconfig
├── .babelrc
├── .gitignore
├── .eslintrc
├── .travis.yml
├── package.json
├── README.md
├── LICENSE
└── test/
    └── app.js
```

## new Feature
+ 新组件的 `mixins` 中先加入 `registerComponentMixin`, `methods` 中实现 `initComponent` 方法，该方法中已经可以使用 `this.$map` 的 `AMap` 对象实例

+ 组件间通信采用自己实现的 `eventEmitterMixin`, `$broadcast` 向下广播，`$dispatch` 向上冒泡

+ 地图事件统一使用 `utils/event-helper` 导出的 单例子管理

+ 业务组件中获取地图实例：这里采用的是 新建 `Manager` 对象实例，通过 `props` 传入vue 组件内部，在地图实例完成后，将其放入 `Manager` 的实例内部


