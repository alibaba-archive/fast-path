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
  while (end === path.sep) {
    filename = filename.slice(0, -1);
    end = filename[filename.length - 1];
  }

  var lastDot = filename.lastIndexOf('.');
  var lastSep = filename.lastIndexOf(path.sep);

  if (lastDot < lastSep + 2) return '';
  var extname = filename.slice(lastDot);

  if (extname === '.'
    && filename[lastDot - 1] === '.'
    && (lastDot === 1 || filename[lastDot - 2] === path.sep)) return '';

  return extname;
 };
