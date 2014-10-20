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
  .option('-t, --time    <span>'   , 'Insider trading time span, should be one of: 1m, 2m, 3m, 4m, or 5m.')
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

    if(isNaN(month)){
        console.error("\nInvalid time span, use default time span of '3m' instead.\n".red);
        month = 3;
    }else{
        month = month < 1 ? 1:month;
        month = month > 5 ? 5:month;
    }
}else{
    // Query insider tradings of latest 3 months by default.
    month = 3;
}

symbols = cmd.symbol ? cmd.symbol.split(',') : '';

if(cmd.args.length > 0){
    if(cmd.args.length === 1){
        symbols = cmd.args[0].split(',');
        symbols = (symbols.length > 7) ? symbols.slice(0, 7) : symbols;
    }else{
        console.error('\nCmd input args error! You can try for example: `inq aapl`\n'.red);
        return false;
    }
}

if(!symbols){
    console.error('\nPlease input the symbol to query. For example: `inq aapl`\n'.red);
    return false;
}

query.queryInsiderOf(symbols, month);

