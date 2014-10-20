
"use strict";

var colors   = require('colors');
var Promise  = require('bluebird');
var request  = Promise.promisify(require('request'));

var pkg  = require('../package.json');

var conf = {
    'timeout'  : 10000,
    'queryUrl' : 'http://traceinvest.com/api/inq'
};

var queryTradings = function(symbol, month){

    var qs = {
        month   : month,
        symbol  : symbol,
        source  : 'inq',
        version : pkg.version,
        token   : 'inq_insider_cli'
    };

    return request({
        qs      : qs,
        json    : true,
        timeout : conf.timeout,
        url     : conf.queryUrl
    }).spread(function(r, dt){

        if(typeof dt === 'string'){
            console.error('Data error!'.red);
            return false;
        }
        console.log(JSON.stringify(dt, null, 4));
    });
};

var queryInsiderOf = function (symbols, month) {

    Promise
        .resolve(symbols)
        .each(function(sym){
            return queryTradings(sym, month)
        })
        .catch(function(e){
            console.error('Insider trading query failed!'.error, e.toString());
        });
};

exports.queryInsiderOf = queryInsiderOf;
