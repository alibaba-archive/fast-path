/*!
 * fast-path - benchmark/index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var benchmarks = require('beautify-benchmark');
var Benchmark = require('benchmark');
var path = require('path');
var fpath = require('..');


var suite = new Benchmark.Suite();

suite
.add('path.extname("/abcde/../xxx/yyy/zzz.js")', function () {
  path.extname('/abcde/../xxx/yyy/zzz.js');
})
.add('fpath.extname("/abcde/../xxx/yyy/zzz.js")', function () {
  fpath.extname('/abcde/../xxx/yyy/zzz.js');
})

.on('cycle', function(event) {
  benchmarks.add(event.target);
})
.on('start', function(event) {
  console.log('\n  node version: %s, date: %s\n  Starting...', process.version, Date());
})
.on('complete', function done() {
  benchmarks.log();
  process.exit(0);
})
.run({ 'async': false });

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
