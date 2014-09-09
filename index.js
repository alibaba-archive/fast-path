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

  var lastDot = filename.lastIndexOf('.');
  var lastSep = filename.lastIndexOf('/');
  if (process.platform === 'win32') {
    lastSep = Math.max(lastSep, filename.lastIndexOf('\\'));
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
