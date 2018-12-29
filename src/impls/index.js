/**
 * nor-array -- Array Utility Library
 * Copyright 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 *
 * This file will contain the best implementations.
 *
 */

/**
 *
 */
export class NorArray {

	/** Our array constructor */
	constructor (a = []) {
		this.a = a;
	}

	/** Returns the internal array value */
	valueOf () {
		return this.a;
	}

	/** The forEach implementation
	 * @param c {function} The callback which will be executed for each element in the array
	 */
	forEach (c) {
		let a = this.a;
		let l = a.length-1, i = l, ii = 0;
		while (i >= 0) {
			/*jshint plusplus:false*/
			ii = l-(i--);
			c(a[ii], ii, a);
		}
		return this;
	}

	/** The map implementation
	 * @param c {function} The callback which will be executed for each element in the array
	 */
	map (c) {
		let a = this.a;
		let a2 = new Array(a.length);
		let l = a.length-1, i = l, ii = 0;
		while (i >= 0) {
			/*jshint plusplus:false*/
			ii = l-(i--);
			a2[ii] = c(a[ii], ii, a);
		}
		return NorArray.create(a2);
	}

	/** The filter() method creates new array with all the elements that pass the test implemented by the provided function.
	 * @param c {function} The callback which will be executed for each element in the array
	 * @returns {object} The nor-array object instance with value of results as its internal value.
	 */
	filter (c) {
		let a = this.a;
		let a2 = new Array(a.length);
		let l = a.length-1, i = l, ii = 0, n=0;
		while (i >= 0) {
			/*jshint plusplus:false*/
			ii = l-(i--);
			if (c(a[ii], ii, a)) {
				a2[n++] = a[ii];
			}
		}
		a2.length = n;
		return NorArray.create(a2);
	}

	/** The `find()` method returns a value in the array, if an element in the array
	 * satisfies the provided testing function. Otherwise `undefined` is returned.
	 * @param c {function} The callback which will be executed for each element in the array
	 * @returns {boolean} True if each array element passes the test.
	 */
	find (c) {
		let a = this.a;
		let l = a.length-1, i = l, ii = 0;
		while (i >= 0) {
			/*jshint plusplus:false*/
			ii = l-(i--);
			if (c(a[ii], ii, a)) {
				return a[ii];
			}
		}
	}

	/** The `findIndex()` method returns an index in the array, if an element in the array
	 * satisfies the provided testing function. Otherwise `-1` is returned.
	 *
	 * @param c {function} The callback which will be executed for each element in the array until index is found.
	 * @returns {number}
	 */
	findIndex (c) {
		let a = this.a;
		let l = a.length-1, i = l, ii = 0;
		while (i >= 0) {
			/*jshint plusplus:false*/
			ii = l-(i--);
			if (c(a[ii], ii, a)) {
				return ii;
			}
		}
		return -1;
	}

	/** The every() method tests every element in an array with provided callback function.
	 * @param c {function} The callback which will be executed for each element in the array
	 * @returns {boolean} True if each array element passes the test.
	 */
	every (c) {
		let a = this.a;
		let l = a.length-1, i = l, ii = 0;
		while (i >= 0) {
			/*jshint plusplus:false*/
			ii = l-(i--);
			if (!c(a[ii], ii, a)) {
				return false;
			}
		}
		return true;
	}

	/** The some() method tests if some elements in an array with provided callback function returns true
	 * @param c {function} The callback which will be executed for each element in the array
	 * @returns {boolean} True if each array element passes the test.
	 */
	some (c) {
		let a = this.a;
		let l = a.length-1, i = l, ii = 0;
		while (i >= 0) {
			/*jshint plusplus:false*/
			ii = l-(i--);
			if (c(a[ii], ii, a)) {
				return true;
			}
		}
		return false;
	}

	/** The .concat() implementation. Currently this is using the standard implementation until better is implemented.
	 */
	concat (...args) {
		return NorArray.create( this.a.concat(...args) );
	}

	/**
	 * @returns {number} The index of the element
	 */
	indexOf (...args) {
		return this.a.indexOf(...args);
	}

	/**
	 */
	lastIndexOf (...args) {
		return this.a.lastIndexOf(...args);
	}

	/**
	 * @param s {string}
	 */
	join (s = ',') {
		return this.a.join(s);
	}

	/**
	 */
	reduce (...args) {
		return this.a.reduce(...args);
	}

	/**
	 *
	 * @param a {Array}
	 * @returns {NorArray}
	 */
	static create (a) {
		return new NorArray(a);
	}
}

/**
 * Returns an object which has better optimized `forEach()`, `map()`, and `filter()` methods.
 *
 * This library builds optimized versions for "standard" array methods. It is developed for Node.js 
 * (Google v8 engine), although the resulting code will work on any JavaScript implementation.
 *
 * @param a {array} The array to operate.
 */
export default function nor_array_create (a) {
	return NorArray.create(a);
};
