/*!
 * fast-path - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var path = require('path');

exports.extname = function (filename) {
  if (!filename) return '';

  var end = filename[filename.length - 1];
  while (end === path.sep || end === '/') {
    filename = filename.slice(0, -1);
    end = filename[filename.length - 1];
  }

  var lastDot = -1;
  var lastSep = -1;
  var isWindows = process.platform === 'win32';

  for (var i = filename.length; i--; ) {
    var ch = filename[i];
    if (lastDot === -1 && ch === '.') lastDot = i;
    else if (lastSep === -1 && ch === '/') lastSep = i;
    else if (isWindows && lastSep === -1 && ch === '\\') lastSep = i;

    if (lastSep !== -1 && lastDot === -1) return '';
    if (lastDot !== -1 && i === lastDot - 2) break;
    if (lastSep !== -1 && lastDot !== -1) break;
  }

  if (lastDot < lastSep + 2) return '';
  var extname = filename.slice(lastDot);

  if (extname === '.' && filename[lastDot - 1] === '.') {
    if (lastDot === 1) return '';
    var pre = filename[lastDot - 2];
    if (pre === '/' || pre === path.sep) return '';
  }

  return extname;
};
