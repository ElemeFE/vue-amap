var webpackConfig = require('../../build/webpack.test.conf');

module.exports = function(config) {
  config.set({
    client: {
      mocha: {
        timeout: 40000
      }
    },
    browsers: ['HeadlessChrome'],
    customLaunchers: {
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    browserNoActivityTimeout: 20000,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  });
};
