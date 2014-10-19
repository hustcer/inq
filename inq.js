#!/usr/bin/env node

"use strict";

var pkg = require('./package.json');

var colors  = require('colors');
var printf  = require('printf');
var cmd     = require('commander');
var query   = require('./lib/index.js');

cmd
  .version('0.1.0')
  .option('-s, --symbol  <symbols>', 'Symbol list to query, separated by comma.')
  .option('-t, --time    <span>'   , 'Insider trading time span, should be one of:1m, 2m, 3m, 4m, or 5m.')
  .on('--help', function(){
    console.log('  Usage Examples:'.magenta);
    console.log('');
    console.log(printf('    %-32s, %s'.green, 'inq aapl,yhoo'               , 'Query insider trading of aapl and yhoo in latest 3 months(default).'));
    console.log(printf('    %-32s, %s'.green, 'inq -s aapl,yhoo'            , 'Query insider trading of aapl and yhoo.'));
    console.log(printf('    %-32s, %s'.green, 'inq -s aapl,yhoo -t 2m'      , 'Query insider trading of aapl and yhoo in latest 2 months.'));
    console.log(printf('    %-32s, %s'.green, 'inq --symbol aapl,yhoo'      , 'Query insider trading of aapl and yhoo.'));
    console.log(printf('    %-32s, %s'.green, 'inq --symbol aapl --time 5m' , 'Query insider trading of aapl in latest 5 months.'));
    console.log('');
  })
  .parse(process.argv);

var month, symbols;

if(cmd.time){
    month = parseInt(cmd.time);
    month = month < 0 ? 0:month;
    month = month > 5 ? 5:month;
}else{
    // Query insider tradings of latest 3 months by default.
    month = 3;
}

if(cmd.symbol){
    symbols = cmd.symbol.split(',');
}

if(cmd.args.length > 0 ){
    if(cmd.args.length === 1 && cmd.args[0].indexOf(',') > 0){
        symbols = cmd.args[0].split(',');
    }else{
        symbols = cmd.args;
    }
}

if(!symbols){
    console.error('\nPlease input the symbol to query. For example: `inq aapl`\n'.red);
    return false;
}

query.queryInsiderOf(symbols, month);

