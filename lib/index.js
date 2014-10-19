
"use strict";

var Promise  = require('bluebird');
var request  = Promise.promisify(require('request'));

var conf = {
    'queryUrl' : 'http://traceinvest.com/api/inq'
};

var queryInsiderOf = function (symbols, month) {
    console.log('symbol:', symbols, ', month:', month);
};

exports.queryInsiderOf = queryInsiderOf;
