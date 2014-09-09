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

// node version: v0.11.13, date: Wed Sep 10 2014 00:56:20 GMT+0800 (CST)
// Starting...
// 2 tests completed.

// path.extname("/abcde/../xxx/yyy/zzz.js")  x  1,179,062 ops/sec ±1.33% (98 runs sampled)
// fpath.extname("/abcde/../xxx/yyy/zzz.js") x 11,386,453 ops/sec ±0.74% (94 runs sampled)
//
// node version: v0.10.31, date: Wed Sep 10 2014 00:57:23 GMT+0800 (CST)
// Starting...
// 2 tests completed.

// path.extname("/abcde/../xxx/yyy/zzz.js")  x  1,270,023 ops/sec ±0.53% (98 runs sampled)
// fpath.extname("/abcde/../xxx/yyy/zzz.js") x 10,069,876 ops/sec ±0.93% (92 runs sampled)
