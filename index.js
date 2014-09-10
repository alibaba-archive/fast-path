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

  // /a.js///
  var end = filename.length;
  while (filename[end - 1] === path.sep || end === '/') {
    end--;
  }
  filename = filename.substr(0, end);

  var lastDot = -1;
  var lastSep = -1;
  var isWindows = process.platform === 'win32';

  for (var i = filename.length; i--; ) {
    var ch = filename[i];
    if (lastDot === -1 && ch === '.') lastDot = i;
    else if (lastSep === -1 && ch === '/') lastSep = i;
    else if (isWindows && lastSep === -1 && ch === '\\') lastSep = i;

    // /xxx
    if (lastSep !== -1 && lastDot === -1) return '';
    // /*.js
    if (lastDot !== -1 && i === lastDot - 2) break;
    // /.js
    if (lastSep !== -1 && lastDot !== -1) break;
  }

  // ./js and /.js
  if (lastDot < lastSep + 2) return '';

  var extname = filename.slice(lastDot);
  if (extname === '.' && filename[lastDot - 1] === '.') {
    // ..
    if (lastDot === 1) return '';
    var pre = filename[lastDot - 2];
    // [//\/]..
    if (pre === '/' || pre === path.sep) return '';
  }

  return extname;
};
