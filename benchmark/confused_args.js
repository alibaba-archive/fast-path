function test(path) {
  return path.split('/').join('/');
}

var path1 = 'first';
var path2 = 'second';
var longPath = '.././home//Users/name/git/project/lib/abc/def/zzz.js';

var plusPath = path1 + '/' + path2 + '/' + longPath;
var constantPath = 'first/second/.././home//Users/name/git/project/lib/abc/def/zzz.js';

var length = 1000000;

console.time('plusPath');
for (var i = 0; i < length; i++) {
  test(plusPath);
}
console.timeEnd('plusPath');

console.time('constantPath');
for (var i = 0; i < length; i++) {
  test(constantPath);
}
console.timeEnd('constantPath');

// plusPath: 787ms
// constantPath: 177ms
