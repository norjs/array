/**
 * Tests for nor-array
 * Copyright 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

var assert = require("assert");

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
function time_test(loops, c) {
	var start, end;
	start = new Date();
	for(var i=0; i<loops; i+=1) {
		c();
	}
	end = new Date();
	return end.getTime() - start.getTime();
}

/** Tests for nor-array */
describe('nor-array', function(){

	/** Tests for nor-array(a).forEach() */
	describe('#forEach', function(){

		/** Normal test */
		it('can be used to copy elements from a to b', function(){
			var a = [1, 2, 3, 4];
			var b = [];

			function push_to_b(v) {
				b.push(v);
			}

			ARR(a).forEach(push_to_b);

			assert( a.length === b.length );
			assert( a.length === 4 );
			assert( a[0] === b[0] );
			assert( a[1] === b[1] );
			assert( a[2] === b[2] );
			assert( a[3] === b[3] );

		});

		/** Test performance */
		it('is faster than standard forEach', function(){

			this.timeout(120000);

			var a = [1, 2, 3, 4];

			// Standard implementation
			var std_time = time_test(test_loops, function() {
				var b = [];
				a.forEach(function(v) {
					b.push(v);
				});
				assert( a.length === b.length );
			});

			// Our implementation
			var A = ARR(a);
			var our_time = time_test(test_loops, function() {
				var b = [];
				A.forEach(function(v) {
					b.push(v);
				});
				assert( a.length === b.length );
			});

			// Raw implementation
			var raw_time = time_test(test_loops, function() {
				var b = [];
				var i = 0, ll = a.length;
				while(i<ll) {
					b.push(a[i]);
					i += 1;
				}
				assert( a.length === b.length );
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
			assert(our_time < std_time);

		});

	});
});

/* EOF */
