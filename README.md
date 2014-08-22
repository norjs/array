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

Our implementation is about 50% faster than the standard `Array.prototype.forEach()`.

License
-------

The MIT style license, see LICENSE file.
