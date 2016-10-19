let cooking = require('cooking');

cooking.set({
  entry: ['./src/demo-app/index.js'],
  template: './src/demo-app/index.html',
  dist: './example',
  devServer: {
    port: 4200,
    publicPath: '/'
  },
  extends: ['vue2', 'lint'],
  clean: true,
  hash: true,
  sourceMap: true
});
module.exports = cooking.resolve();
