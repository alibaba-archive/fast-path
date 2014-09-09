/*!
 * fast-path - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var path = require('path');

exports.extname = function (filename) {
  if (!filename) return '';

  var end = filename[filename.length - 1];
  while (end === path.sep) {
    filename = filename.slice(0, -1);
    end = filename[filename.length - 1];
  }

  var lastDot = filename.lastIndexOf('.');
  var lastSep = filename.lastIndexOf(path.sep);

  if (lastDot < lastSep + 2) return '';
  var extname = filename.slice(lastDot);

  if (extname === '.'
    && filename[lastDot - 1] === '.'
    && (lastDot === 1 || filename[lastDot - 2] === path.sep)) return '';

  return extname;
 };


  // node version: v0.11.13, date: Tue Sep 09 2014 22:33:32 GMT+0800 (CST)
  // Starting...
  // 2 tests completed.

  // path.extname("/abcde/../xxx/yyy/zzz.js")  x 1,154,030 ops/sec ±1.25% (95 runs sampled)
  // fpath.extname("/abcde/../xxx/yyy/zzz.js") x 9,036,275 ops/sec ±0.94% (98 runs sampled)
  //
  // node version: v0.10.31, date: Tue Sep 09 2014 22:32:44 GMT+0800 (CST)
  // Starting...
  // 2 tests completed.

  // path.extname("/abcde/../xxx/yyy/zzz.js")  x 1,255,161 ops/sec ±0.78% (98 runs sampled)
  // fpath.extname("/abcde/../xxx/yyy/zzz.js") x 7,580,940 ops/sec ±0.83% (93 runs sampled)
