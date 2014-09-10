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
var fastPath = require('..');


var suite = new Benchmark.Suite();

var shortPath = 'abc/def/zzz.js///';
var longPath = '/home/Users/name/git/project/lib/abc/def/zzz.js////';

suite
.add('path.extname(shortPath)', function () {
  path.extname(shortPath);
})
.add('path.extname(longPath)', function () {
  path.extname(longPath);
})
.add('path.basename(shortPath)', function () {
  path.basename(shortPath);
})
.add('path.basename(longPath)', function () {
  path.basename(longPath);
})
.add('fastPath.extname(shortPath)', function () {
  fastPath.extname(shortPath);
})
.add('fastPath.extname(longPath)', function () {
  fastPath.extname(longPath);
})
.add('fastPath.basename(shortPath)', function () {
  fastPath.basename(shortPath);
})
.add('fastPath.basename(longPath)', function () {
  fastPath.basename(longPath);
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

// node version: v0.11.13, date: Wed Sep 10 2014 10:06:48 GMT+0800 (CST)
// Starting...
// 8 tests completed.

// path.extname(shortPath)      x  1,811,512 ops/sec ±1.25% (96 runs sampled)
// path.extname(longPath)       x    632,698 ops/sec ±0.60% (89 runs sampled)
// path.basename(shortPath)     x  1,797,491 ops/sec ±0.70% (96 runs sampled)
// path.basename(longPath)      x    629,155 ops/sec ±1.04% (98 runs sampled)
// fastPath.extname(shortPath)  x  9,742,326 ops/sec ±0.76% (95 runs sampled)
// fastPath.extname(longPath)   x  9,895,041 ops/sec ±0.51% (98 runs sampled)
// fastPath.basename(shortPath) x 10,329,996 ops/sec ±1.35% (91 runs sampled)
// fastPath.basename(longPath)  x 10,126,376 ops/sec ±1.43% (94 runs sampled)

// node version: v0.10.31, date: Wed Sep 10 2014 10:05:13 GMT+0800 (CST)
// Starting...
// 8 tests completed.

// path.extname(shortPath)      x 2,019,105 ops/sec ±1.22% (96 runs sampled)
// path.extname(longPath)       x   634,177 ops/sec ±1.76% (94 runs sampled)
// path.basename(shortPath)     x 1,888,162 ops/sec ±1.73% (90 runs sampled)
// path.basename(longPath)      x   659,785 ops/sec ±0.77% (97 runs sampled)
// fastPath.extname(shortPath)  x 9,015,381 ops/sec ±0.86% (95 runs sampled)
// fastPath.extname(longPath)   x 9,225,814 ops/sec ±0.93% (91 runs sampled)
// fastPath.basename(shortPath) x 9,712,295 ops/sec ±1.29% (89 runs sampled)
// fastPath.basename(longPath)  x 9,402,401 ops/sec ±0.94% (91 runs sampled)
