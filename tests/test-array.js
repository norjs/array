/**
 * Tests for nor-array
 * Copyright 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

var assert = require("assert");

var TIMEOUT = parseInt( process.env.TEST_TIMEOUT || 15*60000, 10);

/** The amount of loops done for performance tests */
var test_loops = parseInt( process.env.TEST_LOOPS || 1000000, 10);

var IMPL = process.env.TEST_ARRAY_IMPL || 'object';

// Exports
var ARR = require('nor-array/impls/' + IMPL );

/** Runs callback `loops` times and calculates the total time
 * @param loops {integer} The amount of loops
 * @param c {function} The callback
 * @returns {number} The time (ms) how much it took to run loops
 */
function timer_test(loops, c) {

	/** Returns current time */
	function get_time() {
		return new Date();
	}

	/** The actual test code is intentionally as its own function */
	function test(i, c_) {
		var end = get_time(), start = get_time();
		while(0 < i--) c_();
		end = get_time();
		return end.getTime() - start.getTime();
	}

	// Validations before the test

	if( (typeof loops !== 'number') || (loops <= 0) ) {
		throw new TypeError("loops not valid");
	}

	if(typeof c !== 'function') {
		throw new TypeError("callback is not function");
	}

	return test(loops, c);
}

/** Tests for nor-array */
describe('nor-array', function(){

	/** Tests for nor-array(a).forEach() */
	describe('#forEach', function(){

		/** Normal test */
		it('can be used to copy elements from a to b', function(){
			var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
			var b = [];

			function push_to_b(v) {
				b.push(v);
			}

			ARR(a).forEach(push_to_b);

			assert.strictEqual( a.length, b.length );
			assert.strictEqual( a.length, 32 );

			for(var i=0; i<32; i++) {
				assert.strictEqual( a[i], b[i] );
			}

		});

		/** Test performance */
		it('is faster than standard forEach', function(){

			this.timeout(TIMEOUT);

			var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

			// Standard implementation
			var std_time = timer_test(test_loops, function() {
				var b = [];
				a.forEach(function(v) {
					b.push(v);
				});
				assert.strictEqual( a.length, b.length );
			});

			// Our implementation
			var A = ARR(a);
			var our_time = timer_test(test_loops, function() {
				var b = [];
				A.forEach(function(v) {
					b.push(v);
				});
				assert.strictEqual( a.length, b.length );
			});

			// Raw implementation
			var raw_time = timer_test(test_loops, function() {
				var b = [];
				var i = 0, ll = a.length;
				while(i<ll) {
					b.push(a[i]);
					i += 1;
				}
				assert.strictEqual( a.length, b.length );
			});

			// Check results
			var rows = [
				['Implementation', 'test', 'ms/100k calls', 'total time', 'calls'],
				[IMPL, 'std', (std_time/test_loops*100000), std_time, test_loops ],
				[IMPL, 'our', (our_time/test_loops*100000), our_time, test_loops ],
				[IMPL, 'raw', (raw_time/test_loops*100000), raw_time, test_loops ]
			];

			rows.forEach(function(r) {
				console.log( r.map(function(c) { return '"' + c + '"'; }).join(',') );
			});

			// Our vs standard
			if(our_time < std_time) {
				console.log('Our forEach() was ' + Math.round( (std_time-our_time)/std_time * 100) + '% faster than standard! [' + our_time+'/'+std_time+']');
			} else {
				console.log('Standard forEach() was ' + Math.round( (our_time-std_time)/our_time * 100) + '% faster than our! [' + our_time+'/'+std_time+']');
			}

			// Raw vs standard
			if(raw_time < std_time) {
				console.log('Raw forEach() was ' + Math.round( (std_time-raw_time)/std_time * 100) + '% faster than standard! [' + raw_time+'/'+std_time+']');
			} else {
				console.log('Standard forEach() was ' + Math.round( (raw_time-std_time)/raw_time * 100) + '% faster than raw! [' + raw_time+'/'+std_time+']');
			}

			// Our vs raw
			if(our_time < raw_time) {
				console.log('Our forEach() was ' + Math.round( (raw_time-our_time)/raw_time * 100) + '% faster than raw! [' + our_time+'/'+raw_time+']');
			} else {
				console.log('Raw forEach() was ' + Math.round( (our_time-raw_time)/our_time * 100) + '% faster than our! [' + our_time+'/'+raw_time+']');
			}

			// Asserts
			assert(our_time < std_time, "our_time ("+our_time+") is less than std_time ("+std_time+")");

		});

	});
});

/* EOF */
