/*!
 * fast-path - benchmark/basename.js
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
.add('path.basename(shortPath)', function () {
  path.basename(shortPath);
})
.add('path.basename(longPath)', function () {
  path.basename(longPath);
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

// node version: v0.11.13, date: Wed Sep 10 2014 12:38:27 GMT+0800 (CST)

// path.basename(shortPath)     x  1,769,474 ops/sec ±0.98% (96 runs sampled)
// path.basename(longPath)      x    642,424 ops/sec ±0.94% (94 runs sampled)
// fastPath.basename(shortPath) x 10,432,870 ops/sec ±1.41% (90 runs sampled)
// fastPath.basename(longPath)  x 10,742,695 ops/sec ±0.78% (96 runs sampled)

// node version: v0.10.31, date: Wed Sep 10 2014 12:42:04 GMT+0800 (CST)

// path.basename(shortPath)     x  1,930,931 ops/sec ±1.37% (93 runs sampled)
// path.basename(longPath)      x    642,663 ops/sec ±1.63% (95 runs sampled)
// fastPath.basename(shortPath) x 10,008,164 ops/sec ±0.76% (94 runs sampled)
// fastPath.basename(longPath)  x  9,266,497 ops/sec ±1.42% (95 runs sampled)
