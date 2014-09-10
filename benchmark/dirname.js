/*!
 * fast-path - benchmark/dirname.js
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
.add('path.dirname(shortPath)', function () {
  path.dirname(shortPath);
})
.add('path.dirname(longPath)', function () {
  path.dirname(longPath);
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

// path.dirname(shortPath)      x  1,761,185 ops/sec ±0.70% (96 runs sampled)
// path.dirname(longPath)       x    626,764 ops/sec ±1.52% (90 runs sampled)
// fastPath.dirname(shortPath) x 10,489,132 ops/sec ±1.19% (95 runs sampled)
// fastPath.dirname(longPath)  x 10,443,216 ops/sec ±2.36% (94 runs sampled)

// node version: v0.10.31, date: Wed Sep 10 2014 12:42:04 GMT+0800 (CST)

// path.dirname(shortPath)      x  1,849,624 ops/sec ±1.47% (92 runs sampled)
// path.dirname(longPath)       x    635,535 ops/sec ±1.39% (94 runs sampled)
// fastPath.dirname(shortPath)  x  9,472,159 ops/sec ±1.69% (92 runs sampled)
// fastPath.dirname(longPath)   x  9,394,304 ops/sec ±2.75% (91 runs sampled)
