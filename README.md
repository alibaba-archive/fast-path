fast-path
---------------

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![node version][node-image]][node-url]
[![Gittip][gittip-image]][gittip-url]

[npm-image]: https://img.shields.io/npm/v/fast-path.svg?style=flat-square
[npm-url]: https://npmjs.org/package/fast-path
[travis-image]: https://img.shields.io/travis/node-modules/fast-path.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/fast-path
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.8-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[gittip-image]: https://img.shields.io/gittip/dead-horse.svg?style=flat-square
[gittip-url]: https://www.gittip.com/dead-horse/

a fast implementation of node's native path

**node native path is super slow.**

## Installation

```bash
$ npm install fast-path
```

## APIs

The same as [native path APIs](http://nodejs.org/docs/v0.11.13/api/path.html)

## Usage

If you want to replace these APIs in native path:

```js
require('fast-path').replace();  // replace all
require('fast-path').replace('dirname');  // replace `dirname`
require('fast-path').replace(['dirname', 'extname']); // replace `dirname` and `extname`
```

## Benchmark

[benchmark code](benchmark)

```bash
#node version: v0.11.13

path.extname(shortPath)                x  1,854,774 ops/sec ±1.66% (96 runs sampled)
path.extname(longPath)                 x    625,796 ops/sec ±1.15% (94 runs sampled)
path.basename(shortPath)               x  1,769,474 ops/sec ±0.98% (96 runs sampled)
path.basename(longPath)                x    642,424 ops/sec ±0.94% (94 runs sampled)
path.dirname(shortPath)                x  1,761,185 ops/sec ±0.70% (96 runs sampled)
path.dirname(longPath)                 x    626,764 ops/sec ±1.52% (90 runs sampled)
path.join(path1, path2, shortPath)     x 629,403 ops/sec ±2.05% (94 runs sampled)
path.join(path1, path2, longPath)      x 500,112 ops/sec ±0.83% (96 runs sampled)
path.normalize(shortPath)              x 1,291,875 ops/sec ±2.17% (91 runs sampled)
path.normalize(longPath)               x   969,211 ops/sec ±2.45% (93 runs sampled)
path.resolve(shortPath)                x 123,724 ops/sec ±1.29% (94 runs sampled)
path.resolve(longPath)                 x 105,019 ops/sec ±1.34% (92 runs sampled)

fastPath.extname(shortPath)            x  9,971,307 ops/sec ±1.39% (88 runs sampled)
fastPath.extname(longPath)             x  9,620,105 ops/sec ±1.17% (92 runs sampled)
fastPath.basename(shortPath)           x 10,432,870 ops/sec ±1.41% (90 runs sampled)
fastPath.basename(longPath)            x 10,742,695 ops/sec ±0.78% (96 runs sampled)
fastPath.dirname(shortPath)            x 10,489,132 ops/sec ±1.19% (95 runs sampled)
fastPath.dirname(longPath)             x 10,443,216 ops/sec ±2.36% (94 runs sampled)
fastPath.join(path1, path2, shortPath) x 822,540 ops/sec ±1.06% (95 runs sampled)
fastPath.join(path1, path2, longPath)  x 599,279 ops/sec ±1.13% (93 runs sampled)
fastPath.normalize(shortPath)          x 2,037,040 ops/sec ±2.18% (94 runs sampled)
fastPath.normalize(longPath)           x 1,612,871 ops/sec ±0.70% (92 runs sampled)
fastPath.resolve(shortPath)            x 168,584 ops/sec ±1.61% (97 runs sampled)
fastPath.resolve(longPath)             x 150,743 ops/sec ±0.88% (95 runs sampled)

#node version: v0.10.31

path.extname(shortPath)                x  2,005,761 ops/sec ±0.80% (95 runs sampled)
path.extname(longPath)                 x    644,765 ops/sec ±1.02% (97 runs sampled)
path.basename(shortPath)               x  1,930,931 ops/sec ±1.37% (93 runs sampled)
path.basename(longPath)                x    642,663 ops/sec ±1.63% (95 runs sampled)
path.dirname(shortPath)                x  1,849,624 ops/sec ±1.47% (92 runs sampled)
path.dirname(longPath)                 x    635,535 ops/sec ±1.39% (94 runs sampled)
path.join(path1, path2, shortPath)     x 308,499 ops/sec ±2.18% (85 runs sampled)
path.join(path1, path2, longPath)      x 247,989 ops/sec ±2.17% (87 runs sampled)
path.normalize(shortPath)              x   624,777 ops/sec ±3.60% (79 runs sampled)
path.normalize(longPath)               x   472,721 ops/sec ±2.01% (88 runs sampled)
path.resolve(shortPath)                x 121,911 ops/sec ±1.94% (90 runs sampled)
path.resolve(longPath)                 x 110,468 ops/sec ±1.21% (91 runs sampled)

fastPath.extname(shortPath)            x  9,372,443 ops/sec ±0.62% (94 runs sampled)
fastPath.extname(longPath)             x  9,056,037 ops/sec ±1.00% (94 runs sampled)
fastPath.basename(shortPath)           x 10,008,164 ops/sec ±0.76% (94 runs sampled)
fastPath.basename(longPath)            x  9,266,497 ops/sec ±1.42% (95 runs sampled)
fastPath.dirname(shortPath)            x  9,472,159 ops/sec ±1.69% (92 runs sampled)
fastPath.dirname(longPath)             x  9,394,304 ops/sec ±2.75% (91 runs sampled)
fastPath.join(path1, path2, shortPath) x 825,965 ops/sec ±2.76% (87 runs sampled)
fastPath.join(path1, path2, longPath)  x 617,719 ops/sec ±0.77% (97 runs sampled)
fastPath.normalize(shortPath)          x 2,379,009 ops/sec ±1.76% (89 runs sampled)
fastPath.normalize(longPath)           x 1,642,025 ops/sec ±1.11% (95 runs sampled)
fastPath.resolve(shortPath)            x 174,006 ops/sec ±1.18% (95 runs sampled)
fastPath.resolve(longPath)             x 158,383 ops/sec ±0.53% (98 runs sampled)
```

### License

MIT
