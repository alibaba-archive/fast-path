// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var assert = require('assert');
var path = require('..');

var isWindows = process.platform === 'win32';

var f = __filename;

assert.equal(path.basename(f), 'test-path.js');
assert.equal(path.basename(f, '.js'), 'test-path');
assert.equal(path.basename(''), '');
assert.equal(path.basename('/dir/basename.ext'), 'basename.ext');
assert.equal(path.basename('/basename.ext'), 'basename.ext');
assert.equal(path.basename('basename.ext'), 'basename.ext');
assert.equal(path.basename('basename.ext/'), 'basename.ext');
assert.equal(path.basename('basename.ext//'), 'basename.ext');

if (isWindows) {
  // On Windows a backslash acts as a path separator.
  assert.equal(path.basename('\\dir\\basename.ext'), 'basename.ext');
  assert.equal(path.basename('\\basename.ext'), 'basename.ext');
  assert.equal(path.basename('basename.ext'), 'basename.ext');
  assert.equal(path.basename('basename.ext\\'), 'basename.ext');
  assert.equal(path.basename('basename.ext\\\\'), 'basename.ext');

} else {
  // On unix a backslash is just treated as any other character.
  assert.equal(path.basename('\\dir\\basename.ext'), '\\dir\\basename.ext');
  assert.equal(path.basename('\\basename.ext'), '\\basename.ext');
  assert.equal(path.basename('basename.ext'), 'basename.ext');
  assert.equal(path.basename('basename.ext\\'), 'basename.ext\\');
  assert.equal(path.basename('basename.ext\\\\'), 'basename.ext\\\\');
}

// POSIX filenames may include control characters
// c.f. http://www.dwheeler.com/essays/fixing-unix-linux-filenames.html
if (!isWindows) {
  var controlCharFilename = 'Icon' + String.fromCharCode(13);
  assert.equal(path.basename('/a/b/' + controlCharFilename),
               controlCharFilename);
}

assert.equal(path.extname(f), '.js');

// assert.equal(path.dirname(f).substr(-11),
//              isWindows ? 'test\\simple' : 'test/simple');
assert.equal(path.dirname('/a/b/'), '/a');
assert.equal(path.dirname('/a/b'), '/a');
assert.equal(path.dirname('/a'), '/');
assert.equal(path.dirname(''), '.');
assert.equal(path.dirname('/'), '/');
assert.equal(path.dirname('////'), '/');

if (isWindows) {
  assert.equal(path.dirname('c:\\'), 'c:\\');
  assert.equal(path.dirname('c:\\foo'), 'c:\\');
  assert.equal(path.dirname('c:\\foo\\'), 'c:\\');
  assert.equal(path.dirname('c:\\foo\\bar'), 'c:\\foo');
  assert.equal(path.dirname('c:\\foo\\bar\\'), 'c:\\foo');
  assert.equal(path.dirname('c:\\foo\\bar\\baz'), 'c:\\foo\\bar');
  assert.equal(path.dirname('\\'), '\\');
  assert.equal(path.dirname('\\foo'), '\\');
  assert.equal(path.dirname('\\foo\\'), '\\');
  assert.equal(path.dirname('\\foo\\bar'), '\\foo');
  assert.equal(path.dirname('\\foo\\bar\\'), '\\foo');
  assert.equal(path.dirname('\\foo\\bar\\baz'), '\\foo\\bar');
  assert.equal(path.dirname('c:'), 'c:');
  assert.equal(path.dirname('c:foo'), 'c:');
  assert.equal(path.dirname('c:foo\\'), 'c:');
  assert.equal(path.dirname('c:foo\\bar'), 'c:foo');
  assert.equal(path.dirname('c:foo\\bar\\'), 'c:foo');
  assert.equal(path.dirname('c:foo\\bar\\baz'), 'c:foo\\bar');
  assert.equal(path.dirname('\\\\unc\\share'), '\\\\unc\\share');
  assert.equal(path.dirname('\\\\unc\\share\\foo'), '\\\\unc\\share\\');
  assert.equal(path.dirname('\\\\unc\\share\\foo\\'), '\\\\unc\\share\\');
  assert.equal(path.dirname('\\\\unc\\share\\foo\\bar'),
               '\\\\unc\\share\\foo');
  assert.equal(path.dirname('\\\\unc\\share\\foo\\bar\\'),
               '\\\\unc\\share\\foo');
  assert.equal(path.dirname('\\\\unc\\share\\foo\\bar\\baz'),
               '\\\\unc\\share\\foo\\bar');
}

assert.equal(path.extname(''), '');
assert.equal(path.extname('/path/to/file'), '');
assert.equal(path.extname('/path/to/file.ext'), '.ext');
assert.equal(path.extname('/path.to/file.ext'), '.ext');
assert.equal(path.extname('/path.to/file'), '');
assert.equal(path.extname('/path.to/.file'), '');
assert.equal(path.extname('/path.to/.file.ext'), '.ext');
assert.equal(path.extname('/path/to/f.ext'), '.ext');
assert.equal(path.extname('/path/to/..ext'), '.ext');
assert.equal(path.extname('file'), '');
assert.equal(path.extname('file.ext'), '.ext');
assert.equal(path.extname('.file'), '');
assert.equal(path.extname('.file.ext'), '.ext');
assert.equal(path.extname('/file'), '');
assert.equal(path.extname('/file.ext'), '.ext');
assert.equal(path.extname('/.file'), '');
assert.equal(path.extname('/.file.ext'), '.ext');
assert.equal(path.extname('.path/file.ext'), '.ext');
assert.equal(path.extname('file.ext.ext'), '.ext');
assert.equal(path.extname('file.'), '.');
assert.equal(path.extname('.'), '');
assert.equal(path.extname('./'), '');
assert.equal(path.extname('.file.ext'), '.ext');
assert.equal(path.extname('.file'), '');
assert.equal(path.extname('.file.'), '.');
assert.equal(path.extname('.file..'), '.');
assert.equal(path.extname('..'), '');
assert.equal(path.extname('../'), '');
assert.equal(path.extname('..file.ext'), '.ext');
assert.equal(path.extname('..file'), '.file');
assert.equal(path.extname('..file.'), '.');
assert.equal(path.extname('..file..'), '.');
assert.equal(path.extname('...'), '.');
assert.equal(path.extname('...ext'), '.ext');
assert.equal(path.extname('....'), '.');
assert.equal(path.extname('file.ext/'), '.ext');
assert.equal(path.extname('file.ext//'), '.ext');
assert.equal(path.extname('file/'), '');
assert.equal(path.extname('file//'), '');
assert.equal(path.extname('file./'), '.');
assert.equal(path.extname('file.//'), '.');

if (isWindows) {
  // On windows, backspace is a path separator.
  assert.equal(path.extname('.\\'), '');
  assert.equal(path.extname('..\\'), '');
  assert.equal(path.extname('file.ext\\'), '.ext');
  assert.equal(path.extname('file.ext\\\\'), '.ext');
  assert.equal(path.extname('file\\'), '');
  assert.equal(path.extname('file\\\\'), '');
  assert.equal(path.extname('file.\\'), '.');
  assert.equal(path.extname('file.\\\\'), '.');

} else {
  // On unix, backspace is a valid name component like any other character.
  assert.equal(path.extname('.\\'), '');
  assert.equal(path.extname('..\\'), '.\\');
  assert.equal(path.extname('file.ext\\'), '.ext\\');
  assert.equal(path.extname('file.ext\\\\'), '.ext\\\\');
  assert.equal(path.extname('file\\'), '');
  assert.equal(path.extname('file\\\\'), '');
  assert.equal(path.extname('file.\\'), '.\\');
  assert.equal(path.extname('file.\\\\'), '.\\\\');
}
