const cooking = require('cooking');
const markdownIt = require('markdown-it')({
  html: true,
  breaks: true
});
const path = require('path');

cooking.set({
  entry: ['./src/homepage/index.js'],
  template: './src/homepage/index.html',
  dist: './docs',
  publicPath: '.',
  devServer: {
    port: 4200,
    publicPath: '/'
  },
  extends: ['vue2', 'lint'],
  clean: true,
  hash: true,
  sourceMap: true
});

cooking.add('loader.md', {
  test: /\.md$/,
  loader: 'vue-markdown-loader'
});

cooking.add('resolve.alias', {
  demos: path.join(__dirname, 'src/homepage/demos')
});

cooking.add('vueMarkdown', markdownIt);

module.exports = cooking.resolve();
