/*!
 * fast-path - benchmark/resove.js
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
var fastPath = require('..');


var suite = new Benchmark.Suite();

var shortPath = '.././abc//def/zzz.js';
var longPath = 'first/second/.././home//Users/name/git/project/lib/abc/def/zzz.js';

suite
.add('path.resolve(shortPath)', function () {
  path.resolve(shortPath);
})
.add('path.resolve(longPath)', function () {
  path.resolve(longPath);
})
.add('fastPath.resolve(shortPath)', function () {
  fastPath.resolve(shortPath);
})
.add('fastPath.resolve(longPath)', function () {
  fastPath.resolve(longPath);
})

.on('cycle', function(event) {
  benchmarks.add(event.target);
})
.on('start', function(event) {
  console.log('\n  node version: %s, date: %s\n  Starting...', process.version, Date());
})
.on('complete', function done() {
  benchmarks.log();
})
.run({ 'async': false });

// node version: v0.11.13, date: Thu Sep 11 2014 09:59:26 GMT+0800 (CST)
// Starting...
// 4 tests completed.

// path.resolve(shortPath)     x 123,724 ops/sec ±1.29% (94 runs sampled)
// path.resolve(longPath)      x 105,019 ops/sec ±1.34% (92 runs sampled)
// fastPath.resolve(shortPath) x 168,584 ops/sec ±1.61% (97 runs sampled)
// fastPath.resolve(longPath)  x 150,743 ops/sec ±0.88% (95 runs sampled)

// node version: v0.10.31, date: Thu Sep 11 2014 10:00:10 GMT+0800 (CST)
// Starting...
// 4 tests completed.

// path.resolve(shortPath)     x 121,911 ops/sec ±1.94% (90 runs sampled)
// path.resolve(longPath)      x 110,468 ops/sec ±1.21% (91 runs sampled)
// fastPath.resolve(shortPath) x 174,006 ops/sec ±1.18% (95 runs sampled)
// fastPath.resolve(longPath)  x 158,383 ops/sec ±0.53% (98 runs sampled)
