/**
 * nor-array -- Array Utility Library
 * Copyright 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

"use strict";

/**
 * Returns an object which has better optimized `forEach()`, `map()`, and `filter()` methods.
 *
 * This library builds optimized versions for "standard" array methods. It is developed for Node.js 
 * (Google v8 engine), although the resulting code will work on any JavaScript implementation.
 *
 * @param a {array} The array to operate.
 */
module.exports = function nor_array_obj(a_) {

	var a = arguments.length === 0 ? [] : a_;

	var utils = {};

	/** Returns the internal array value */
	utils.valueOf = function() {
		return a;
	};

	/** The forEach implementation
	 * @param c {function} The callback which will be executed for each element in the array
	 * @todo Test performance
	 */
	utils.forEach = function nor_array_forEach(c) {
		var l = a.length-1, i = l, ii = 0;
		while(i >= 0) {
			/*jshint plusplus:false*/
			ii = l-(i--);
			c(a[ii], ii, a);
		}
		return utils;
	};

	/** The map implementation
	 * @param c {function} The callback which will be executed for each element in the array
	 * @todo Test performance
	 */
	utils.map = function nor_array_map(c) {
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
	 * @todo Test performance
	 */
	utils.filter = function nor_array_filter(c) {
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
	 * @todo Test performance
	 */
	utils.every = function nor_array_every(c) {
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
	 * @todo Test performance
	 */
	utils.some = function nor_array_some(c) {
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
	 * @todo Test performance
	 */
	utils.concat = function() {
		return nor_array_obj(a.concat.apply(a, arguments));
	};

	/** 
	 * @param e {mixed} The element to search
	 * @param from {number} The index to start the search 
	 * @returns {number} The index of the element
	 * @todo Test performance
	 */
	utils.indexOf = function nor_array_indexOf(e, f) {
		return (arguments.length === 1) ? a.indexOf(e) : a.indexOf(e, f);
	};

	/** 
	 * @param e {mixed} The element to search
	 * @param from {number} The index to start the search 
	 * @returns {number} The index of the element
	 * @todo Test performance
	 */
	utils.lastIndexOf = function nor_array_lastIndexOf(e, f) {
		return (arguments.length === 1) ? a.lastIndexOf(e) : a.lastIndexOf(e, f);
	};

	/** Direct call seems to be fastest: http://jsperf.com/testing-join-algorithms-reverse-vs-forward
	 * @params s {string} 
	 * @returns {string} 
	 */
	utils.join = function nor_array_join(s) {
		return a.join(s);
	};

	// Export it
	return utils;
};

/* EOF */
