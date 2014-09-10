/*!
 * fast-path - benchmark/extname.js
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
.add('fastPath.extname(shortPath)', function () {
  fastPath.extname(shortPath);
})
.add('fastPath.extname(longPath)', function () {
  fastPath.extname(longPath);
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

// node version: v0.11.13, date: Wed Sep 10 2014 12:38:27 GMT+0800 (CST)

// path.extname(shortPath)      x  1,854,774 ops/sec ±1.66% (96 runs sampled)
// path.extname(longPath)       x    625,796 ops/sec ±1.15% (94 runs sampled)
// fastPath.extname(shortPath)  x  9,971,307 ops/sec ±1.39% (88 runs sampled)
// fastPath.extname(longPath)   x  9,620,105 ops/sec ±1.17% (92 runs sampled)

// node version: v0.10.31, date: Wed Sep 10 2014 12:42:04 GMT+0800 (CST)

// path.extname(shortPath)      x  2,005,761 ops/sec ±0.80% (95 runs sampled)
// path.extname(longPath)       x    644,765 ops/sec ±1.02% (97 runs sampled)
// fastPath.extname(shortPath)  x  9,372,443 ops/sec ±0.62% (94 runs sampled)
// fastPath.extname(longPath)   x  9,056,037 ops/sec ±1.00% (94 runs sampled)
