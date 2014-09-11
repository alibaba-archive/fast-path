/*!
 * fast-path - benchmark/normalize.js
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
.add('path.normalize(shortPath)', function () {
  path.normalize(shortPath);
})
.add('path.normalize(longPath)', function () {
  path.normalize(longPath);
})
.add('fastPath.normalize(shortPath)', function () {
  fastPath.normalize(shortPath);
})
.add('fastPath.normalize(longPath)', function () {
  fastPath.normalize(longPath);
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

// node version: v0.11.13, date: Thu Sep 11 2014 09:58:20 GMT+0800 (CST)
// Starting...
// 4 tests completed.

// path.normalize(shortPath)     x 1,291,875 ops/sec ±2.17% (91 runs sampled)
// path.normalize(longPath)      x   969,211 ops/sec ±2.45% (93 runs sampled)
// fastPath.normalize(shortPath) x 2,037,040 ops/sec ±2.18% (94 runs sampled)
// fastPath.normalize(longPath)  x 1,612,871 ops/sec ±0.70% (92 runs sampled)

// node version: v0.10.31, date: Thu Sep 11 2014 10:01:32 GMT+0800 (CST)
// Starting...
// 4 tests completed.

// path.normalize(shortPath)     x   624,777 ops/sec ±3.60% (79 runs sampled)
// path.normalize(longPath)      x   472,721 ops/sec ±2.01% (88 runs sampled)
// fastPath.normalize(shortPath) x 2,379,009 ops/sec ±1.76% (89 runs sampled)
// fastPath.normalize(longPath)  x 1,642,025 ops/sec ±1.11% (95 runs sampled)
