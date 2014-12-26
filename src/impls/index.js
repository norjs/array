/**
 * nor-array -- Array Utility Library
 * Copyright 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 *
 * This file will contain the best implementations.
 *
 */

"use strict";

var FUNCTION = require('nor-function');

/** Our array constructor */
function NorArray(a_) {
	this.a = arguments.length === 0 ? [] : a_;
}

/**
 * Returns an object which has better optimized `forEach()`, `map()`, and `filter()` methods.
 *
 * This library builds optimized versions for "standard" array methods. It is developed for Node.js 
 * (Google v8 engine), although the resulting code will work on any JavaScript implementation.
 *
 * @param a {array} The array to operate.
 */
var nor_array_obj = module.exports = function nor_array_obj(a_) {
	return new NorArray(a_);
};

/** Returns the internal array value */
NorArray.prototype.valueOf = function() {
	return this.a;
};

/** The forEach implementation
 * @param c {function} The callback which will be executed for each element in the array
 */
NorArray.prototype.forEach = function nor_array_forEach(c) {
	var a = this.a;
	var l = a.length-1, i = l, ii = 0;
	while(i >= 0) {
		/*jshint plusplus:false*/
		ii = l-(i--);
		c(a[ii], ii, a);
	}
	return this;
};

/** The map implementation
 * @param c {function} The callback which will be executed for each element in the array
 */
NorArray.prototype.map = function nor_array_map(c) {
	var a = this.a;
	var a2 = new Array(a.length);
	var l = a.length-1, i = l, ii = 0;
	while(i >= 0) {
		/*jshint plusplus:false*/
		ii = l-(i--);
		a2[ii] = c(a[ii], ii, a);
	}
	return nor_array_obj(a2);
};

/** The filter() method creates new array with all the elements that pass the test implemented by the provided function.
 * @param c {function} The callback which will be executed for each element in the array
 * @returns {object} The nor-array object instance with value of results as its internal value.
 */
NorArray.prototype.filter = function nor_array_filter(c) {
	var a = this.a;
	var a2 = new Array(a.length);
	var l = a.length-1, i = l, ii = 0, n=0;
	while(i >= 0) {
		/*jshint plusplus:false*/
		ii = l-(i--);
		if(c(a[ii], ii, a)) {
			a2[n++] = a[ii];
		}
	}
	a2.length = n;
	return nor_array_obj(a2);
};

/** The every() method tests every element in an array with provided callback function.
 * @param c {function} The callback which will be executed for each element in the array
 * @returns {boolean} True if each array element passes the test.
 */
NorArray.prototype.every = function nor_array_every(c) {
	var a = this.a;
	var l = a.length-1, i = l, ii = 0;
	while(i >= 0) {
		/*jshint plusplus:false*/
		ii = l-(i--);
		if(!c(a[ii], ii, a)) {
			return false;
		}
	}
	return true;
};

/** The some() method tests if some elements in an array with provided callback function returns true
 * @param c {function} The callback which will be executed for each element in the array
 * @returns {boolean} True if each array element passes the test.
 */
NorArray.prototype.some = function nor_array_some(c) {
	var a = this.a;
	var l = a.length-1, i = l, ii = 0;
	while(i >= 0) {
		/*jshint plusplus:false*/
		ii = l-(i--);
		if(c(a[ii], ii, a)) {
			return true;
		}
	}
	return false;
};

/** The concat() implementation. Currently this is using the standard implementation until better is implemented.
 * @param c {function} The callback which will be executed for each element in the array
 */
NorArray.prototype.concat = function() {
	var a = this.a;
	return nor_array_obj( FUNCTION(a.concat).apply(a, arguments));
};

/** 
 * @param e {mixed} The element to search
 * @param from {number} The index to start the search 
 * @returns {number} The index of the element
 */
NorArray.prototype.indexOf = function nor_array_indexOf() {
	var a = this.a;
	return FUNCTION(a.indexOf).apply(a, arguments);
};

/** 
 * @param e {mixed} The element to search
 * @param from {number} The index to start the search 
 * @returns {number} The index of the element
 */
NorArray.prototype.lastIndexOf = function nor_array_lastIndexOf() {
	var a = this.a;
	return FUNCTION(a.lastIndexOf).apply(a, arguments);
};

/** 
 * @param e {mixed} The element to search
 * @param from {number} The index to start the search 
 * @returns {number} The index of the element
 */
NorArray.prototype.join = function nor_array_join(s) {
	var a = this.a;
	if(arguments.length === 0) {
		s = ',';
	}
	return a.join(s);
};

/**
 * @param e {mixed} The element to search
 * @param from {number} The index to start the search 
 * @returns {number} The index of the element
 */
NorArray.prototype.reduce = function nor_array_reduce() {
	var a = this.a;
	return FUNCTION(a.reduce).apply(a, arguments);
};

/* EOF */
