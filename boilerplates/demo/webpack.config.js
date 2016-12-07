const webpack = require('atool-build/lib/webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
// atool-build 已经内置了webpack 配置，这里是对内置的webpack配置进行修改，使用回调函数返回值，然后对返回值进行修改

module.exports = function (webpackConfig, env) {
  // babel插件：es6 to es5
  webpackConfig.babel.plugins.push('transform-runtime');

  // babel插件：按需加载 antd 的脚本和 css 样式
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: 'css',
  }]);

  // 定义全局变量
  webpackConfig.plugins.push(
    new webpack.ProvidePlugin({
      $: 'jquery',
      api: path.join(__dirname, './src/utils/api.js')
    }),
    // 自动打开浏览器插件：使用 npm start 自动执行
    new OpenBrowserPlugin({
      url: 'http://localhost:8989',
      browser: 'chrome'
    })
  );

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = '#eval';
    webpackConfig.babel.plugins.push('dva-hmr'); //babel插件：支持浏览器热更新
  } else {
    webpackConfig.babel.plugins.push('dev-expression');
  }

  // Don't extract common.js and common.css
  webpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
  });

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach((loader, index) => {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.less$/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.less$/;
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.css$/;
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.css$/;
    }
  });

  return webpackConfig;
};
