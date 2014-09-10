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

* **extname(filename)**
* **dirname(filename)**
* **basename(filename)**

## Usage

If you want to replace these APIs in native path:

```js
require('fast-path').replace();  // replace all
require('fast-path').replace('dirname');  // replace `dirname`
require('fast-path').replace(['dirname', 'extname']); // replace `dirname` and `extname`
```

### License

MIT
