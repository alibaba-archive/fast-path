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
