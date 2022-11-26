/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(2);
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

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



function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;


/***/ }),
/* 2 */
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 3 */
/***/ ((module) => {

"use strict";
module.exports = require("vscode");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ALL_THEMES = exports.ALL_SCALES = exports.ALL_COLORS = exports.ALL_PETS = exports.WebviewMessage = void 0;
class WebviewMessage {
    constructor(text, command) {
        this.text = text;
        this.command = command;
    }
}
exports.WebviewMessage = WebviewMessage;
exports.ALL_PETS = [
    "cat" /* PetType.cat */,
    "clippy" /* PetType.clippy */,
    "cockatiel" /* PetType.cockatiel */,
    "crab" /* PetType.crab */,
    "dog" /* PetType.dog */,
    "mod" /* PetType.mod */,
    "rocky" /* PetType.rocky */,
    "rubber-duck" /* PetType.rubberduck */,
    "snake" /* PetType.snake */,
    "totoro" /* PetType.totoro */,
    "zappy" /* PetType.zappy */,
];
exports.ALL_COLORS = [
    "black" /* PetColor.black */,
    "brown" /* PetColor.brown */,
    "green" /* PetColor.green */,
    "yellow" /* PetColor.yellow */,
    "gray" /* PetColor.gray */,
    "purple" /* PetColor.purple */,
    "red" /* PetColor.red */,
    "white" /* PetColor.white */,
    "null" /* PetColor.null */,
];
exports.ALL_SCALES = ["nano" /* PetSize.nano */, "medium" /* PetSize.medium */, "large" /* PetSize.large */];
exports.ALL_THEMES = ["none" /* Theme.none */, "forest" /* Theme.forest */, "castle" /* Theme.castle */, "beach" /* Theme.beach */];


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomName = void 0;
const cat_1 = __webpack_require__(6);
const clippy_1 = __webpack_require__(9);
const cockatiel_1 = __webpack_require__(10);
const crab_1 = __webpack_require__(11);
const dog_1 = __webpack_require__(12);
const mod_1 = __webpack_require__(13);
const rocky_1 = __webpack_require__(14);
const rubberduck_1 = __webpack_require__(15);
const snake_1 = __webpack_require__(16);
const totoro_1 = __webpack_require__(17);
const zappy_1 = __webpack_require__(18);
function randomName(type) {
    const collection = {
        ["cat" /* PetType.cat */]: cat_1.CAT_NAMES,
        ["dog" /* PetType.dog */]: dog_1.DOG_NAMES,
        ["crab" /* PetType.crab */]: crab_1.CRAB_NAMES,
        ["clippy" /* PetType.clippy */]: clippy_1.CLIPPY_NAMES,
        ["mod" /* PetType.mod */]: mod_1.MOD_NAMES,
        ["totoro" /* PetType.totoro */]: totoro_1.TOTORO_NAMES,
        ["snake" /* PetType.snake */]: snake_1.SNAKE_NAMES,
        ["rubber-duck" /* PetType.rubberduck */]: rubberduck_1.DUCK_NAMES,
        ["zappy" /* PetType.zappy */]: zappy_1.ZAPPY_NAMES,
        ["rocky" /* PetType.rocky */]: rocky_1.ROCKY_NAMES,
        ["cockatiel" /* PetType.cockatiel */]: cockatiel_1.COCKATIEL_NAMES,
    }[type] ?? cat_1.CAT_NAMES;
    return (collection[Math.floor(Math.random() * collection.length)] ?? 'Unknown');
}
exports.randomName = randomName;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CAT_NAMES = exports.Cat = void 0;
const basepettype_1 = __webpack_require__(7);
class Cat extends basepettype_1.BasePetType {
    constructor() {
        super(...arguments);
        this.label = 'cat';
        this.sequence = {
            startingState: "sit-idle" /* States.sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* States.sitIdle */,
                    possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
                },
                {
                    state: "walk-right" /* States.walkRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "run-right" /* States.runRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "walk-left" /* States.walkLeft */,
                    possibleNextStates: [
                        "sit-idle" /* States.sitIdle */,
                        "climb-wall-left" /* States.climbWallLeft */,
                        "walk-right" /* States.walkRight */,
                        "run-right" /* States.runRight */,
                    ],
                },
                {
                    state: "run-left" /* States.runLeft */,
                    possibleNextStates: [
                        "sit-idle" /* States.sitIdle */,
                        "climb-wall-left" /* States.climbWallLeft */,
                        "walk-right" /* States.walkRight */,
                        "run-right" /* States.runRight */,
                    ],
                },
                {
                    state: "climb-wall-left" /* States.climbWallLeft */,
                    possibleNextStates: ["wall-hang-left" /* States.wallHangLeft */],
                },
                {
                    state: "wall-hang-left" /* States.wallHangLeft */,
                    possibleNextStates: ["jump-down-left" /* States.jumpDownLeft */],
                },
                {
                    state: "jump-down-left" /* States.jumpDownLeft */,
                    possibleNextStates: ["land" /* States.land */],
                },
                {
                    state: "land" /* States.land */,
                    possibleNextStates: [
                        "sit-idle" /* States.sitIdle */,
                        "walk-right" /* States.walkRight */,
                        "run-right" /* States.runRight */,
                    ],
                },
                {
                    state: "chase" /* States.chase */,
                    possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
                },
                {
                    state: "idle-with-ball" /* States.idleWithBall */,
                    possibleNextStates: [
                        "walk-right" /* States.walkRight */,
                        "walk-left" /* States.walkLeft */,
                        "run-left" /* States.runLeft */,
                        "run-right" /* States.runRight */,
                    ],
                },
            ],
        };
    }
    get emoji() {
        return '🐱';
    }
    get hello() {
        return `brrr... Meow!`;
    }
}
exports.Cat = Cat;
exports.CAT_NAMES = [
    'Bella',
    'Charlie',
    'Molly',
    'Coco',
    'Ruby',
    'Oscar',
    'Lucy',
    'Bailey',
    'Milo',
    'Daisy',
    'Archie',
    'Ollie',
    'Rosie',
    'Lola',
    'Frankie',
    'Roxy',
    'Poppy',
    'Luna',
    'Jack',
    'Millie',
    'Teddy',
    'Cooper',
    'Bear',
    'Rocky',
    'Alfie',
    'Hugo',
    'Bonnie',
    'Pepper',
    'Lily',
    'Tilly',
    'Leo',
    'Maggie',
    'George',
    'Mia',
    'Marley',
    'Harley',
    'Chloe',
    'Lulu',
    'Missy',
    'Jasper',
    'Billy',
    'Nala',
    'Monty',
    'Ziggy',
    'Winston',
    'Zeus',
    'Zoe',
    'Stella',
    'Sasha',
    'Rusty',
    'Gus',
    'Baxter',
    'Dexter',
    'Willow',
    'Barney',
    'Bruno',
    'Penny',
    'Honey',
    'Milly',
    'Murphy',
    'Simba',
    'Holly',
    'Benji',
    'Henry',
    'Lilly',
    'Pippa',
    'Shadow',
    'Sam',
    'Lucky',
    'Ellie',
    'Duke',
    'Jessie',
    'Cookie',
    'Harvey',
    'Bruce',
    'Jax',
    'Rex',
    'Louie',
    'Jet',
    'Banjo',
    'Beau',
    'Ella',
    'Ralph',
    'Loki',
    'Lexi',
    'Chester',
    'Sophie',
    'Chilli',
    'Billie',
    'Louis',
    'Scout',
    'Cleo',
    'Purfect',
    'Spot',
    'Bolt',
    'Julia',
    'Ginger',
    'Daisy',
    'Amelia',
    'Oliver',
    'Ghost',
    'Midnight',
    'Pumpkin',
    'Shadow',
    'Binx',
    'Riley',
    'Lenny',
    'Mango',
    'Alex',
    'Boo',
    'Botas',
    'Romeo',
    'Bob',
    'Clyde',
    'Simon',
    'Mimmo',
    'Carlotta',
    'Felix',
    'Duchess',
];


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasePetType = exports.InvalidStateException = void 0;
const states_1 = __webpack_require__(8);
class InvalidStateException {
}
exports.InvalidStateException = InvalidStateException;
class BasePetType {
    constructor(spriteElement, collisionElement, speechElement, size, left, bottom, petRoot, floor, name, speed) {
        this.label = 'base';
        this.sequence = {
            startingState: "sit-idle" /* States.sitIdle */,
            sequenceStates: [],
        };
        this.el = spriteElement;
        this.collision = collisionElement;
        this.speech = speechElement;
        this.petRoot = petRoot;
        this._floor = floor;
        this._left = left;
        this._bottom = bottom;
        this.initSprite(size, left, bottom);
        this.currentStateEnum = this.sequence.startingState;
        this.currentState = (0, states_1.resolveState)(this.currentStateEnum, this);
        this._name = name;
        this._size = size;
        this._speed = this.randomizeSpeed(speed);
        // Increment the static count of the Pet class that the constructor belongs to
        this.constructor.count += 1;
    }
    initSprite(petSize, left, bottom) {
        this.el.style.left = `${left}px`;
        this.el.style.bottom = `${bottom}px`;
        this.el.style.width = 'auto';
        this.el.style.height = 'auto';
        this.el.style.maxWidth = `${this.calculateSpriteWidth(petSize)}px`;
        this.el.style.maxHeight = `${this.calculateSpriteWidth(petSize)}px`;
        this.collision.style.left = `${left}px`;
        this.collision.style.bottom = `${bottom}px`;
        this.collision.style.width = `${this.calculateSpriteWidth(petSize)}px`;
        this.collision.style.height = `${this.calculateSpriteWidth(petSize)}px`;
        this.speech.style.left = `${left}px`;
        this.speech.style.bottom = `${bottom + this.calculateSpriteWidth(petSize)}px`;
        this.hideSpeechBubble();
    }
    get left() {
        return this._left;
    }
    get bottom() {
        return this._bottom;
    }
    repositionAccompanyingElements() {
        this.collision.style.left = `${this._left}px`;
        this.collision.style.bottom = `${this._bottom}px`;
        this.speech.style.left = `${this._left}px`;
        this.speech.style.bottom = `${this._bottom + this.calculateSpriteWidth(this._size)}px`;
    }
    calculateSpriteWidth(size) {
        if (size === "nano" /* PetSize.nano */) {
            return 30;
        }
        else if (size === "medium" /* PetSize.medium */) {
            return 55;
        }
        else if (size === "large" /* PetSize.large */) {
            return 110;
        }
        else {
            return 30; // Shrug
        }
    }
    positionBottom(bottom) {
        this._bottom = bottom;
        this.el.style.bottom = `${this._bottom}px`;
        this.repositionAccompanyingElements();
    }
    positionLeft(left) {
        this._left = left;
        this.el.style.left = `${this._left}px`;
        this.repositionAccompanyingElements();
    }
    get width() {
        return this.el.width;
    }
    get floor() {
        return this._floor;
    }
    get hello() {
        // return the sound of the name of the animal
        return ` says hello 👋!`;
    }
    getState() {
        return { currentStateEnum: this.currentStateEnum };
    }
    get speed() {
        return this._speed;
    }
    randomizeSpeed(speed) {
        const min = speed * 0.7;
        const max = speed * 1.3;
        const newSpeed = Math.random() * (max - min) + min;
        return newSpeed;
    }
    get isMoving() {
        return this._speed !== 0 /* PetSpeed.still */;
    }
    recoverFriend(friend) {
        // Recover friends..
        this._friend = friend;
    }
    recoverState(state) {
        // TODO : Resolve a bug where if it was swiping before, it would fail
        // because holdState is no longer valid.
        this.currentStateEnum = state.currentStateEnum ?? "sit-idle" /* States.sitIdle */;
        this.currentState = (0, states_1.resolveState)(this.currentStateEnum, this);
        if (!(0, states_1.isStateAboveGround)(this.currentStateEnum)) {
            // Reset the bottom of the sprite to the floor as the theme
            // has likely changed.
            this.positionBottom(this.floor);
        }
    }
    get canSwipe() {
        return !(0, states_1.isStateAboveGround)(this.currentStateEnum);
    }
    get canChase() {
        return !(0, states_1.isStateAboveGround)(this.currentStateEnum) && this.isMoving;
    }
    showSpeechBubble(message, duration = 3000) {
        this.speech.innerHTML = message;
        this.speech.style.display = 'block';
        setTimeout(() => {
            this.hideSpeechBubble();
        }, duration);
    }
    hideSpeechBubble() {
        this.speech.style.display = 'none';
    }
    swipe() {
        if (this.currentStateEnum === "swipe" /* States.swipe */) {
            return;
        }
        this.holdState = this.currentState;
        this.holdStateEnum = this.currentStateEnum;
        this.currentStateEnum = "swipe" /* States.swipe */;
        this.currentState = (0, states_1.resolveState)(this.currentStateEnum, this);
        this.showSpeechBubble('👋');
    }
    chase(ballState, canvas) {
        this.currentStateEnum = "chase" /* States.chase */;
        this.currentState = new states_1.ChaseState(this, ballState, canvas);
    }
    faceLeft() {
        this.el.style.transform = 'scaleX(-1)';
    }
    faceRight() {
        this.el.style.transform = 'scaleX(1)';
    }
    setAnimation(face) {
        if (this.el.src.endsWith(`_${face}_8fps.gif`)) {
            return;
        }
        this.el.src = `${this.petRoot}_${face}_8fps.gif`;
    }
    chooseNextState(fromState) {
        // Work out next state
        var possibleNextStates = undefined;
        for (var i = 0; i < this.sequence.sequenceStates.length; i++) {
            if (this.sequence.sequenceStates[i].state === fromState) {
                possibleNextStates =
                    this.sequence.sequenceStates[i].possibleNextStates;
            }
        }
        if (!possibleNextStates) {
            throw new InvalidStateException();
        }
        // randomly choose the next state
        const idx = Math.floor(Math.random() * possibleNextStates.length);
        return possibleNextStates[idx];
    }
    nextFrame() {
        if (this.currentState.horizontalDirection === states_1.HorizontalDirection.left) {
            this.faceLeft();
        }
        else if (this.currentState.horizontalDirection === states_1.HorizontalDirection.right) {
            this.faceRight();
        }
        this.setAnimation(this.currentState.spriteLabel);
        // What's my buddy doing?
        if (this.hasFriend &&
            this.currentStateEnum !== "chase-friend" /* States.chaseFriend */ &&
            this.isMoving) {
            if (this.friend?.isPlaying &&
                !(0, states_1.isStateAboveGround)(this.currentStateEnum)) {
                this.currentState = (0, states_1.resolveState)("chase-friend" /* States.chaseFriend */, this);
                this.currentStateEnum = "chase-friend" /* States.chaseFriend */;
                return;
            }
        }
        var frameResult = this.currentState.nextFrame();
        if (frameResult === states_1.FrameResult.stateComplete) {
            // If recovering from swipe..
            if (this.holdState && this.holdStateEnum) {
                this.currentState = this.holdState;
                this.currentStateEnum = this.holdStateEnum;
                this.holdState = undefined;
                this.holdStateEnum = undefined;
                return;
            }
            var nextState = this.chooseNextState(this.currentStateEnum);
            this.currentState = (0, states_1.resolveState)(nextState, this);
            this.currentStateEnum = nextState;
        }
        else if (frameResult === states_1.FrameResult.stateCancel) {
            if (this.currentStateEnum === "chase" /* States.chase */) {
                var nextState = this.chooseNextState("idle-with-ball" /* States.idleWithBall */);
                this.currentState = (0, states_1.resolveState)(nextState, this);
                this.currentStateEnum = nextState;
            }
            else if (this.currentStateEnum === "chase-friend" /* States.chaseFriend */) {
                var nextState = this.chooseNextState("idle-with-ball" /* States.idleWithBall */);
                this.currentState = (0, states_1.resolveState)(nextState, this);
                this.currentStateEnum = nextState;
            }
        }
    }
    get hasFriend() {
        return this._friend !== undefined;
    }
    get friend() {
        return this._friend;
    }
    get name() {
        return this._name;
    }
    makeFriendsWith(friend) {
        this._friend = friend;
        console.log(this.name, ": I'm now friends ❤️ with ", friend.name);
        return true;
    }
    get isPlaying() {
        return (this.isMoving &&
            (this.currentStateEnum === "run-right" /* States.runRight */ ||
                this.currentStateEnum === "run-left" /* States.runLeft */));
    }
    get emoji() {
        return '🐶';
    }
}
exports.BasePetType = BasePetType;
BasePetType.count = 0;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JumpDownLeftState = exports.ClimbWallLeftState = exports.ChaseFriendState = exports.ChaseState = exports.RunLeftState = exports.RunRightState = exports.WalkLeftState = exports.WalkRightState = exports.IdleWithBallState = exports.SwipeState = exports.LandState = exports.WallHangLeftState = exports.LieState = exports.SitIdleState = exports.resolveState = exports.isStateAboveGround = exports.BallState = exports.FrameResult = exports.HorizontalDirection = exports.PetPanelState = exports.PetElementState = exports.PetInstanceState = void 0;
class PetInstanceState {
}
exports.PetInstanceState = PetInstanceState;
class PetElementState {
}
exports.PetElementState = PetElementState;
class PetPanelState {
}
exports.PetPanelState = PetPanelState;
var HorizontalDirection;
(function (HorizontalDirection) {
    HorizontalDirection[HorizontalDirection["left"] = 0] = "left";
    HorizontalDirection[HorizontalDirection["right"] = 1] = "right";
    HorizontalDirection[HorizontalDirection["natural"] = 2] = "natural";
})(HorizontalDirection = exports.HorizontalDirection || (exports.HorizontalDirection = {}));
var FrameResult;
(function (FrameResult) {
    FrameResult[FrameResult["stateContinue"] = 0] = "stateContinue";
    FrameResult[FrameResult["stateComplete"] = 1] = "stateComplete";
    // Special states
    FrameResult[FrameResult["stateCancel"] = 2] = "stateCancel";
})(FrameResult = exports.FrameResult || (exports.FrameResult = {}));
class BallState {
    constructor(cx, cy, vx, vy) {
        this.cx = cx;
        this.cy = cy;
        this.vx = vx;
        this.vy = vy;
        this.paused = false;
    }
}
exports.BallState = BallState;
function isStateAboveGround(state) {
    return (state === "climb-wall-left" /* States.climbWallLeft */ ||
        state === "jump-down-left" /* States.jumpDownLeft */ ||
        state === "land" /* States.land */ ||
        state === "wall-hang-left" /* States.wallHangLeft */);
}
exports.isStateAboveGround = isStateAboveGround;
function resolveState(state, pet) {
    switch (state) {
        case "sit-idle" /* States.sitIdle */:
            return new SitIdleState(pet);
        case "walk-right" /* States.walkRight */:
            return new WalkRightState(pet);
        case "walk-left" /* States.walkLeft */:
            return new WalkLeftState(pet);
        case "run-right" /* States.runRight */:
            return new RunRightState(pet);
        case "run-left" /* States.runLeft */:
            return new RunLeftState(pet);
        case "lie" /* States.lie */:
            return new LieState(pet);
        case "wall-hang-left" /* States.wallHangLeft */:
            return new WallHangLeftState(pet);
        case "climb-wall-left" /* States.climbWallLeft */:
            return new ClimbWallLeftState(pet);
        case "jump-down-left" /* States.jumpDownLeft */:
            return new JumpDownLeftState(pet);
        case "land" /* States.land */:
            return new LandState(pet);
        case "swipe" /* States.swipe */:
            return new SwipeState(pet);
        case "idle-with-ball" /* States.idleWithBall */:
            return new IdleWithBallState(pet);
        case "chase-friend" /* States.chaseFriend */:
            return new ChaseFriendState(pet);
    }
    return new SitIdleState(pet);
}
exports.resolveState = resolveState;
class AbstractStaticState {
    constructor(pet) {
        this.label = "sit-idle" /* States.sitIdle */;
        this.spriteLabel = 'idle';
        this.holdTime = 50;
        this.horizontalDirection = HorizontalDirection.left;
        this.idleCounter = 0;
        this.pet = pet;
    }
    nextFrame() {
        this.idleCounter++;
        if (this.idleCounter > this.holdTime) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
class SitIdleState extends AbstractStaticState {
    constructor() {
        super(...arguments);
        this.label = "sit-idle" /* States.sitIdle */;
        this.spriteLabel = 'idle';
        this.horizontalDirection = HorizontalDirection.right;
        this.holdTime = 50;
    }
}
exports.SitIdleState = SitIdleState;
class LieState extends AbstractStaticState {
    constructor() {
        super(...arguments);
        this.label = "lie" /* States.lie */;
        this.spriteLabel = 'lie';
        this.horizontalDirection = HorizontalDirection.right;
        this.holdTime = 50;
    }
}
exports.LieState = LieState;
class WallHangLeftState extends AbstractStaticState {
    constructor() {
        super(...arguments);
        this.label = "wall-hang-left" /* States.wallHangLeft */;
        this.spriteLabel = 'wallgrab';
        this.horizontalDirection = HorizontalDirection.left;
        this.holdTime = 50;
    }
}
exports.WallHangLeftState = WallHangLeftState;
class LandState extends AbstractStaticState {
    constructor() {
        super(...arguments);
        this.label = "land" /* States.land */;
        this.spriteLabel = 'land';
        this.horizontalDirection = HorizontalDirection.left;
        this.holdTime = 10;
    }
}
exports.LandState = LandState;
class SwipeState extends AbstractStaticState {
    constructor() {
        super(...arguments);
        this.label = "swipe" /* States.swipe */;
        this.spriteLabel = 'swipe';
        this.horizontalDirection = HorizontalDirection.natural;
        this.holdTime = 15;
    }
}
exports.SwipeState = SwipeState;
class IdleWithBallState extends AbstractStaticState {
    constructor() {
        super(...arguments);
        this.label = "idle-with-ball" /* States.idleWithBall */;
        this.spriteLabel = 'with_ball';
        this.horizontalDirection = HorizontalDirection.left;
        this.holdTime = 30;
    }
}
exports.IdleWithBallState = IdleWithBallState;
class WalkRightState {
    constructor(pet) {
        this.label = "walk-right" /* States.walkRight */;
        this.spriteLabel = 'walk';
        this.horizontalDirection = HorizontalDirection.right;
        this.speedMultiplier = 1;
        this.holdTime = 60;
        this.leftBoundary = Math.floor(window.innerWidth * 0.95);
        this.pet = pet;
        this.idleCounter = 0;
    }
    nextFrame() {
        this.idleCounter++;
        this.pet.positionLeft(this.pet.left + this.pet.speed * this.speedMultiplier);
        if (this.pet.isMoving &&
            this.pet.left >= this.leftBoundary - this.pet.width) {
            return FrameResult.stateComplete;
        }
        else if (!this.pet.isMoving && this.idleCounter > this.holdTime) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.WalkRightState = WalkRightState;
class WalkLeftState {
    constructor(pet) {
        this.label = "walk-left" /* States.walkLeft */;
        this.spriteLabel = 'walk';
        this.horizontalDirection = HorizontalDirection.left;
        this.speedMultiplier = 1;
        this.holdTime = 60;
        this.pet = pet;
        this.idleCounter = 0;
    }
    nextFrame() {
        this.pet.positionLeft(this.pet.left - this.pet.speed * this.speedMultiplier);
        if (this.pet.isMoving && this.pet.left <= 0) {
            return FrameResult.stateComplete;
        }
        else if (!this.pet.isMoving && this.idleCounter > this.holdTime) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.WalkLeftState = WalkLeftState;
class RunRightState extends WalkRightState {
    constructor() {
        super(...arguments);
        this.label = "run-right" /* States.runRight */;
        this.spriteLabel = 'walk_fast';
        this.speedMultiplier = 1.6;
        this.holdTime = 130;
    }
}
exports.RunRightState = RunRightState;
class RunLeftState extends WalkLeftState {
    constructor() {
        super(...arguments);
        this.label = "run-left" /* States.runLeft */;
        this.spriteLabel = 'walk_fast';
        this.speedMultiplier = 1.6;
        this.holdTime = 130;
    }
}
exports.RunLeftState = RunLeftState;
class ChaseState {
    constructor(pet, ballState, canvas) {
        this.label = "chase" /* States.chase */;
        this.spriteLabel = 'run';
        this.horizontalDirection = HorizontalDirection.left;
        this.pet = pet;
        this.ballState = ballState;
        this.canvas = canvas;
    }
    nextFrame() {
        if (this.ballState.paused) {
            return FrameResult.stateCancel; // Ball is already caught
        }
        if (this.pet.left > this.ballState.cx) {
            this.horizontalDirection = HorizontalDirection.left;
            this.pet.positionLeft(this.pet.left - this.pet.speed);
        }
        else {
            this.horizontalDirection = HorizontalDirection.right;
            this.pet.positionLeft(this.pet.left + this.pet.speed);
        }
        if (this.canvas.height - this.ballState.cy <
            this.pet.width + this.pet.floor &&
            this.ballState.cx < this.pet.left &&
            this.pet.left < this.ballState.cx + 15) {
            // hide ball
            this.canvas.style.display = 'none';
            this.ballState.paused = true;
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.ChaseState = ChaseState;
class ChaseFriendState {
    constructor(pet) {
        this.label = "chase-friend" /* States.chaseFriend */;
        this.spriteLabel = 'run';
        this.horizontalDirection = HorizontalDirection.left;
        this.pet = pet;
    }
    nextFrame() {
        if (!this.pet.hasFriend || !this.pet.friend?.isPlaying) {
            return FrameResult.stateCancel; // Friend is no longer playing.
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (this.pet.left > this.pet.friend.left) {
            this.horizontalDirection = HorizontalDirection.left;
            this.pet.positionLeft(this.pet.left - this.pet.speed);
        }
        else {
            this.horizontalDirection = HorizontalDirection.right;
            this.pet.positionLeft(this.pet.left + this.pet.speed);
        }
        return FrameResult.stateContinue;
    }
}
exports.ChaseFriendState = ChaseFriendState;
class ClimbWallLeftState {
    constructor(pet) {
        this.label = "climb-wall-left" /* States.climbWallLeft */;
        this.spriteLabel = 'wallclimb';
        this.horizontalDirection = HorizontalDirection.left;
        this.pet = pet;
    }
    nextFrame() {
        this.pet.positionBottom(this.pet.bottom + 1);
        if (this.pet.bottom >= 100) {
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.ClimbWallLeftState = ClimbWallLeftState;
class JumpDownLeftState {
    constructor(pet) {
        this.label = "jump-down-left" /* States.jumpDownLeft */;
        this.spriteLabel = 'fall_from_grab';
        this.horizontalDirection = HorizontalDirection.right;
        this.pet = pet;
    }
    nextFrame() {
        this.pet.positionBottom(this.pet.bottom - 5);
        if (this.pet.bottom <= this.pet.floor) {
            this.pet.positionBottom(this.pet.floor);
            return FrameResult.stateComplete;
        }
        return FrameResult.stateContinue;
    }
}
exports.JumpDownLeftState = JumpDownLeftState;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CLIPPY_NAMES = exports.Clippy = void 0;
const basepettype_1 = __webpack_require__(7);
class Clippy extends basepettype_1.BasePetType {
    constructor() {
        super(...arguments);
        this.label = 'clippy';
        this.sequence = {
            startingState: "sit-idle" /* States.sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* States.sitIdle */,
                    possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
                },
                {
                    state: "walk-right" /* States.walkRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "run-right" /* States.runRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "walk-left" /* States.walkLeft */,
                    possibleNextStates: ["sit-idle" /* States.sitIdle */],
                },
                {
                    state: "run-left" /* States.runLeft */,
                    possibleNextStates: ["sit-idle" /* States.sitIdle */],
                },
                {
                    state: "chase" /* States.chase */,
                    possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
                },
                {
                    state: "idle-with-ball" /* States.idleWithBall */,
                    possibleNextStates: [
                        "walk-right" /* States.walkRight */,
                        "walk-left" /* States.walkLeft */,
                        "run-left" /* States.runLeft */,
                        "run-right" /* States.runRight */,
                    ],
                },
            ],
        };
    }
    get emoji() {
        return '📎';
    }
    get hello() {
        return ` Hi, I'm Clippy, would you like some assistance today? 👋!`;
    }
}
exports.Clippy = Clippy;
exports.CLIPPY_NAMES = [
    'Clippy',
    'Karl Klammer',
    'Clippy Jr.',
    'Molly',
    'Coco',
    'Buddy',
    'Ruby',
    'Oscar',
    'Lucy',
    'Bailey',
];


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.COCKATIEL_NAMES = exports.Cockatiel = void 0;
const basepettype_1 = __webpack_require__(7);
class Cockatiel extends basepettype_1.BasePetType {
    constructor() {
        super(...arguments);
        this.label = 'cockatiel';
        this.sequence = {
            startingState: "sit-idle" /* States.sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* States.sitIdle */,
                    possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
                },
                {
                    state: "walk-right" /* States.walkRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "run-right" /* States.runRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "walk-left" /* States.walkLeft */,
                    possibleNextStates: ["sit-idle" /* States.sitIdle */],
                },
                {
                    state: "run-left" /* States.runLeft */,
                    possibleNextStates: ["sit-idle" /* States.sitIdle */],
                },
                {
                    state: "chase" /* States.chase */,
                    possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
                },
                {
                    state: "idle-with-ball" /* States.idleWithBall */,
                    possibleNextStates: [
                        "walk-right" /* States.walkRight */,
                        "walk-left" /* States.walkLeft */,
                        "run-left" /* States.runLeft */,
                        "run-right" /* States.runRight */,
                    ],
                },
            ],
        };
    }
    get emoji() {
        return '🦜';
    }
    get hello() {
        // TODO: #191 Add a custom message for cockatiel
        return ` Hello, I'm a good bird 👋!`;
    }
}
exports.Cockatiel = Cockatiel;
exports.COCKATIEL_NAMES = [
    'Cocktail',
    'Pipsqueak',
    'Sir Chirps a Lot',
    'Nibbles',
    'Lord of the Wings',
    'Girl Nest Door',
    'Wingman',
    'Meryl Cheep',
    'Jack Sparrow',
    'Godfeather',
    'Mickey',
    'Baquack Obama',
    'Dame Judi Finch',
    'Kanye Nest',
    'Speck',
    'Cheecky',
    'Arthur',
    'Paco',
    'Bobo',
    'Walt',
    'Happy',
    'Junior',
    'Coco',
    'Yoyo',
    'Milo',
    'Skipper',
    'Scarlet',
    'Diva',
    'Ursula',
    'Donna',
    'Lola',
    'Kiko',
    'Luna',
];


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CRAB_NAMES = exports.Crab = void 0;
const basepettype_1 = __webpack_require__(7);
class Crab extends basepettype_1.BasePetType {
    constructor() {
        super(...arguments);
        this.label = 'crab';
        this.sequence = {
            startingState: "sit-idle" /* States.sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* States.sitIdle */,
                    possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
                },
                {
                    state: "walk-right" /* States.walkRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "run-right" /* States.runRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "walk-left" /* States.walkLeft */,
                    possibleNextStates: ["sit-idle" /* States.sitIdle */],
                },
                {
                    state: "run-left" /* States.runLeft */,
                    possibleNextStates: ["sit-idle" /* States.sitIdle */],
                },
                {
                    state: "chase" /* States.chase */,
                    possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
                },
                {
                    state: "idle-with-ball" /* States.idleWithBall */,
                    possibleNextStates: [
                        "walk-right" /* States.walkRight */,
                        "walk-left" /* States.walkLeft */,
                        "run-left" /* States.runLeft */,
                        "run-right" /* States.runRight */,
                    ],
                },
            ],
        };
    }
    get emoji() {
        return '🦀';
    }
    get hello() {
        return ` Hi, I'm Crabsolutely Clawsome Crab 👋!`;
    }
}
exports.Crab = Crab;
exports.CRAB_NAMES = [
    'Ferris',
    'Pinchy',
    'Grabby',
    'Big Red',
    'Crabby',
    'Buddy',
    'Ruby Red',
    'Oscar',
    'Lucy',
    'Bailey',
    'Crabito',
    'Percy',
    'Rocky',
    'Mr. Krabs',
    'Shelly',
    'Santa Claws',
    'Clawdia',
    'Scuttle',
    'Snappy',
    'Hermit',
    'Horseshoe',
    'Snapper',
    'Coconut',
    'Sebastian',
    'Abby',
    'Bubbles',
    'Bait',
    'Big Mac',
    'Biggie',
    'Claws',
    'Copper',
    'Crabette',
    'Crabina',
    'Crabmister',
    'Crusty',
    'Crabcake',
    'Digger',
    'Nipper',
    'Pincer',
    'Poopsie',
    'Recluse',
    'Salty',
    'Squirt',
    'Groucho',
    'Grumpy',
    'Lenny Krabitz',
    'Leonardo DaPinchy',
    'Peeves',
    'Penny Pincher',
    'Prickl',
];


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DOG_NAMES = exports.Dog = void 0;
const basepettype_1 = __webpack_require__(7);
class Dog extends basepettype_1.BasePetType {
    constructor() {
        super(...arguments);
        this.label = 'dog';
        this.sequence = {
            startingState: "sit-idle" /* States.sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* States.sitIdle */,
                    possibleNextStates: [
                        "walk-right" /* States.walkRight */,
                        "run-right" /* States.runRight */,
                        "lie" /* States.lie */,
                    ],
                },
                {
                    state: "lie" /* States.lie */,
                    possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
                },
                {
                    state: "walk-right" /* States.walkRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "run-right" /* States.runRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "walk-left" /* States.walkLeft */,
                    possibleNextStates: [
                        "sit-idle" /* States.sitIdle */,
                        "lie" /* States.lie */,
                        "walk-right" /* States.walkRight */,
                        "run-right" /* States.runRight */,
                    ],
                },
                {
                    state: "run-left" /* States.runLeft */,
                    possibleNextStates: [
                        "sit-idle" /* States.sitIdle */,
                        "lie" /* States.lie */,
                        "walk-right" /* States.walkRight */,
                        "run-right" /* States.runRight */,
                    ],
                },
                {
                    state: "chase" /* States.chase */,
                    possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
                },
                {
                    state: "idle-with-ball" /* States.idleWithBall */,
                    possibleNextStates: [
                        "walk-right" /* States.walkRight */,
                        "walk-left" /* States.walkLeft */,
                        "run-left" /* States.runLeft */,
                        "run-right" /* States.runRight */,
                    ],
                },
            ],
        };
    }
    get emoji() {
        return '🐶';
    }
    get hello() {
        return ` Every dog has its day - and today is woof day! Today I just want to bark. Take me on a walk`;
    }
}
exports.Dog = Dog;
exports.DOG_NAMES = [
    'Bella',
    'Charlie',
    'Max',
    'Molly',
    'Coco',
    'Buddy',
    'Ruby',
    'Oscar',
    'Lucy',
    'Bailey',
    'Milo',
    'Daisy',
    'Archie',
    'Ollie',
    'Rosie',
    'Lola',
    'Frankie',
    'Toby',
    'Roxy',
    'Poppy',
    'Luna',
    'Jack',
    'Millie',
    'Teddy',
    'Harry',
    'Cooper',
    'Bear',
    'Rocky',
    'Alfie',
    'Hugo',
    'Bonnie',
    'Pepper',
    'Lily',
    'Leo',
    'Maggie',
    'George',
    'Mia',
    'Marley',
    'Harley',
    'Chloe',
    'Lulu',
    'Jasper',
    'Billy',
    'Nala',
    'Monty',
    'Ziggy',
    'Winston',
    'Zeus',
    'Zoe',
    'Stella',
    'Sasha',
    'Rusty',
    'Gus',
    'Baxter',
    'Dexter',
    'Diesel',
    'Willow',
    'Barney',
    'Bruno',
    'Penny',
    'Honey',
    'Milly',
    'Murphy',
    'Holly',
    'Benji',
    'Henry',
    'Lilly',
    'Pippa',
    'Shadow',
    'Sam',
    'Buster',
    'Lucky',
    'Ellie',
    'Duke',
    'Jessie',
    'Cookie',
    'Harvey',
    'Bruce',
    'Jax',
    'Rex',
    'Louie',
    'Bentley',
    'Jet',
    'Banjo',
    'Beau',
    'Ella',
    'Ralph',
    'Loki',
    'Lexi',
    'Chester',
    'Sophie',
    'Billie',
    'Louis',
    'Charlie',
    'Cleo',
    'Spot',
    'Harry',
    'Bolt',
    'Ein',
    'Maddy',
    'Ghost',
    'Midnight',
    'Pumpkin',
    'Shadow',
    'Sparky',
    'Linus',
    'Cody',
    'Slinky',
    'Toto',
    'Balto',
    'Golfo',
    'Pongo',
    'Beethoven',
    'Hachiko',
    'Scooby',
    'Clifford',
    'Astro',
    'Goofy',
    'Chip',
    'Einstein',
    'Fang',
    'Truman',
    'Uggie',
    'Bingo',
    'Blue',
    'Cometa',
    'Krypto',
    'Huesos',
    'Odie',
    'Snoopy',
    'Aisha',
    'Moly',
    'Chiquita',
    'Chavela',
    'Tramp',
    'Lady',
    'Puddles',
];


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MOD_NAMES = exports.Mod = void 0;
const basepettype_1 = __webpack_require__(7);
class Mod extends basepettype_1.BasePetType {
    constructor() {
        super(...arguments);
        this.label = 'mod';
        this.sequence = {
            startingState: "sit-idle" /* States.sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* States.sitIdle */,
                    possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
                },
                {
                    state: "walk-right" /* States.walkRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "run-right" /* States.runRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "walk-left" /* States.walkLeft */,
                    possibleNextStates: ["sit-idle" /* States.sitIdle */],
                },
                {
                    state: "run-left" /* States.runLeft */,
                    possibleNextStates: ["sit-idle" /* States.sitIdle */],
                },
                {
                    state: "chase" /* States.chase */,
                    possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
                },
                {
                    state: "idle-with-ball" /* States.idleWithBall */,
                    possibleNextStates: [
                        "walk-right" /* States.walkRight */,
                        "walk-left" /* States.walkLeft */,
                        "run-left" /* States.runLeft */,
                        "run-right" /* States.runRight */,
                    ],
                },
            ],
        };
    }
    get emoji() {
        return '🤖';
    }
    get hello() {
        return ` Hi, I'm Mod the dotnet bot, what are you building today?`;
    }
}
exports.Mod = Mod;
exports.MOD_NAMES = [
    'Mod',
    'Moddy',
    'Dotnetbot',
    'Bot',
    'Purple Pal',
    'Ro Bot',
];


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ROCKY_NAMES = exports.Rocky = void 0;
const basepettype_1 = __webpack_require__(7);
class Rocky extends basepettype_1.BasePetType {
    constructor() {
        super(...arguments);
        this.label = 'rocky';
        this.sequence = {
            startingState: "sit-idle" /* States.sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* States.sitIdle */,
                    possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
                },
                {
                    state: "walk-right" /* States.walkRight */,
                    possibleNextStates: ["sit-idle" /* States.sitIdle */, "run-right" /* States.runRight */],
                },
                {
                    state: "run-right" /* States.runRight */,
                    possibleNextStates: ["sit-idle" /* States.sitIdle */, "walk-right" /* States.walkRight */],
                },
            ],
        };
    }
    get emoji() {
        return '💎';
    }
    get canChase() {
        return false;
    }
    get hello() {
        return ` 👋 I'm rock! I always Rock`;
    }
}
exports.Rocky = Rocky;
exports.ROCKY_NAMES = [
    'Rocky',
    'The Rock',
    'Quartzy',
    'Rocky I',
    'Rocky II',
    'Rocky III',
    'Pebbles Sr.',
    'Big Granite',
    'Boulder',
    'Rockefeller',
    'Pebble',
    'Rocksanne',
    'Rockstar',
    'Onix',
    'Rock and Roll',
    'Dolomite',
    'Granite',
    'Miss Marble',
    'Rock On',
    'Amberstone',
    'Rock With Me',
    'Rock On It',
    'Rock Out',
];


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DUCK_NAMES = exports.RubberDuck = void 0;
const basepettype_1 = __webpack_require__(7);
class RubberDuck extends basepettype_1.BasePetType {
    constructor() {
        super(...arguments);
        this.label = 'rubber-duck';
        this.sequence = {
            startingState: "sit-idle" /* States.sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* States.sitIdle */,
                    possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
                },
                {
                    state: "walk-right" /* States.walkRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "run-right" /* States.runRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "walk-left" /* States.walkLeft */,
                    possibleNextStates: ["sit-idle" /* States.sitIdle */],
                },
                {
                    state: "run-left" /* States.runLeft */,
                    possibleNextStates: ["sit-idle" /* States.sitIdle */],
                },
                {
                    state: "chase" /* States.chase */,
                    possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
                },
                {
                    state: "idle-with-ball" /* States.idleWithBall */,
                    possibleNextStates: [
                        "walk-right" /* States.walkRight */,
                        "walk-left" /* States.walkLeft */,
                        "run-left" /* States.runLeft */,
                        "run-right" /* States.runRight */,
                    ],
                },
            ],
        };
    }
    get emoji() {
        return '🐥';
    }
    get hello() {
        return ` Hi, I love to quack around 👋!`;
    }
}
exports.RubberDuck = RubberDuck;
exports.DUCK_NAMES = [
    'Quacky',
    'Floaty',
    'Duck',
    'Molly',
    'Sunshine',
    'Buddy',
    'Chirpy',
    'Oscar',
    'Lucy',
    'Bailey',
    'Beaky',
    'Jemima',
    'Peaches',
    'Quackers',
    'Jelly Beans',
    'Donald',
    'Chady',
    'Waddles',
    'Bill',
    'Bubbles',
    'James Pond',
    'Moby Duck',
    'Quack Sparrow',
    'Peanut',
    'Psyduck',
    'Mr Quack',
    'Louie',
    'Golduck',
    'Daisy',
    'Pickles',
    'Ducky Duck',
    'Mrs Fluffs',
    'Squeek',
    'Ace',
    'Rubberduck',
    'Mrs Beak',
    'April',
    'Tutu',
    'Billy the duck',
    'Ducky',
    'Neco',
    'Dodo',
    'Colonel',
    'Franklin',
    'Emmett',
    'Bubba',
    'Dillard',
    'Duncan',
    'Pogo',
    'Uno',
    'Peanut',
    'Nero',
    'Mowgli',
    'Eggspresso',
    'Webster',
    'Quacker Jack',
    'Plucker',
    'Meeko',
];


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SNAKE_NAMES = exports.Snake = void 0;
const basepettype_1 = __webpack_require__(7);
class Snake extends basepettype_1.BasePetType {
    constructor() {
        super(...arguments);
        this.label = 'snake';
        this.sequence = {
            startingState: "sit-idle" /* States.sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* States.sitIdle */,
                    possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
                },
                {
                    state: "walk-right" /* States.walkRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "run-right" /* States.runRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "walk-left" /* States.walkLeft */,
                    possibleNextStates: [
                        "sit-idle" /* States.sitIdle */,
                        "walk-right" /* States.walkRight */,
                        "run-right" /* States.runRight */,
                    ],
                },
                {
                    state: "run-left" /* States.runLeft */,
                    possibleNextStates: [
                        "sit-idle" /* States.sitIdle */,
                        "walk-right" /* States.walkRight */,
                        "run-right" /* States.runRight */,
                    ],
                },
                {
                    state: "chase" /* States.chase */,
                    possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
                },
                {
                    state: "idle-with-ball" /* States.idleWithBall */,
                    possibleNextStates: [
                        "walk-right" /* States.walkRight */,
                        "walk-left" /* States.walkLeft */,
                        "run-left" /* States.runLeft */,
                        "run-right" /* States.runRight */,
                    ],
                },
            ],
        };
    }
    get emoji() {
        return '🐍';
    }
    get hello() {
        return `Sss... Oh. Oh my gosh! I'm a snake!`;
    }
}
exports.Snake = Snake;
exports.SNAKE_NAMES = [
    'Sneaky',
    'Mr Slippery',
    'Hissy Elliott',
    'Molly',
    'Coco',
    'Buddy',
    'Ruby',
    'Bailey',
    'Max',
    'Seb',
    'Kaa',
    'Mr Hiss',
    'Miss Hiss',
    'Snaku',
    'Kaa',
    'Madame Snake',
    'Sir Hiss',
    'Loki',
    'Steelix',
    'Gyarados',
    'Seviper',
    'Ekanes',
    'Arbok',
    'Snivy',
    'Servine',
    'Serperior',
    'Mojo',
    'Moss',
    'Nigel',
    'Tootsie',
    'Sammy',
    'Ziggy',
    'Asmodeus',
    'Attila',
    'Basil',
    'Diablo',
    'Eden',
    'Eve',
    'Heaven',
    'Hydra',
    'Indiana',
    'Jafaar',
    'Kaa',
    'Medusa',
    'Naga',
    'Severus',
    'Slytherin',
    'Snape',
    'Raven',
    'Slider',
    'Slinky',
    'Stripes',
];


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TOTORO_NAMES = exports.Totoro = void 0;
const basepettype_1 = __webpack_require__(7);
class Totoro extends basepettype_1.BasePetType {
    constructor() {
        super(...arguments);
        this.label = 'totoro';
        this.sequence = {
            startingState: "sit-idle" /* States.sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* States.sitIdle */,
                    possibleNextStates: ["walk-right" /* States.walkRight */, "lie" /* States.lie */],
                },
                {
                    state: "lie" /* States.lie */,
                    possibleNextStates: ["walk-right" /* States.walkRight */, "walk-left" /* States.walkLeft */],
                },
                {
                    state: "walk-right" /* States.walkRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "sit-idle" /* States.sitIdle */],
                },
                {
                    state: "walk-left" /* States.walkLeft */,
                    possibleNextStates: [
                        "sit-idle" /* States.sitIdle */,
                        "climb-wall-left" /* States.climbWallLeft */,
                        "sit-idle" /* States.sitIdle */,
                    ],
                },
                {
                    state: "climb-wall-left" /* States.climbWallLeft */,
                    possibleNextStates: ["wall-hang-left" /* States.wallHangLeft */],
                },
                {
                    state: "wall-hang-left" /* States.wallHangLeft */,
                    possibleNextStates: ["jump-down-left" /* States.jumpDownLeft */],
                },
                {
                    state: "jump-down-left" /* States.jumpDownLeft */,
                    possibleNextStates: ["land" /* States.land */],
                },
                {
                    state: "land" /* States.land */,
                    possibleNextStates: [
                        "sit-idle" /* States.sitIdle */,
                        "walk-right" /* States.walkRight */,
                        "lie" /* States.lie */,
                    ],
                },
                {
                    state: "chase" /* States.chase */,
                    possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
                },
                {
                    state: "idle-with-ball" /* States.idleWithBall */,
                    possibleNextStates: ["walk-right" /* States.walkRight */, "walk-left" /* States.walkLeft */],
                },
            ],
        };
    }
    get emoji() {
        return '🐾';
    }
    get hello() {
        return `Try Laughing. Then Whatever Scares You Will Go Away. 🎭`;
    }
}
exports.Totoro = Totoro;
exports.TOTORO_NAMES = [
    'Totoro',
    'トトロ',
    'Max',
    'Molly',
    'Coco',
    'Buddy',
    'Ruby',
    'Oscar',
    'Lucy',
    'Bailey',
    'Big fella',
];


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZAPPY_NAMES = exports.Zappy = void 0;
const basepettype_1 = __webpack_require__(7);
class Zappy extends basepettype_1.BasePetType {
    constructor() {
        super(...arguments);
        this.label = 'zappy';
        this.sequence = {
            startingState: "sit-idle" /* States.sitIdle */,
            sequenceStates: [
                {
                    state: "sit-idle" /* States.sitIdle */,
                    possibleNextStates: ["walk-right" /* States.walkRight */, "run-right" /* States.runRight */],
                },
                {
                    state: "walk-right" /* States.walkRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "run-right" /* States.runRight */,
                    possibleNextStates: ["walk-left" /* States.walkLeft */, "run-left" /* States.runLeft */],
                },
                {
                    state: "walk-left" /* States.walkLeft */,
                    possibleNextStates: ["sit-idle" /* States.sitIdle */],
                },
                {
                    state: "run-left" /* States.runLeft */,
                    possibleNextStates: ["sit-idle" /* States.sitIdle */],
                },
                {
                    state: "chase" /* States.chase */,
                    possibleNextStates: ["idle-with-ball" /* States.idleWithBall */],
                },
                {
                    state: "idle-with-ball" /* States.idleWithBall */,
                    possibleNextStates: [
                        "walk-right" /* States.walkRight */,
                        "walk-left" /* States.walkLeft */,
                        "run-left" /* States.runLeft */,
                        "run-right" /* States.runRight */,
                    ],
                },
            ],
        };
    }
    get emoji() {
        return '⚡';
    }
    get hello() {
        // TODO: #193 Add a custom message for zappy
        return ` Hello this is Zappy! Do I look familiar?? I am the mascot for Azure Functions😉`;
    }
}
exports.Zappy = Zappy;
exports.ZAPPY_NAMES = [
    'Zappy',
    'Zippy',
    'Zappy Jr.',
    'Zoppy',
    'Zuppy',
    'Zeppy',
    'Big Z',
    'Little z',
    'The Flash',
    'Thor',
    'Electric Bolt',
    'Azula',
    'Lightning Bolt',
    'Power',
    'Sonic',
    'Speedy',
    'Rush',
];


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stringListAsQuickPickItemList = exports.TranslatedQuickPickItem = void 0;
const vscode = __webpack_require__(3);
class TranslatedQuickPickItem {
    constructor(label, value) {
        this.label = label;
        this.value = value;
    }
}
exports.TranslatedQuickPickItem = TranslatedQuickPickItem;
function stringListAsQuickPickItemList(collection) {
    return collection.map((el) => {
        return { label: vscode.l10n.t(String(el)), value: el };
    });
}
exports.stringListAsQuickPickItemList = stringListAsQuickPickItemList;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.spawnPetDeactivate = exports.petPlaygroundDeactivate = exports.activate = exports.storeCollectionAsMemento = exports.PetSpecification = void 0;
const path = __webpack_require__(1);
const vscode = __webpack_require__(3);
const types_1 = __webpack_require__(4);
const names_1 = __webpack_require__(5);
const localize = __webpack_require__(19);
const EXTRA_PETS_KEY = 'vscode-pets.extra-pets';
const EXTRA_PETS_KEY_TYPES = EXTRA_PETS_KEY + '.types';
const EXTRA_PETS_KEY_COLORS = EXTRA_PETS_KEY + '.colors';
const EXTRA_PETS_KEY_NAMES = EXTRA_PETS_KEY + '.names';
const DEFAULT_PET_SCALE = "nano" /* PetSize.nano */;
const DEFAULT_COLOR = "brown" /* PetColor.brown */;
const DEFAULT_PET_TYPE = "cat" /* PetType.cat */;
const DEFAULT_POSITION = "panel" /* ExtPosition.panel */;
const DEFAULT_THEME = "none" /* Theme.none */;
class PetQuickPickItem {
    constructor(name_, type, color) {
        this.name_ = name_;
        this.type = type;
        this.color = color;
        this.name = name_;
        this.label = name_;
        this.description = `${color} ${type}`;
    }
}
let webviewViewProvider;
function getConfiguredSize() {
    var size = vscode.workspace
        .getConfiguration('vscode-pets')
        .get('petSize', DEFAULT_PET_SCALE);
    if (types_1.ALL_SCALES.lastIndexOf(size) === -1) {
        size = DEFAULT_PET_SCALE;
    }
    return size;
}
function getConfiguredTheme() {
    var theme = vscode.workspace
        .getConfiguration('vscode-pets')
        .get('theme', DEFAULT_THEME);
    if (types_1.ALL_THEMES.lastIndexOf(theme) === -1) {
        theme = DEFAULT_THEME;
    }
    return theme;
}
function getConfiguredThemeKind() {
    return vscode.window.activeColorTheme.kind;
}
function getConfigurationPosition() {
    return vscode.workspace
        .getConfiguration('vscode-pets')
        .get('position', DEFAULT_POSITION);
}
function getThrowWithMouseConfiguration() {
    return vscode.workspace
        .getConfiguration('vscode-pets')
        .get('throwBallWithMouse', true);
}
function updatePanelThrowWithMouse() {
    const panel = getPetPanel();
    if (panel !== undefined) {
        panel.setThrowWithMouse(getThrowWithMouseConfiguration());
    }
}
function updateExtensionPositionContext() {
    vscode.commands.executeCommand('setContext', 'vscode-pets.position', getConfigurationPosition());
}
class PetSpecification {
    constructor(color, type, size, name) {
        this.color = color;
        this.type = type;
        this.size = size;
        if (!name) {
            this.name = (0, names_1.randomName)(type);
        }
        else {
            this.name = name;
        }
    }
    static fromConfiguration() {
        var color = vscode.workspace
            .getConfiguration('vscode-pets')
            .get('petColor', DEFAULT_COLOR);
        if (types_1.ALL_COLORS.lastIndexOf(color) === -1) {
            color = DEFAULT_COLOR;
        }
        var type = vscode.workspace
            .getConfiguration('vscode-pets')
            .get('petType', DEFAULT_PET_TYPE);
        if (types_1.ALL_PETS.lastIndexOf(type) === -1) {
            type = DEFAULT_PET_TYPE;
        }
        return new PetSpecification(color, type, getConfiguredSize());
    }
    static collectionFromMemento(context, size) {
        var contextTypes = context.globalState.get(EXTRA_PETS_KEY_TYPES, []);
        var contextColors = context.globalState.get(EXTRA_PETS_KEY_COLORS, []);
        var contextNames = context.globalState.get(EXTRA_PETS_KEY_NAMES, []);
        var result = new Array();
        for (let index = 0; index < contextTypes.length; index++) {
            result.push(new PetSpecification(contextColors?.[index] ?? DEFAULT_COLOR, contextTypes[index], size, contextNames[index]));
        }
        return result;
    }
}
exports.PetSpecification = PetSpecification;
function storeCollectionAsMemento(context, collection) {
    var contextTypes = new Array(collection.length);
    var contextColors = new Array(collection.length);
    var contextNames = new Array(collection.length);
    for (let index = 0; index < collection.length; index++) {
        contextTypes[index] = collection[index].type;
        contextColors[index] = collection[index].color;
        contextNames[index] = collection[index].name;
    }
    context.globalState.update(EXTRA_PETS_KEY_TYPES, contextTypes);
    context.globalState.update(EXTRA_PETS_KEY_COLORS, contextColors);
    context.globalState.update(EXTRA_PETS_KEY_NAMES, contextNames);
    context.globalState.setKeysForSync([
        EXTRA_PETS_KEY_TYPES,
        EXTRA_PETS_KEY_COLORS,
        EXTRA_PETS_KEY_NAMES,
    ]);
}
exports.storeCollectionAsMemento = storeCollectionAsMemento;
let petPlaygroundStatusBar;
let spawnPetStatusBar;
async function handleRemovePetMessage(message) {
    var petList = Array();
    switch (message.command) {
        case 'list-pets':
            message.text.split('\n').forEach((pet) => {
                var parts = pet.split(',');
                petList.push({
                    type: parts[0],
                    name: parts[1],
                    color: parts[2],
                });
            });
            break;
        default:
            return;
    }
    if (!petList) {
        return;
    }
    await vscode.window
        .showQuickPick(petList.map((val) => {
        return new PetQuickPickItem(val.name, val.type, val.color);
    }), {
        placeHolder: vscode.l10n.t('Select the pet to remove.'),
    })
        .then((pet) => {
        if (pet) {
            const panel = getPetPanel();
            if (panel !== undefined) {
                panel.deletePet(pet.name);
                const collection = petList
                    .filter((item) => {
                    return item.name !== pet.name;
                })
                    .map((item) => {
                    return new PetSpecification(item.color, item.type, "medium" /* PetSize.medium */, item.name);
                });
                storeCollectionAsMemento(this, collection);
            }
        }
    });
}
function getPetPanel() {
    if (getConfigurationPosition() === "explorer" /* ExtPosition.explorer */ &&
        webviewViewProvider) {
        return webviewViewProvider;
    }
    else if (PetPanel.currentPanel) {
        return PetPanel.currentPanel;
    }
    else {
        return undefined;
    }
}
function getWebview() {
    if (getConfigurationPosition() === "explorer" /* ExtPosition.explorer */ &&
        webviewViewProvider) {
        return webviewViewProvider.getWebview();
    }
    else if (PetPanel.currentPanel) {
        return PetPanel.currentPanel.getWebview();
    }
}
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('vscode-pets.start', () => {
        if (getConfigurationPosition() === "explorer" /* ExtPosition.explorer */ &&
            webviewViewProvider) {
            vscode.commands.executeCommand('petsView.focus');
        }
        else {
            const spec = PetSpecification.fromConfiguration();
            PetPanel.createOrShow(context.extensionUri, context.extensionPath, spec.color, spec.type, spec.size, getConfiguredTheme(), getConfiguredThemeKind(), getThrowWithMouseConfiguration());
            if (PetPanel.currentPanel) {
                var collection = PetSpecification.collectionFromMemento(context, getConfiguredSize());
                collection.forEach((item) => {
                    PetPanel.currentPanel?.spawnPet(item);
                });
                // Store the collection in the memento, incase any of the null values (e.g. name) have been set
                storeCollectionAsMemento(context, collection);
            }
        }
    }));
    // status bar item
    petPlaygroundStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    petPlaygroundStatusBar.command = 'vscode-pets.start';
    context.subscriptions.push(petPlaygroundStatusBar);
    spawnPetStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    spawnPetStatusBar.command = 'vscode-pets.spawn-pet';
    context.subscriptions.push(spawnPetStatusBar);
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBar));
    context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBar));
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateExtensionPositionContext));
    updateStatusBar();
    const spec = PetSpecification.fromConfiguration();
    webviewViewProvider = new PetWebviewViewProvider(context.extensionUri, context.extensionPath, spec.color, spec.type, spec.size, getConfiguredTheme(), getConfiguredThemeKind(), getThrowWithMouseConfiguration());
    updateExtensionPositionContext();
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(PetWebviewViewProvider.viewType, webviewViewProvider));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-pets.throw-ball', () => {
        const panel = getPetPanel();
        if (panel !== undefined) {
            panel.throwBall();
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-pets.delete-pet', async () => {
        const panel = getPetPanel();
        if (panel !== undefined) {
            panel.listPets();
            getWebview()?.onDidReceiveMessage(handleRemovePetMessage, context);
        }
        else {
            createPetPlayground(context);
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-pets.roll-call', async () => {
        const panel = getPetPanel();
        if (panel !== undefined) {
            panel.rollCall();
        }
        else {
            createPetPlayground(context);
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-pets.spawn-pet', async () => {
        const panel = getPetPanel();
        if (panel) {
            const selectedPetType = await vscode.window.showQuickPick(localize.stringListAsQuickPickItemList(types_1.ALL_PETS), {
                placeHolder: vscode.l10n.t('Select a pet'),
            });
            if (selectedPetType === undefined) {
                return;
            }
            var petColor = DEFAULT_COLOR;
            var choices;
            switch (selectedPetType.value) {
                case "rubber-duck" /* PetType.rubberduck */:
                    petColor = "yellow" /* PetColor.yellow */;
                    break;
                case "snake" /* PetType.snake */:
                    petColor = "green" /* PetColor.green */;
                    break;
                case "rocky" /* PetType.rocky */:
                case "totoro" /* PetType.totoro */:
                    petColor = "gray" /* PetColor.gray */;
                    break;
                case "cat" /* PetType.cat */:
                    choices = [
                        "black" /* PetColor.black */,
                        "brown" /* PetColor.brown */,
                        "white" /* PetColor.white */,
                    ];
                    var selectedColor = await vscode.window.showQuickPick(localize.stringListAsQuickPickItemList(choices), {
                        placeHolder: vscode.l10n.t('Select a color'),
                    });
                    if (selectedColor === undefined) {
                        return;
                    }
                    petColor = selectedColor.value;
                    break;
                case "dog" /* PetType.dog */:
                    choices = [
                        "black" /* PetColor.black */,
                        "brown" /* PetColor.brown */,
                        "white" /* PetColor.white */,
                    ];
                    var selectedColor = await vscode.window.showQuickPick(localize.stringListAsQuickPickItemList(choices), {
                        placeHolder: vscode.l10n.t('Select a color'),
                    });
                    if (selectedColor === undefined) {
                        return;
                    }
                    petColor = selectedColor.value;
                    break;
                case "clippy" /* PetType.clippy */:
                    choices = [
                        "black" /* PetColor.black */,
                        "brown" /* PetColor.brown */,
                        "green" /* PetColor.green */,
                        "yellow" /* PetColor.yellow */,
                    ];
                    var selectedColor = await vscode.window.showQuickPick(localize.stringListAsQuickPickItemList(choices), {
                        placeHolder: vscode.l10n.t('Select a color'),
                    });
                    if (selectedColor === undefined) {
                        return;
                    }
                    petColor = selectedColor.value;
                    break;
                case "cockatiel" /* PetType.cockatiel */:
                    petColor = "gray" /* PetColor.gray */;
                    break;
                case "crab" /* PetType.crab */:
                    petColor = "red" /* PetColor.red */;
                    break;
                case "zappy" /* PetType.zappy */:
                    petColor = "yellow" /* PetColor.yellow */;
                    break;
                case "mod" /* PetType.mod */:
                    petColor = "purple" /* PetColor.purple */;
                    break;
            }
            if (petColor === undefined) {
                return;
            }
            const name = await vscode.window.showInputBox({
                placeHolder: vscode.l10n.t('Leave blank for a random name'),
                prompt: vscode.l10n.t('Name your pet'),
                value: (0, names_1.randomName)(selectedPetType.value),
            });
            const spec = new PetSpecification(petColor, selectedPetType.value, getConfiguredSize(), name);
            if (!spec.type || !spec.color || !spec.size) {
                return vscode.window.showWarningMessage(vscode.l10n.t('Cancelled Spawning Pet'));
            }
            else if (spec) {
                panel.spawnPet(spec);
            }
            var collection = PetSpecification.collectionFromMemento(context, getConfiguredSize());
            collection.push(spec);
            storeCollectionAsMemento(context, collection);
        }
        else {
            createPetPlayground(context);
            vscode.window.showInformationMessage(vscode.l10n.t("A Pet Playground has been created. You can now use the 'Spawn Additional Pet' Command to add more pets."));
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('vscode-pets.remove-all-pets', () => {
        const panel = getPetPanel();
        if (panel !== undefined) {
            panel.resetPets();
            storeCollectionAsMemento(context, []);
        }
        else {
            createPetPlayground(context);
            vscode.window.showInformationMessage(vscode.l10n.t("A Pet Playground has been created. You can now use the 'Remove All Pets' Command to remove all pets."));
        }
    }));
    // Listening to configuration changes
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration('vscode-pets.petColor') ||
            e.affectsConfiguration('vscode-pets.petType') ||
            e.affectsConfiguration('vscode-pets.petSize') ||
            e.affectsConfiguration('vscode-pets.theme') ||
            e.affectsConfiguration('workbench.colorTheme')) {
            const spec = PetSpecification.fromConfiguration();
            const panel = getPetPanel();
            if (panel) {
                panel.updatePetColor(spec.color);
                panel.updatePetSize(spec.size);
                panel.updatePetType(spec.type);
                panel.updateTheme(getConfiguredTheme(), getConfiguredThemeKind());
                panel.update();
            }
        }
        if (e.affectsConfiguration('vscode-pets.position')) {
            updateExtensionPositionContext();
        }
        if (e.affectsConfiguration('vscode-pets.throwBallWithMouse')) {
            updatePanelThrowWithMouse();
        }
    }));
    if (vscode.window.registerWebviewPanelSerializer) {
        // Make sure we register a serializer in activation event
        vscode.window.registerWebviewPanelSerializer(PetPanel.viewType, {
            async deserializeWebviewPanel(webviewPanel) {
                // Reset the webview options so we use latest uri for `localResourceRoots`.
                webviewPanel.webview.options = getWebviewOptions(context.extensionUri);
                const spec = PetSpecification.fromConfiguration();
                PetPanel.revive(webviewPanel, context.extensionUri, context.extensionPath, spec.color, spec.type, spec.size, getConfiguredTheme(), getConfiguredThemeKind(), getThrowWithMouseConfiguration());
            },
        });
    }
}
exports.activate = activate;
function updateStatusBar() {
    spawnPetStatusBar.text = `$(squirrel)`;
    spawnPetStatusBar.tooltip = vscode.l10n.t('Spawn Pet');
    spawnPetStatusBar.show();
}
function petPlaygroundDeactivate() {
    petPlaygroundStatusBar.dispose();
}
exports.petPlaygroundDeactivate = petPlaygroundDeactivate;
function spawnPetDeactivate() {
    spawnPetStatusBar.dispose();
}
exports.spawnPetDeactivate = spawnPetDeactivate;
function getWebviewOptions(extensionUri) {
    return {
        // Enable javascript in the webview
        enableScripts: true,
        // And restrict the webview to only loading content from our extension's `media` directory.
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'media')],
    };
}
/**
 * Some pets can only have certain colors, this makes sure they haven't been misconfigured.
 * @param petColor
 * @param petType
 * @returns normalized color
 */
function normalizeColor(petColor, petType) {
    if (petType === "totoro" /* PetType.totoro */ || petType === "rocky" /* PetType.rocky */) {
        return "gray" /* PetColor.gray */;
    }
    if (petType === "snake" /* PetType.snake */) {
        return "green" /* PetColor.green */;
    }
    if (petType === "rubber-duck" /* PetType.rubberduck */ || petType === "zappy" /* PetType.zappy */) {
        return "yellow" /* PetColor.yellow */;
    }
    if (petType === "cockatiel" /* PetType.cockatiel */) {
        return "gray" /* PetColor.gray */;
    }
    if (petType === "crab" /* PetType.crab */) {
        return "red" /* PetColor.red */;
    }
    if (petType === "dog" /* PetType.dog */ &&
        petColor !== "brown" /* PetColor.brown */ &&
        petColor !== "white" /* PetColor.white */ &&
        petColor !== "black" /* PetColor.black */) {
        return "brown" /* PetColor.brown */;
    }
    if (petType === "cat" /* PetType.cat */ &&
        petColor !== "brown" /* PetColor.brown */ &&
        petColor !== "black" /* PetColor.black */ &&
        petColor !== "white" /* PetColor.white */) {
        return "brown" /* PetColor.brown */;
    }
    return petColor;
}
class PetWebviewContainer {
    constructor(extensionUri, extensionPath, color, type, size, theme, themeKind, throwBallWithMouse) {
        this._disposables = [];
        this._extensionUri = extensionUri;
        this._petMediaPath = path.join(extensionPath, 'media');
        this._petColor = color;
        this._petType = type;
        this._petSize = size;
        this._theme = theme;
        this._themeKind = themeKind;
        this._throwBallWithMouse = throwBallWithMouse;
    }
    petColor() {
        return normalizeColor(this._petColor, this._petType);
    }
    petType() {
        return this._petType;
    }
    petSize() {
        return this._petSize;
    }
    theme() {
        return this._theme;
    }
    themeKind() {
        return this._themeKind;
    }
    throwBallWithMouse() {
        return this._throwBallWithMouse;
    }
    updatePetColor(newColor) {
        this._petColor = newColor;
    }
    updatePetType(newType) {
        this._petType = newType;
    }
    updatePetSize(newSize) {
        this._petSize = newSize;
    }
    updateTheme(newTheme, themeKind) {
        this._theme = newTheme;
        this._themeKind = themeKind;
    }
    setThrowWithMouse(newThrowWithMouse) {
        this._throwBallWithMouse = newThrowWithMouse;
        this.getWebview().postMessage({
            command: 'throw-with-mouse',
            enabled: newThrowWithMouse,
        });
    }
    throwBall() {
        this.getWebview().postMessage({
            command: 'throw-ball',
        });
    }
    resetPets() {
        this.getWebview().postMessage({
            command: 'reset-pet',
        });
    }
    spawnPet(spec) {
        this.getWebview().postMessage({
            command: 'spawn-pet',
            type: spec.type,
            color: spec.color,
            name: spec.name,
        });
        this.getWebview().postMessage({ command: 'set-size', size: spec.size });
    }
    listPets() {
        this.getWebview().postMessage({ command: 'list-pets' });
    }
    rollCall() {
        this.getWebview().postMessage({ command: 'roll-call' });
    }
    deletePet(petName) {
        this.getWebview().postMessage({ command: 'delete-pet', name: petName });
    }
    getWebview() {
        throw new Error('Not implemented');
    }
    _update() {
        const webview = this.getWebview();
        webview.html = this._getHtmlForWebview(webview);
    }
    update() { }
    _getHtmlForWebview(webview) {
        // Local path to main script run in the webview
        const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'media', 'main-bundle.js');
        // And the uri we use to load this script in the webview
        const scriptUri = webview.asWebviewUri(scriptPathOnDisk);
        // Local path to css styles
        const styleResetPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css');
        const stylesPathMainPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'pets.css');
        const silkScreenFontPath = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'Silkscreen-Regular.ttf'));
        // Uri to load styles into webview
        const stylesResetUri = webview.asWebviewUri(styleResetPath);
        const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);
        // Get path to resource on disk
        const basePetUri = webview.asWebviewUri(vscode.Uri.file(path.join(this._petMediaPath)));
        // Use a nonce to only allow specific scripts to be run
        const nonce = getNonce();
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'nonce-${nonce}'; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';
                font-src ${webview.cspSource};">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${stylesResetUri}" rel="stylesheet" nonce="${nonce}">
				<link href="${stylesMainUri}" rel="stylesheet" nonce="${nonce}">
                <style nonce="${nonce}">
                @font-face {
                    font-family: 'silkscreen';
                    src: url('${silkScreenFontPath}') format('truetype');
                }
                </style>
				<title>VS Code Pets</title>
			</head>
			<body>
				<canvas id="petCanvas"></canvas>
				<div id="petsContainer"></div>
				<div id="foreground"></div>	
				<script nonce="${nonce}" src="${scriptUri}"></script>
				<script nonce="${nonce}">petApp.petPanelApp("${basePetUri}", "${this.theme()}", ${this.themeKind()}, "${this.petColor()}", "${this.petSize()}", "${this.petType()}", ${this.throwBallWithMouse()});</script>
			</body>
			</html>`;
    }
}
function handleWebviewMessage(message) {
    switch (message.command) {
        case 'alert':
            vscode.window.showErrorMessage(message.text);
            return;
        case 'info':
            vscode.window.showInformationMessage(message.text);
            return;
    }
}
/**
 * Manages pet coding webview panels
 */
class PetPanel extends PetWebviewContainer {
    static createOrShow(extensionUri, extensionPath, petColor, petType, petSize, theme, themeKind, throwBallWithMouse) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        // If we already have a panel, show it.
        if (PetPanel.currentPanel) {
            if (petColor === PetPanel.currentPanel.petColor() &&
                petType === PetPanel.currentPanel.petType() &&
                petSize === PetPanel.currentPanel.petSize()) {
                PetPanel.currentPanel._panel.reveal(column);
                return;
            }
            else {
                PetPanel.currentPanel.updatePetColor(petColor);
                PetPanel.currentPanel.updatePetType(petType);
                PetPanel.currentPanel.updatePetSize(petSize);
                PetPanel.currentPanel.update();
            }
        }
        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(PetPanel.viewType, vscode.l10n.t('Pet Panel'), vscode.ViewColumn.Two, getWebviewOptions(extensionUri));
        PetPanel.currentPanel = new PetPanel(panel, extensionUri, extensionPath, petColor, petType, petSize, theme, themeKind, throwBallWithMouse);
    }
    resetPets() {
        this.getWebview().postMessage({ command: 'reset-pet' });
    }
    listPets() {
        this.getWebview().postMessage({ command: 'list-pets' });
    }
    rollCall() {
        this.getWebview().postMessage({ command: 'roll-call' });
    }
    deletePet(petName) {
        this.getWebview().postMessage({ command: 'delete-pet', name: petName });
    }
    static revive(panel, extensionUri, extensionPath, petColor, petType, petSize, theme, themeKind, throwBallWithMouse) {
        PetPanel.currentPanel = new PetPanel(panel, extensionUri, extensionPath, petColor, petType, petSize, theme, themeKind, throwBallWithMouse);
    }
    constructor(panel, extensionUri, extensionPath, color, type, size, theme, themeKind, throwBallWithMouse) {
        super(extensionUri, extensionPath, color, type, size, theme, themeKind, throwBallWithMouse);
        this._panel = panel;
        // Set the webview's initial html content
        this._update();
        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        // Update the content based on view changes
        this._panel.onDidChangeViewState(() => {
            this.update();
        }, null, this._disposables);
        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(handleWebviewMessage, null, this._disposables);
    }
    dispose() {
        PetPanel.currentPanel = undefined;
        // Clean up our resources
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    update() {
        if (this._panel.visible) {
            this._update();
        }
    }
    getWebview() {
        return this._panel.webview;
    }
}
PetPanel.viewType = 'petCoding';
class PetWebviewViewProvider extends PetWebviewContainer {
    resolveWebviewView(webviewView) {
        this._webviewView = webviewView;
        webviewView.webview.options = getWebviewOptions(this._extensionUri);
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(handleWebviewMessage, null, this._disposables);
    }
    update() {
        this._update();
    }
    getWebview() {
        if (this._webviewView === undefined) {
            throw new Error(vscode.l10n.t('Panel not active, make sure the pets view is visible before running this command.'));
        }
        else {
            return this._webviewView.webview;
        }
    }
}
PetWebviewViewProvider.viewType = 'petsView';
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function createPetPlayground(context) {
    const spec = PetSpecification.fromConfiguration();
    PetPanel.createOrShow(context.extensionUri, context.extensionPath, spec.color, spec.type, spec.size, getConfiguredTheme(), getConfiguredThemeKind(), getThrowWithMouseConfiguration());
    if (PetPanel.currentPanel) {
        var collection = PetSpecification.collectionFromMemento(context, getConfiguredSize());
        collection.forEach((item) => {
            PetPanel.currentPanel?.spawnPet(item);
        });
        storeCollectionAsMemento(context, collection);
    }
    else {
        var collection = PetSpecification.collectionFromMemento(context, getConfiguredSize());
        collection.push(spec);
        storeCollectionAsMemento(context, collection);
    }
}

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=extension-web.js.map