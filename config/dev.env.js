'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // BASE_API: '"http://120.76.117.56/BM"',
    // UPLOAD_PATH:'"http://120.76.117.56/BM/admin/upload"',

    BASE_API: '"http://192.168.0.51/HongGu/php"',
    UPLOAD_PATH:'"http://192.168.0.51/HongGu/php/admin/upload"',

    // BASE_API: '"http://47.75.106.167/BM"',
    // UPLOAD_PATH:'"http://47.75.106.167/BM/admin/upload"',

})
