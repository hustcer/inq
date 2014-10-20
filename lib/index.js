
"use strict";

var colors   = require('colors');
var printf   = require('printf');
var Promise  = require('bluebird');
var request  = Promise.promisify(require('request'));

var pkg  = require('../package.json');

var conf = {
    'timeout'  : 10000,
    'queryUrl' : 'http://traceinvest.com/api/inq'
};

var formatStr = '% 3s | % 12s | % 6s | % 10s | % 10s | % 15s | % 12s | % -22s | % -25s ';

/**
 * Available colors are:
 * bold, italic, underline, inverse, yellow, cyan, white,
 * green, red, grey, blue, rainbow, zebra, random, magenta,
 */
var colorTheme = {
    error  : 'red',
    info   : 'blue',
    data   : 'grey',
    header : 'blue',
    warn   : 'yellow',
    em     : 'magenta'
};

/**
 * Table header object
 * @type {Object}
 */
var hd = {
   'tradeType'    : 'Buy/Sell',
   'tradeDate'    : 'Trading Date',
   'filedDate'    : 'Filed Date',
   'company'      : 'Company',
   'symbol'       : 'Symbol',
   'insider'      : 'Insider',
   'relationship' : 'Relationship',
   'amount'       : 'Share Amt.',
   'unitPrice'    : 'Unit Price',
   'totalValue'   : 'Total Val.',
   'sharesOwned'  : 'Shares Owned'
};

colors.setTheme(colorTheme);

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
            console.error('Insider trading query error!'.red);
            return false;
        }
        // console.info(JSON.stringify(dt, null, 4));
        log2Term(dt);
    });
};

var queryInsiderOf = function (symbols, month) {

    Promise
        .resolve(symbols)
        .each(function(sym){
            return queryTradings(sym, month);
        })
        .catch(function(e){
            console.error('Insider trading query failed!'.error, e.toString());
        });
};


/**
 * Print query result to Terminal console
 * @param  {object} re Query result
 */
var log2Term = function(re){

    if(!(re && re.stat && re.condition)){return false;}

    var stat = re.stat;

    console.info(('\n' + re.header + '\n').red);
    console.info(printf('------------------------%s Begin--------------------', re.condition.symbol));

    if(!stat){
        console.warn('Statistic result is empty!'.warn);
        return;
    }
    console.info(printf('%15s: %s, to: %s'.em, 'Trading From',
                 re.condition.beginDate, re.condition.endDate));

    console.info(printf('%15s: %5d'.em, 'Total Records', stat.total));

    console.info(printf('%15s: %5d Records, %11s Shares,   Cost    : %15s'.em, 'Total  Buy',
                    stat.tBuy, stat.tBuyAmt, stat.tBuyVal));

    console.info(printf('%15s: %5d Records, %11s Shares,   Proceeds: %15s'.em, 'Total Sell',
                    stat.tSell, stat.tSellAmt, stat.tSellVal));

    if(stat.netBuyAmt.indexOf('-') < 0){
        console.info(printf('%15s: %16s   Net Buy Shares'.em, 'Net Shares', stat.netBuyAmt));

    }else{
        console.info(printf('%15s: %16s   Net Sell Shares'.em, 'Net Shares', stat.netBuyAmt));
    }

    if(stat.netBuyVal.indexOf('-') < 0){
        console.info(printf('%15s: %16s   Net Cost'.em, 'Net Values', stat.netBuyVal));

    }else{
        console.info(printf('%15s: %16s   Net Proceeds'.em, 'Net Values', stat.netBuyVal));
    }
    console.info(printf('%15s: %9s'.em, 'Mean Buy  Price', stat.meanBuyPrice));
    console.info(printf('%15s: %9s'.em, 'Mean Sell Price', stat.meanSellPrice));

    var p = printf(formatStr, 'A/D', hd.tradeDate, hd.symbol, hd.amount, hd.unitPrice,
                   hd.totalValue, hd.sharesOwned, hd.insider, hd.relationship);

    console.info(p.underline.header);

    re.data.forEach(function(dt){
        p = printf(formatStr, dt.tradeType, dt.tradeDate, dt.symbol, dt.amount,
                   dt.unitPrice, dt.totalValue, dt.sharesOwned, dt.insider, dt.relationship);

        console.info(p);
    });

    console.info(printf('------------------------%s End--------------------\n', re.condition.symbol));

    console.info((re.footer + '\n').red);
};

exports.queryInsiderOf = queryInsiderOf;
