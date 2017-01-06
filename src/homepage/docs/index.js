export default [
  {
    zh: '介绍',
    en: 'introduction',
    children: [
      {
        component: require('./introduction.md'),
        en: 'Introduction',
        zh: '安装'
      },
      {
        component: require('./guide.md'),
        en: 'Guide',
        zh: '快速上手'
      }
    ]
  },
  {
    zh: '覆盖物',
    en: 'mask',
    children: [
      {
        component: require('./map.md'),
        en: 'Map',
        zh: '地图'
      },
      {
        component: require('./marker.md'),
        en: 'Marker',
        zh: '点坐标'
      },
      {
        component: require('./polyline.md'),
        en: 'Polyline',
        zh: '折线'
      },
      {
        component: require('./polygon.md'),
        en: 'Polygon',
        zh: '多边形'
      },
      {
        component: require('./circle.md'),
        en: 'Circle',
        zh: '圆'
      },
      {
        component: require('./ground-image.md'),
        en: 'GroundImage',
        zh: '图片覆盖物'
      }
    ]
  },
  {
    zh: '信息窗体',
    en: 'examples',
    children: [
      {
        component: require('./info-window.md'),
        en: 'Info Window',
        zh: '信息窗体'
      }
    ]
  },
  {
    zh: '其他服务',
    en: 'other',
    children: [
      {
        component: require('./searchbox.md'),
        en: 'SearchBox',
        zh: 'SearchBox'
      }
    ]
  }
];
