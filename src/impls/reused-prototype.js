/*
 * nor-array -- Array Utility Library
 * Copyright 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

"use strict";

/** The type of our method container */
function ArrayUtils(a) {
	this.a = a;
}

/** The forEach implementation
 * @param c {function} The callback which will be executed for each element in the array
 */
ArrayUtils.prototype.forEach = function forEach(c) {
	var i = 0, a=this.a, l=a.length;
	while(i < l) {
		c(a[i], i, a);
		i += 1;
	}
	return this;
};

/**
 * Returns an object which has better optimized `forEach()`, `map()`, and `filter()` methods.
 *
 * This library builds optimized versions for "standard" array methods. It is developed for Node.js 
 * (Google v8 engine), although the resulting code will work on any JavaScript implementation.
 *
 * @param a {array} The array to operate.
 */
module.exports = function nor_array_prototype(a) {
	return new ArrayUtils(a);
};

/* EOF */
