'use strict';


const path = require('path');
const pathPrj = 'oop-js/js';

module.exports = {
    mode: 'production',
    entry: './src/js/main.js',
    output: {
        // стандартный
        path: path.resolve(__dirname, 'dist/js'),
        // для локального сервера
        // path: path.resolve(__dirname, `C:/Program Files/OSPanel/domains/${pathPrj}`),
        filename: 'bundle.js',
    },
    watch: true,

    devtool: 'source-map',

    module: {
        rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [['@babel/preset-env', {
                      debug: true,
                      corejs: 3,
                      useBuiltIns: "usage"
                  }]]
                }
              }
            }
          ]
    }
};