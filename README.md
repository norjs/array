[![Build Status](https://secure.travis-ci.org/norjs/array.png?branch=master)](http://travis-ci.org/norjs/array)

***Obsolete Notice:*** We're moving out of using @norjs/array (originally nor-array) since newest Node.js has a faster standard implementation than a raw while loop, now at 2019. (It wasn't very fast 2014.)

@norjs/array
============

Optimized Array Utility Library.

Installation
------------

Install using NPM: `npm install nor-array`

Example Usage
-------------

```
var ARR = require('nor-array');

var a = [1, 2, 3, 4];

ARR(a).forEach(function(v) {
	console.log(v);
});
```

Our implementation ~~is~~ was [about 50% faster than the standard 
`Array.prototype.forEach()`](https://travis-ci.org/sendanor/nor-array/builds/33259661).

Compatibility with standard `Array` methods 
-------------------------------------------

Our implementations are ***not*** fully compatible with ECMAScript 
implementations of `Array` operations.

Most notably because our implementation expects:

 * Array is a dense (NOT sparse -- there must be no holes!)
 * Assumes that indexes are between zero (0) and `array.length`: `0 <= i < array.length`
 * Does not support `thisArg`, call `o.callback.bind(o)` instead
 * The array indexes do not change while our `.forEach()` is running

*This assumption is the reason why it is faster.*

Function Reference
------------------

| Sample usage               | Description                |
| -------------------------- | -------------------------- |
| `ARRAY(a).valueOf()`       | Returns the original array |
| `ARRAY(a).forEach(..)`     | See [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) |
| `ARRAY(a).map(..)`         | See [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) |
| `ARRAY(a).filter(..)`      | See [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) |
| `ARRAY(a).find(..)`        | See [Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) |
| `ARRAY(a).findIndex(..)`   | See [Array.prototype.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) |
| `ARRAY(a).every(..)`       | See [Array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) |
| `ARRAY(a).some(..)`        | See [Array.prototype.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) |
| `ARRAY(a).concat(..)`      | See [Array.prototype.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) |
| `ARRAY(a).indexOf(..)`     | See [Array.prototype.indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) |
| `ARRAY(a).lastIndexOf(..)` | See [Array.prototype.lastIndexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf) |
| `ARRAY(a).join(..)`        | See [Array.prototype.join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) |
| `ARRAY(a).reduce(..)`      | See [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) |

License
-------

The MIT style license, see [LICENSE](https://raw.githubusercontent.com/norjs/array/master/LICENSE).

Commercial Support
------------------

You can buy commercial support from [Sendanor](http://sendanor.com/).
