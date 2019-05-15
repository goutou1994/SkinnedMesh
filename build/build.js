#!/usr/bin/env node

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

webpack(webpackConfig, (err, stats) => {
    if (err) {
        throw err;
    }
    process.stdout.write(stats.toString({
        color: true
    }));
    console.log('Build complete.\n');
});