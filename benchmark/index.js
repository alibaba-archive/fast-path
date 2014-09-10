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
.add('path.dirname(shortPath)', function () {
  path.dirname(shortPath);
})
.add('path.dirname(longPath)', function () {
  path.dirname(longPath);
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
.add('fastPath.dirname(shortPath)', function () {
  fastPath.dirname(shortPath);
})
.add('fastPath.dirname(longPath)', function () {
  fastPath.dirname(longPath);
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

// node version: v0.11.13, date: Wed Sep 10 2014 12:38:27 GMT+0800 (CST)
// Starting...
// 12 tests completed.

// path.extname(shortPath)      x  1,854,774 ops/sec ±1.66% (96 runs sampled)
// path.extname(longPath)       x    625,796 ops/sec ±1.15% (94 runs sampled)
// path.basename(shortPath)     x  1,769,474 ops/sec ±0.98% (96 runs sampled)
// path.basename(longPath)      x    642,424 ops/sec ±0.94% (94 runs sampled)
// path.dirname(shortPath)      x  1,761,185 ops/sec ±0.70% (96 runs sampled)
// path.dirname(longPath)       x    626,764 ops/sec ±1.52% (90 runs sampled)
// fastPath.extname(shortPath)  x  9,971,307 ops/sec ±1.39% (88 runs sampled)
// fastPath.extname(longPath)   x  9,620,105 ops/sec ±1.17% (92 runs sampled)
// fastPath.basename(shortPath) x 10,432,870 ops/sec ±1.41% (90 runs sampled)
// fastPath.basename(longPath)  x 10,742,695 ops/sec ±0.78% (96 runs sampled)
// fastPath.dirname(shortPath) x 10,489,132 ops/sec ±1.19% (95 runs sampled)
// fastPath.dirname(longPath)  x 10,443,216 ops/sec ±2.36% (94 runs sampled)

// node version: v0.10.31, date: Wed Sep 10 2014 12:42:04 GMT+0800 (CST)
// Starting...
// 12 tests completed.

// path.extname(shortPath)      x  2,005,761 ops/sec ±0.80% (95 runs sampled)
// path.extname(longPath)       x    644,765 ops/sec ±1.02% (97 runs sampled)
// path.basename(shortPath)     x  1,930,931 ops/sec ±1.37% (93 runs sampled)
// path.basename(longPath)      x    642,663 ops/sec ±1.63% (95 runs sampled)
// path.dirname(shortPath)      x  1,849,624 ops/sec ±1.47% (92 runs sampled)
// path.dirname(longPath)       x    635,535 ops/sec ±1.39% (94 runs sampled)
// fastPath.extname(shortPath)  x  9,372,443 ops/sec ±0.62% (94 runs sampled)
// fastPath.extname(longPath)   x  9,056,037 ops/sec ±1.00% (94 runs sampled)
// fastPath.basename(shortPath) x 10,008,164 ops/sec ±0.76% (94 runs sampled)
// fastPath.basename(longPath)  x  9,266,497 ops/sec ±1.42% (95 runs sampled)
// fastPath.dirname(shortPath)  x  9,472,159 ops/sec ±1.69% (92 runs sampled)
// fastPath.dirname(longPath)   x  9,394,304 ops/sec ±2.75% (91 runs sampled)
