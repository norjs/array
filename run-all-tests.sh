#!/bin/bash
set -e

tests='object prototype reused-prototype rev-object'

export TEST_TIMEOUT=900000  # 15 minutes/test
export TEST_LOOPS=416840350 # about 1 minute for fastest test

if test -f output.txt; then
	echo 'output.txt: exists already' >&2
	exit 1
fi

(for impl in $tests; do
	TEST_ARRAY_IMPL="$impl" npm test
done) > output.txt
