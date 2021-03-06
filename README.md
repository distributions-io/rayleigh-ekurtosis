Excess Kurtosis
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Rayleigh](https://en.wikipedia.org/wiki/Rayleigh_distribution) distribution [excess kurtosis](https://en.wikipedia.org/wiki/Kurtosis).

The [excess kurtosis](https://en.wikipedia.org/wiki/Kurtosis) for a [Rayleigh](https://en.wikipedia.org/wiki/Rayleigh_distribution) random variable is

<div class="equation" align="center" data-raw-text="\gamma_2 = -\frac{6\pi^2 - 24\pi + 16}{(4 - \pi)^2} \approx 0.245" data-equation="eq:ekurtosis">
	<img src="https://cdn.rawgit.com/distributions-io/rayleigh-ekurtosis/bdee830b52874004872efa78aecb70bc5ab71980/docs/img/eqn.svg" alt="Excess kurtosis for a Rayleigh distribution.">
	<br>
</div>

where `sigma > 0` is the scale parameter.


## Installation

``` bash
$ npm install distributions-rayleigh-ekurtosis
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var ekurtosis = require( 'distributions-rayleigh-ekurtosis' );
```

#### ekurtosis( sigma[, opts] )

Computes the [excess kurtosis](https://en.wikipedia.org/wiki/Kurtosis) for a [Rayleigh](https://en.wikipedia.org/wiki/Rayleigh_distribution) distribution with parameter `sigma`. `sigma` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = ekurtosis( 0.5 );
// returns ~0.245

sigma = [ 0.5, 1, 2, 4 ];
out = ekurtosis( sigma );

// returns [ ~0.245, ~0.245, ~0.245, ~0.245 ]

sigma = new Float32Array( sigma );
out = ekurtosis( sigma );
// returns Float64Array( [~0.245,~0.245,~0.245,~0.245] )

sigma =  matrix( [ 0.5, 1, 2, 4 ], [2,2] );
/*
	[ 0.5 1
	  2 4 ]
*/

out = ekurtosis( sigma );
/*
	[ ~0.245 ~0.245
	  ~0.245 ~0.245 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var sigma = [
	[0,0.5],
	[1,1],
	[2,2],
	[3,4]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = ekurtosis( sigma, {
	'accessor': getValue
});
// returns [ ~0.245, ~0.245, ~0.245, ~0.245 ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var sigma = [
	{'x':[9,0.5]},
	{'x':[9,1]},
	{'x':[9,2]},
	{'x':[9,4]}
];

var out = ekurtosis( sigma, {
	'path': 'x|1',
	'sep': '|'
});
/*
	[
		{'x':[9,~0.245]},
		{'x':[9,~0.245]},
		{'x':[9,~0.245]},
		{'x':[9,~0.245]},
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var sigma, out;

sigma = new Float64Array( [ 0.5,1,2,4 ] );

out = ekurtosis( sigma, {
	'dtype': 'int32'
});
// returns Int32Array( [ 0,0,0,0 ] )

// Works for plain arrays, as well...
out = ekurtosis( [0.5,1,2,4], {
	'dtype': 'int32'
});
// returns Int32Array( [ 0,0,0,0 ] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var sigma,
	bool,
	mat,
	out,
	i;

sigma = [ 0.5, 1, 2, 4 ];

out = ekurtosis( sigma, {
	'copy': false
});
// returns [ ~0.245, ~0.245, ~0.245, ~0.245 ]

bool = ( data === out );
// returns true

mat = matrix( [ 0.5, 1, 2, 4 ], [2,2] );
/*
	[ 0.5 1
	  2 4 ]
*/

out = ekurtosis( mat, {
	'copy': false
});
/*
	[ ~0.245 ~0.245
	  ~0.245 ~0.245 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a positive number, the [excess kurtosis](https://en.wikipedia.org/wiki/Kurtosis) is `NaN`.

	``` javascript
	var sigma, out;

	out = ekurtosis( -1 );
	// returns NaN

	out = ekurtosis( 0 );
	// returns NaN

	out = ekurtosis( null );
	// returns NaN

	out = ekurtosis( true );
	// returns NaN

	out = ekurtosis( {'a':'b'} );
	// returns NaN

	out = ekurtosis( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	sigma = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = ekurtosis( sigma, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = ekurtosis( sigma, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = ekurtosis( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	ekurtosis = require( 'distributions-rayleigh-ekurtosis' );

var sigma,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
sigma = new Array( 10 );
for ( i = 0; i < sigma.length; i++ ) {
	sigma[ i ] = i + 1;
}
out = ekurtosis( sigma );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < sigma.length; i++ ) {
	sigma[ i ] = {
		'x': sigma[ i ]
	};
}
out = ekurtosis( sigma, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < sigma.length; i++ ) {
	sigma[ i ] = {
		'x': [ i, sigma[ i ].x ]
	};
}
out = ekurtosis( sigma, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
sigma = new Float64Array( 10 );
for ( i = 0; i < sigma.length; i++ ) {
	sigma[ i ] = i + 1;
}
out = ekurtosis( sigma );

// Matrices...
mat = matrix( sigma, [5,2], 'float64' );
out = ekurtosis( mat );

// Matrices (custom output data type)...
out = ekurtosis( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-rayleigh-ekurtosis.svg
[npm-url]: https://npmjs.org/package/distributions-rayleigh-ekurtosis

[travis-image]: http://img.shields.io/travis/distributions-io/rayleigh-ekurtosis/master.svg
[travis-url]: https://travis-ci.org/distributions-io/rayleigh-ekurtosis

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/rayleigh-ekurtosis/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/rayleigh-ekurtosis?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/rayleigh-ekurtosis.svg
[dependencies-url]: https://david-dm.org/distributions-io/rayleigh-ekurtosis

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/rayleigh-ekurtosis.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/rayleigh-ekurtosis

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/rayleigh-ekurtosis.svg
[github-issues-url]: https://github.com/distributions-io/rayleigh-ekurtosis/issues
