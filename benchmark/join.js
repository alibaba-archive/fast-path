/*!
 * fast-path - benchmark/join.js
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

var path1 = 'first';
var path2 = 'second';
var shortPath = '.././abc//def/zzz.js';
var longPath = '.././home//Users/name/git/project/lib/abc/def/zzz.js';

suite
.add('path.join(path1, path2, shortPath)', function () {
  path.join(path1, path2, shortPath);
})
.add('path.join(path1, path2, longPath)', function () {
  path.join(path1, path2, longPath);
})
.add('fastPath.join(path1, path2, shortPath)', function () {
  fastPath.join(path1, path2, shortPath);
})
.add('fastPath.join(path1, path2, longPath)', function () {
  fastPath.join(path1, path2, longPath);
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

// node version: v0.11.13, date: Thu Sep 11 2014 09:59:00 GMT+0800 (CST)
// Starting...
// 4 tests completed.

// path.join(path1, path2, shortPath)     x 629,403 ops/sec ±2.05% (94 runs sampled)
// path.join(path1, path2, longPath)      x 500,112 ops/sec ±0.83% (96 runs sampled)
// fastPath.join(path1, path2, shortPath) x 822,540 ops/sec ±1.06% (95 runs sampled)
// fastPath(path1, path2, longPath)       x 599,279 ops/sec ±1.13% (93 runs sampled)


// node version: v0.10.31, date: Thu Sep 11 2014 10:00:49 GMT+0800 (CST)
// Starting...
// 4 tests completed.

// path.join(path1, path2, shortPath)     x 308,499 ops/sec ±2.18% (85 runs sampled)
// path.join(path1, path2, longPath)      x 247,989 ops/sec ±2.17% (87 runs sampled)
// fastPath.join(path1, path2, shortPath) x 825,965 ops/sec ±2.76% (87 runs sampled)
// fastPath(path1, path2, longPath)       x 617,719 ops/sec ±0.77% (97 runs sampled)
