
"use strict";

var Promise  = require('bluebird');
var request  = Promise.promisify(require('request'));

var conf = {
    'timeout'  : 10000,
    'queryUrl' : 'http://traceinvest.com/api/inq'
};

var queryTradings = function(symbol, month){
    return request({
        json    : true,
        timeout : conf.timeout,
        url     : conf.queryUrl,
        qs      : {source:'inq', symbol:symbol, month:month, token:'inq_insider_cli', version: 'v0.1.0'}
    }).spread(function(r, dt){
        if(typeof dt === 'string'){
            console.log('Data error!');
            return false;
        }
        console.log(JSON.stringify(dt, null, 4));
    });
};

var queryInsiderOf = function (symbols, month) {
    console.log('symbol:', symbols, ', month:', month);

    Promise
        .resolve(symbols)
        .each(function(sym){
            return queryTradings(sym, month)
        })
        .catch(function(e){
            w.error('Insider trading query failed!', e.toString());
        });
};

exports.queryInsiderOf = queryInsiderOf;
