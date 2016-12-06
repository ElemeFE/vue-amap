let cooking = require('cooking');

cooking.set({
  entry: './src/lib/index.js',
  dist: './dist',
  clean: false,
  format: 'cjs',
  extends: ['vue2'],
  minimize: false
});
module.exports = cooking.resolve();
