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
  var c = filename[end - 1];
  while (c === path.sep || c === '/') {
    end--;
    c = filename[end - 1];
  }

  var lastDot = -1;
  var lastSep = -1;
  var isWindows = process.platform === 'win32';

  for (var i = end; i--; ) {
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

  var extname = filename.slice(lastDot, end);
  if (extname === '.' && filename[lastDot - 1] === '.') {
    // ..
    if (lastDot === 1) return '';
    var pre = filename[lastDot - 2];
    // [//\/]..
    if (pre === '/' || pre === path.sep) return '';
  }

  return extname;
};

exports.basename = function (filename, ext) {
  if (!filename) return '';

  // /a.js///
  var end = filename.length;
  var c = filename[end - 1];
  while (c === path.sep || c === '/') {
    end--;
    c = filename[end - 1];
  }

  var lastSep = -1;
  var isWindows = process.platform === 'win32';

  for (var i = end; i--; ) {
    var ch = filename[i];
    if (lastSep === -1 && ch === '/') {
      lastSep = i;
      break;
    }
    if (isWindows && lastSep === -1 && ch === '\\') {
      lastSep = i;
      break;
    }
  }

  var basename = filename.slice(lastSep + 1, end);

  if (ext) {
    var match = basename.lastIndexOf(ext);
    if (match === -1
      || match !== basename.length - ext.length) {
      return basename;
    }
    return basename.slice(0, basename.length - ext.length);
  }

  return basename;
};

exports.dirname = function (filename) {
  if (!filename) return '.';

  var isWindows = process.platform === 'win32';

  var start = 0;
  var device = '';

  if (isWindows) {
    // need to get device in windows
    device = getDevice(filename);
    if (device) start = device.length;
  }

  // /a.js///
  var end = filename.length;
  var c = filename[end - 1];
  while (end >= start && c === path.sep || c === '/') {
    end--;
    c = filename[end - 1];
  }

  var lastSep = -1;
  for (var i = end; i-- > start; ) {
    var ch = filename[i];
    if (lastSep === -1 && ch === '/') {
      lastSep = i;
      break;
    }
    if (isWindows && lastSep === -1 && ch === '\\') {
      lastSep = i;
      break;
    }
  }
  if (lastSep <= start) {
    if (device) return device;
    if (filename[0] === '/' || filename[0] === path.sep) return filename[0];
    return '.';
  }

  return device + filename.slice(start, lastSep);
};

var splitDeviceRe =
      /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
function getDevice(filename) {
  var result = splitDeviceRe.exec(filename);
  return (result[1] || '') + (result[2] || '');
}

var all = [
    'basename',
    'dirname',
    'extname'
  ];

exports.replace = function (methods) {
  if (!methods) methods = all;
  if (!Array.isArray(methods)) methods = [methods];

  methods.forEach(function (name) {
    if (exports[name]) path[name] = exports[name];
  });
}
