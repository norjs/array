[![Build Status](https://secure.travis-ci.org/Sendanor/nor-array.png?branch=master)](http://travis-ci.org/Sendanor/nor-array)

nor-array
=========

Optimized Array Utility Library

Installation
------------

Install using NPM: `npm install nor-array`

forEach()
---------

```
var ARR = require('nor-array');

var a = [1, 2, 3, 4];

ARR(a).forEach(function(v) {
	console.log(v);
});
```

Our implementation is [about 50% faster than the standard 
`Array.prototype.forEach()`](https://travis-ci.org/sendanor/nor-array/builds/33259661).

Compatibility with `Array.prototype.forEach()`
----------------------------------------------

Our implementation is ***not*** compatible with ECMAScript 
implementation of `Array.prototype.forEach()`.

Most notably because it:

* Array is dense (NOT sparse) -- There must be no holes!
* Assumes that indexes are between zero (0) and `array.length`: `0 <= i < array.length`
* It does not support `thisArg`, call `o.callback.bind(o)` instead
* The array indexes do not change while our `forEach()` is running

This assumption is the reason why it is faster.

License
-------

The MIT style license, see [LICENSE](https://raw.githubusercontent.com/sendanor/nor-array/master/LICENSE).
