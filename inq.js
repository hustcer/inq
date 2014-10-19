#!/usr/bin/env node

"use strict";

var pkg = require('./package.json');

var colors  = require('colors');
var printf  = require('printf');
var program = require('commander');

program
  .version('0.1.0')
  .option('-s, --symbol  <symbols>', 'Symbol list to query, separated by comma.')
  .option('-t, --time    <span>'   , 'Insider trading time span, should be one of:1m,2m,3m,4m,or 5m.')
  .on('--help', function(){
    console.log('  Usage Examples:'.magenta);
    console.log('');
    console.log(printf('%-32s, %s'.green, '   inq aapl,yhoo'         , 'Query insider trading of aapl and yhoo in latest 3 months(default).'));
    console.log(printf('%-32s, %s'.green, '   inq -s aapl,yhoo'      , 'Query insider trading of aapl and yhoo.'));
    console.log(printf('%-32s, %s'.green, '   inq -s aapl,yhoo -t 2m', 'Query insider trading of aapl and yhoo in latest 2 months.'));
    console.log(printf('%-32s, %s'.green, '   inq --symbol aapl,yhoo', 'Query insider trading of aapl and yhoo.'));
    console.log(printf('%-32s, %s'.green, '   inq --symbol aapl --time 5m' , 'Query insider trading of aapl in latest 5 months.'));
    console.log('');
  })
  .parse(process.argv);
