let cooking = require('cooking');

cooking.set({
  entry: './src/lib/index.js',
  dist: './publish',
  extends: ['vue2'],
  sourceMap: true,
  clean: true
});
module.exports = cooking.resolve();
