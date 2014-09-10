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

var shortPath = 'abc/def/zzz.js';
var longPath = '/home/Users/name/git/project/lib/abc/def/zzz.js';

suite
.add('path.extname(shortPath)', function () {
  path.extname(shortPath);
})
.add('fpath.extname(shortPath)', function () {
  fpath.extname(shortPath);
})
.add('path.extname(longPath)', function () {
  path.extname(longPath);
})
.add('fpath.extname(longPath)', function () {
  fpath.extname(longPath);
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

// node version: v0.11.13, date: Wed Sep 10 2014 09:26:24 GMT+0800 (CST)
// Starting...
// 4 tests completed.

// path.extname(shortPath)  x 1,898,668 ops/sec ±0.53% (98 runs sampled)
// fpath.extname(shortPath) x 8,919,520 ops/sec ±1.04% (96 runs sampled)
// path.extname(longPath)   x   663,666 ops/sec ±0.76% (97 runs sampled)
// fpath.extname(longPath)  x 9,204,262 ops/sec ±0.85% (99 runs sampled)

// node version: v0.10.31, date: Wed Sep 10 2014 09:26:54 GMT+0800 (CST)
// Starting...
// 4 tests completed.

// path.extname(shortPath)  x 2,063,175 ops/sec ±1.37% (96 runs sampled)
// fpath.extname(shortPath) x 7,746,810 ops/sec ±1.29% (94 runs sampled)
// path.extname(longPath)   x   658,861 ops/sec ±0.83% (94 runs sampled)
// fpath.extname(longPath)  x 7,849,435 ops/sec ±0.92% (94 runs sampled)
