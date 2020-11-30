const webpack = require('webpack');
const webpackConfigs = require('./webpack.config');

console.log('webpackConfigs', webpackConfigs);

webpack(webpackConfigs, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log('err', err);
    } else {
        console.log('打包成功');
    }
});

webpackConfigs.output.filename = 'js/kkb.js';
webpack(webpackConfigs, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log('err', err);
    } else {
        console.log('打包成功');
    }
});


