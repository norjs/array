/**
 * Tests for nor-array
 * Copyright 2014 Jaakko-Heikki Heusala <jheusala@iki.fi>
 */

var assert = require("assert");
var ARR = require('nor-array');

/** The amount of loops done for performance tests */
var test_loops = parseInt( process.env.TEST_LOOPS || 1000000, 10);

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

			var a = [1, 2, 3, 4];

			var std_time = time_test(test_loops, function() {
				var b = [];
				a.forEach(function(v) {
					b.push(v);
				});
				assert( a.length === b.length );
			});

			var A = ARR(a);
			var our_time = time_test(test_loops, function() {
				var b = [];
				A.forEach(function(v) {
					b.push(v);
				});
				assert( a.length === b.length );
			});

			if(our_time < std_time) {
				console.log('Our forEach() was ' + Math.round( (std_time-our_time)/std_time * 100) + '% faster! [' + our_time+'/'+std_time+']');
			} else {
				console.log('Standard forEach() was ' + Math.round( (our_time-std_time)/our_time * 100) + '% faster! [' + our_time+'/'+std_time+']');
			}

			assert(our_time < std_time);

		});

	});
});

/* EOF */
