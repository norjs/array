/**
 * nor-array -- Array Utility Library
 * Copyright 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

"use strict";

/** Reverse implementation. Warning! This seems to be slower than `Array.prototype.join()`! */
module.exports = function nor_array_join(a, s_) {
	var t = '',
	    s = (arguments.length === 0) ? ',' : ''+s_,
	    l = a.length-1,
	    i = l;
	/*jshint plusplus:false, curly:false */
	if(i < 0) return t;
	t += a[l-(i--)];
	while(i >= 0) t += s + a[l-(i--)];
	return t;
};

/* EOF */
